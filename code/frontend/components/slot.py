from PyQt5.QtWidgets import (QHBoxLayout, QWidget, QLabel)


class Slot(QWidget):
    """
    A slot corresponds to one grid space, considering one timestamp and one processor
    """

    BASE_STYLE = {
        'border-right': '1px solid black',
    }

    def __init__(self, processor_id, timestamp, events, independant_events, settings):
        """
        events: {
            task_id: [
                {
                    job_id:
                    event: str
                }
            ]
        }
        """
        super().__init__()
        self.settings = settings
        self.events = events
        self.independant_events = independant_events
        self.style = Slot.BASE_STYLE.copy()
        self.processor_id = processor_id
        self.timestamp = timestamp
        self.reduced_events = []
        self.has_nothing = True
        self.is_offline = False
        self._reduce_events()
        self.initialize_gui()

    def initialize_gui(self):

        self.before_slot = BeforeSlot(self.independant_events, self.settings)
        self.slot = QLabel()

        self.h_layout = QHBoxLayout()
        self.h_layout.setSpacing(0)
        self.h_layout.setContentsMargins(0, 0, 0, 0)
        self.h_layout.addWidget(self.before_slot)
        self.h_layout.addWidget(self.slot)
        self.setLayout(self.h_layout)

        self.reset_style()

        self._set_text()
        self._set_color()
        self._set_style()

        # self._set_finishes()

    def _reduce_events(self):
        """
        gets the events for this slot in a more ordered way
        """
        reduced_events = []
        for task, events in self.events.items():
            for event in events:
                reduced_events.append(event)

        self.reduced_events = reduced_events

    def _set_text(self):
        final_text = ""

        for task, events in self.events.items():
            for event in events:
                if event['event'] in ['F']:
                    final_text += f"Freq Change:\n\t {event['data']} MHz\n"
                if event['event'] == '-':
                    final_text += f"Processor goes offline\n"
                if event['event'] == '+':
                    final_text += f"Processor goes online\n"

        self.slot.setText(final_text)

    def _set_color(self):
        """
        Finds the first event for this slot with a color associated
        Only start, finish and running have this property
        This value should be unique, and is checked before
        """

        for event in self.reduced_events:
            if event['event'] in ['off', '-']:
                # this event should be by itself
                self.is_offline = True
                self.style['background-color'] = self.settings.colors['offline_color']
                break
            if event['event'] == '+':
                self.is_offline = False

            if event['event'] in ['start', 'finish', 'running']:
                self.has_nothing = False
                self.style['background-color'] = event['color']
                break

        if not 'background-color' in self.style:
            self.style['background-color'] = self.settings.colors['base_lane_color']

    def _set_starts(self):
        """
        Set the start arrow in case we have an event that starts on this slot
        If the event is present, it is unique
        """
        # try:
        #     event = next(filter(lambda x: x['event'] == 'start', self.reduced_events))
        # except StopIteration:
        #     return

        # self.style['border-left'] = '5px solid green'
        self._set_style()

    def _set_finishes(self):
        """
        Set the start arrow in case we have an event that starts on this slot
        If the event is present, it is unique
        """
        # try:
        #     event = next(filter(lambda x: x['event'] == 'finish', self.reduced_events))
        # except StopIteration:
        #     return

        # self.style['border-left'] = '5px solid red'
        self._set_style()

    def _set_style(self):
        self.slot.setStyleSheet("")

        styles = ""

        for rule, value in self.style.items():
            styles += f"{rule}: {value};"

        self.slot.setStyleSheet(styles)

    def _set_before_style(self):
        self.before_slot.set_style()

    def reset_style(self):
        """
        Method that resets the style based on the actual settings
        """

        if self.settings.display['show_deadlines']:
            self.before_slot.show()
            self.slot.setFixedSize(
                self.settings.sizes['slot_width'],
                self.settings.sizes['processor_slot_height'])

            self.before_slot.set_size(True)

        else:
            self.before_slot.hide()
            self.before_slot.set_size(False)

            self.slot.setFixedSize(
                self.settings.sizes['slot_width'],
                self.settings.sizes['processor_slot_height'])

        if self.has_nothing:
            self.style['background-color'] = self.settings.colors['base_lane_color']

        if self.is_offline:
            self.style['background-color'] = self.settings.colors['offline_color']

        self._set_style()
        self._set_before_style()


class BeforeSlot(QWidget):
    """
    This widget is present in every slot
    Contains the "arrows" showing if there is an activation and deadline
    For all processors are the same
    """
    BEFORE_SLOT_STYLE = {
        'background-color': 'red'
    }

    def __init__(self, independant_events, settings):
        super().__init__()
        self.style = BeforeSlot.BEFORE_SLOT_STYLE.copy()
        self.independant_events = independant_events
        self.settings = settings

        # List that contains all the labels to show deadlines and activations
        self.labels = []
        self.h_layout = QHBoxLayout(self)
        self.h_layout.setSpacing(0)

        self.h_layout.setContentsMargins(0, 0, 0, 0)
        self.initiate_labels()

    def initiate_labels(self):
        for task_id, events in self.independant_events.items():
            for event in events:
                if event['event'] == 'activation':
                    # draw activation line
                    label = QLabel(event['job_id'])
                    label.setStyleSheet(f"""
                                        background-color: {event['color']};
                                        border-top-left-radius: {self.settings.sizes['deadline_width'] -1 }px;
                                        margin-left: 1px;
                                        border: 1px solid black;
                                        """)
                    self.labels.append(label)
                if event['event'] == 'deadline':
                    label = QLabel(event['job_id'])
                    label.setStyleSheet(f"""
                                        background-color: {event['color']};
                                        border-bottom-right-radius: {self.settings.sizes['deadline_width']-1}px;
                                        margin-left: 1px;
                                        border: 1px solid black;
                                        """)
                    self.labels.append(label)

        for label in self.labels:
            self.h_layout.addWidget(label)

        self.set_size(self.settings.display['show_deadlines'])

    def set_style(self):
        self.setStyleSheet("")

        styles = ""

        for rule, value in self.style.items():
            styles += f"{rule}: {value};"

        self.setStyleSheet(styles)

    def set_size(self, show):

        if show:
            label_width = self.settings.sizes['deadline_width']

            for label in self.labels:
                label.setFixedSize(label_width, self.settings.sizes['processor_slot_height'])

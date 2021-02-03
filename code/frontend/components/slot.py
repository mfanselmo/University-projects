from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class Slot(QLabel):

    BASE_STYLE = {
        'border-right': '1px solid black',
    }

    def __init__(self, processor_id, timestamp, events, settings):
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
        self.style = Slot.BASE_STYLE.copy()
        self.processor_id = processor_id
        self.timestamp = timestamp
        self.reduced_events = []
        self.has_nothing = True
        self.is_offline = True
        self._reduce_events()
        self.initialize_gui()

    def initialize_gui(self):
        # self.setText("TASK")
        self.setFixedSize(self.settings.sizes['slot_width'], self.settings.sizes['processor_slot_height'])
        # self.setMinimumWidth(50)
        # self.setMinimumHeight(50)
        self._set_style()

        self._set_text()
        self._set_color()
        self._set_starts()
        self._set_finishes()

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

        self.setText(final_text)

    def _set_color(self):
        """
        Finds the first event for this slot with a color associated
        Only start, finish and running have this property
        This value should be unique, and is checked before
        """
        try:
            event = next(filter(lambda x: 'color' in x, self.reduced_events))
            final_color = event['color'] if event['event'] != 'finish' else self.settings.colors['base_lane_color']
        except StopIteration:
            final_color = self.settings.colors['base_lane_color']

        self.style['background-color'] = final_color

        # is there is an offline event, processor is grayed out
        try:
            event = next(filter(lambda x: x['event'] == 'off' or x['event'] == '-', self.reduced_events))
            self.style['background-color'] = self.settings.colors['offline_color']
            self.is_offline = True
        except StopIteration:
            pass

        self._set_style()

    def _set_starts(self):
        """
        Set the start arrow in case we have an event that starts on this slot
        If the event is present, it is unique
        """
        try:
            event = next(filter(lambda x: x['event'] == 'start', self.reduced_events))
        except StopIteration:
            return

        self.style['border-left'] = '5px solid green'
        self._set_style()

    def _set_finishes(self):
        """
        Set the start arrow in case we have an event that starts on this slot
        If the event is present, it is unique
        """
        try:
            event = next(filter(lambda x: x['event'] == 'finish', self.reduced_events))
        except StopIteration:
            return

        self.style['border-left'] = '5px solid red'
        self._set_style()

    def _set_style(self):
        self.setStyleSheet("")

        styles = ""

        for rule, value in self.style.items():
            styles += f"{rule}: {value};"

        self.setStyleSheet(styles)

    def reset_style(self):
        self.setFixedSize(self.settings.sizes['slot_width'], self.settings.sizes['processor_slot_height'])

        if self.has_nothing:
            self.style['background-color'] = self.settings.colors['base_lane_color']
        if self.is_offline:
            self.style['background-color'] = self.settings.colors['offline_color']

        self._set_style()

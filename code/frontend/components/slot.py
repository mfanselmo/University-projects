from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class Slot(QLabel):

    BASE_STYLE = {
        'border-right': '1px solid black',
    }

    def __init__(self, processor_id, timestamp, events):
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
        self.events = events
        self.style = Slot.BASE_STYLE.copy()
        self.processor_id = processor_id
        self.timestamp = timestamp
        self.reduced_events = []
        # print(processor_id, timestamp, events)
        self._reduce_events()
        self.initialize_gui()

    def initialize_gui(self):
        # self.setText("TASK")
        self.setFixedSize(100, 100)
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
                if event['event'] in ['activation', 'deadline']:
                    final_text += f"tid: {task} | jid: {event['job_id']} \n|  {event['event']}\n"

        self.setText(final_text)

    def _set_color(self):
        """
        Finds the first event for this slot with a color associated
        Only start, finish and running have this property
        This value should be unique, and is checked before
        """
        try:
            final_color = next(filter(lambda x: 'color' in x, self.reduced_events))['color']
        except StopIteration:
            final_color = "#FFFFFF"

        self.style['background-color'] = final_color
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

        self.style['border-right'] = '5px solid red'
        self._set_style()

    def _set_style(self):
        self.setStyleSheet("")

        styles = ""

        for rule, value in self.style.items():
            styles += f"{rule}: {value};"

        self.setStyleSheet(styles)

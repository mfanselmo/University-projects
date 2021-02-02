from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)
from frontend.constants import GENERAL_SLOT_HEIGHT, GENERAL_SLOT_WIDTH


class GeneralSlot(QLabel):

    BASE_STYLE = {
        'border-right': '1px solid black',
        'background-color': 'transparent',
    }

    def __init__(self, timestamp, events):
        super().__init__()
        self.events = events
        self.style = GeneralSlot.BASE_STYLE.copy()
        self.timestamp = timestamp
        self.reduced_events = []
        self._reduce_events()
        self.initialize_gui()

    def initialize_gui(self):
        # self.setText("TEST")
        self.setFixedSize(GENERAL_SLOT_WIDTH, GENERAL_SLOT_HEIGHT)
        # self.setMinimumWidth(50)
        # self.setMinimumHeight(50)
        self._set_style()
        self._add_events()

    def _add_events(self):
        # Only activations or deadlines
        text = ""
        for event in self.reduced_events:
            text += f"T{event['task_id']} J{event['job_id']}: {event['event']}\n"

        self.setText(text)

    def _set_style(self):
        self.setStyleSheet("")
        styles = ""
        for rule, value in self.style.items():
            styles += f"{rule}: {value};"

        self.setStyleSheet(styles)

    def _reduce_events(self):
        """
        gets the events for this slot in a more ordered way
        """
        reduced_events = []
        for task_id, events in self.events.items():
            for event in events:
                aux = {"task_id": task_id, **event}
                reduced_events.append(aux)

        self.reduced_events = reduced_events

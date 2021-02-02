from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class GeneralSlot(QLabel):

    BASE_STYLE = {
        'border-right': '1px solid black',
        'background-color': 'white',
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
        self.setText("TEST")
        self.setFixedSize(100, 100)
        # self.setMinimumWidth(50)
        # self.setMinimumHeight(50)
        self._set_style()

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
        for task, events in self.events.items():
            for event in events:
                reduced_events.append(event)

        self.reduced_events = reduced_events

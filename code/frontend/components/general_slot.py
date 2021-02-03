from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class GeneralSlot(QLabel):

    BASE_STYLE = {
        'border-right': '1px solid black',
    }

    def __init__(self, timestamp, events, settings):
        super().__init__()
        self.settings = settings
        self.events = events
        self.style = GeneralSlot.BASE_STYLE.copy()
        self.timestamp = timestamp
        self.reduced_events = []
        self._reduce_events()
        self.initialize_gui()

    def initialize_gui(self):
        self.setFixedSize(self.settings.sizes['slot_width'], self.settings.sizes['general_slot_height'])
        self.style['background-color'] = self.settings.colors['base_lane_color']
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

    def reset_style(self):
        self.setFixedSize(self.settings.sizes['slot_width'], self.settings.sizes['general_slot_height'])
        self.style['background-color'] = self.settings.colors['base_lane_color']
        self._set_style()

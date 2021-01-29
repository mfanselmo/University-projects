from PyQt5.QtWidgets import (QApplication, QWidget, QLabel)


class Slot(QLabel):

    STYLE = """
            border: 1px solid black;
            """

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
        print(processor_id, timestamp, events)
        self.initialize_gui()

    def initialize_gui(self):
        # self.setText("TASK")
        self.setFixedSize(100, 100)
        # self.setMinimumWidth(50)
        # self.setMinimumHeight(50)
        self.setStyleSheet(Slot.STYLE)

        self._set_text()

    def _set_text(self):
        final_text = ""

        for task, events in self.events.items():
            for event in events:
                # if event['event'] not in ['activation', 'deadline']:
                final_text += f"tid: {task} | jid: {event['job_id']} \n|  {event['event']}\n"

        self.setText(final_text)

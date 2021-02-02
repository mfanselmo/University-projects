from PyQt5.QtWidgets import (QApplication, QScrollArea, QSizePolicy, QWidget, QPushButton, QLabel,
                             QGridLayout, QHBoxLayout, QVBoxLayout)

from PyQt5.QtCore import Qt


class Legend(QWidget):
    def __init__(self, backend):
        super().__init__()
        if backend is None:
            return
        self.backend = backend
        self.layout = QHBoxLayout(self)

        for _, task in self.backend.tasks.items():
            self.layout.addWidget(TaskLegend(task))
        self.layout.addStretch()


class TaskLegend(QWidget):
    def __init__(self, task):
        super().__init__()
        self.task_id = task.id
        self.color = task.color
        self.layout = QHBoxLayout(self)

        self.color_box = QLabel()
        self.color_box.setFixedSize(20, 20)
        self.color_box.setStyleSheet(f"background-color: {self.color}; ")

        self.label_text = QLabel()
        self.label_text.setText(f"Task {self.task_id}")

        self.layout.addWidget(self.color_box)
        self.layout.addWidget(self.label_text)

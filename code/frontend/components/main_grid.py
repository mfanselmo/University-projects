from PyQt5.QtWidgets import (QApplication, QScrollArea, QSizePolicy, QWidget, QPushButton, QLabel,
                             QGridLayout, QHBoxLayout, QVBoxLayout)

from PyQt5.QtCore import Qt

from frontend.components.slot import Slot
from frontend.components.general_slot import GeneralSlot


class GridComponent(QWidget):
    def __init__(self, backend):
        super().__init__()

        self.backend = backend
        self.number_processors = backend.number_processors
        self.number_timestamp = backend.number_timestamps

        self.initialize_gui()

    def initialize_gui(self):

        self.layout = QVBoxLayout(self)
        self.scrollArea = QScrollArea(self)
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents = QWidget()

        self.grid = QGridLayout(self.scrollAreaWidgetContents)
        # self.grid.setContentsMargins(100, 100, 100, 100)
        self.grid.setHorizontalSpacing(0)
        self.grid.setVerticalSpacing(5)
        self.grid.setAlignment(Qt.AlignTop)
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)

        self.layout.addWidget(self.scrollArea)

        self.grid.addWidget(QLabel("---"), 0, 0)

        # Add row labels
        processors = []
        for i, processor in enumerate(self.backend.processors.values()):
            label = GridRowLabel(f"CPU {processor.id}")
            self.grid.addWidget(label, i + 1, 0)
            processors.append(processor.id)

        # Add cpu independant row label
        label = GridRowLabel('GENERAL')
        self.grid.addWidget(label, len(processors) + 1, 0)

        # Add Column labels
        timestamps = []
        for i in range(self.number_timestamp):
            label = GridColLabel(i)
            self.grid.addWidget(label, 0, i+1)
            timestamps.append(i)

        positions = [(i, j) for i in range(self.number_processors) for j in range(self.number_timestamp)]
        for i, processor_id in enumerate(processors):
            for j, ts in enumerate(timestamps):
                slot = Slot(processor_id, ts, self.backend[processor_id][ts])

                self.grid.addWidget(slot, i+1, j+1)

        # Add processor independant tasks row
        for i, ts in enumerate(timestamps):
            events = {}
            # pass
            # try:

            #     events  = self.backend['0'][ts]
            # except KeyError
            general_slot = GeneralSlot(ts, self.backend.get_processor_independant_tasks(ts))
            self.grid.addWidget(general_slot, len(processors)+1, i+1)


class GridRowLabel(QLabel):
    def __init__(self, text):
        super().__init__()
        self.setText(text)
        self.setFixedWidth(60)


class GridColLabel(QLabel):
    def __init__(self, ts):
        super().__init__()
        self.setText(f"{ts}")
        self.setFixedHeight(50)

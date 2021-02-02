from PyQt5.QtWidgets import (QScrollArea, QWidget, QVBoxLayout)

from frontend.components.main_grid import GridComponent
from frontend.components.legend import Legend


class MainScrollArea(QWidget):
    def __init__(self, backend):
        super().__init__()

        self.backend = backend

        self.initialize_gui()

    def initialize_gui(self):
        self.grid = GridComponent(self.backend)
        self.legend = Legend(self.backend)

        self.layout = QVBoxLayout(self)
        self.scrollArea = QScrollArea(self)
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents = ScrollWidgetContents(self.grid, self.legend)
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)
        self.layout.addWidget(self.scrollArea)


class ScrollWidgetContents(QWidget):
    def __init__(self, grid, legend):
        super().__init__()
        self.layout = QVBoxLayout(self)
        self.layout.addWidget(grid)
        self.layout.addWidget(legend)
        self.layout.addStretch()

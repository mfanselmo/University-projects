from PyQt5.QtWidgets import (QScrollArea, QWidget, QVBoxLayout)

from frontend.components.main_grid import GridComponent
from frontend.components.legend import Legend


class MainScrollArea(QWidget):
    def __init__(self, backend, settings):
        super().__init__()

        self.backend = backend
        self.settings = settings

        self.initialize_gui()

    def initialize_gui(self):

        self.grid = GridComponent(self.backend, self.settings)
        self.legend = Legend(self.backend)

        self.my_layout = QVBoxLayout()
        self.scrollArea = QScrollArea()
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents = ScrollWidgetContents(self.grid, self.legend)
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)
        self.reset_background_color()

        self.my_layout.addWidget(self.scrollArea)
        self.setLayout(self.my_layout)

    def reset_background_color(self):
        color = self.settings.colors['background_color']
        self.scrollArea.setStyleSheet(f"background-color:{color};")

    def reset_show_pattern(self):
        # TODO
        # color = self.settings.colors['background_color']
        # self.scrollArea.setStyleSheet(f"background-color:{color};")
        pass

    def reset_gui(self, backend):
        self.backend = backend
        self.grid = GridComponent(self.backend)
        self.legend = Legend(self.backend)
        self.scrollArea = QScrollArea()
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents = ScrollWidgetContents(self.grid, self.legend)
        self.scrollArea.setWidget(self.scrollAreaWidgetContents)
        self.my_layout.addWidget(self.scrollArea)

    def clear_layout(self):
        """
        removes scroll area, and created widgets within
        """
        while self.layout().count():
            child = self.layout().takeAt(0)
            if child.widget():
                child.widget().deleteLater()


class ScrollWidgetContents(QWidget):
    def __init__(self, grid, legend):
        super().__init__()
        self.layout = QVBoxLayout(self)
        self.layout.addWidget(grid)
        self.layout.addWidget(legend)
        self.layout.addStretch()

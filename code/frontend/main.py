from PyQt5 import QtCore
from backend.backend import Backend
from frontend.helpers import print_widget

from frontend.components.main_grid import GridComponent

from os import path

from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton, QLabel,
                             QLineEdit, QHBoxLayout, QVBoxLayout, QFileDialog)
# from .backend.events import *


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.backend = Backend(path.relpath("./schedules/test2.csv"))
        self.grid = None
        self.initialize_gui()

    def initialize_gui(self):
        self.setGeometry(200, 100, 1200, 800)
        self.setWindowTitle('Schedule visualizer tool')

        self.open_button = QPushButton('&Open new schedule', self)
        self.print_button = QPushButton('&Print schedule', self)
        self.print_button.clicked.connect(self.generate_pdf)

        """
        this hbox has the buttons on the bottom
        """
        hbox = QHBoxLayout()
        hbox.addWidget(self.open_button)
        hbox.addWidget(self.print_button)
        hbox.addStretch(1)

        """
        This grid layout has the gantt style chart
        """
        grid = GridComponent(self.backend)
        self.grid = grid

        vbox = QVBoxLayout()
        vbox.addWidget(grid)
        vbox.addLayout(hbox)
        self.setLayout(vbox)

    def generate_pdf(self):
        fn, _ = QFileDialog.getSaveFileName(
            self, "Export PDF", None, "PDF files (.pdf);;All Files()"
        )
        if fn:
            if QtCore.QFileInfo(fn).suffix() == "":
                fn += ".pdf"

            print_widget(self.grid, fn)

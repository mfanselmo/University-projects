from backend.backend import Backend

from frontend.components.grid import GridComponent

from os import path

from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton, QLabel,
                             QLineEdit, QHBoxLayout, QVBoxLayout)
# from .backend.events import *


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.backend = Backend(path.relpath("./schedules/test1.csv"))
        self.initialize_gui()

    def initialize_gui(self):
        self.setGeometry(200, 100, 1200, 800)
        self.setWindowTitle('Schedule visualizer tool')

        self.button1 = QPushButton('&Button1', self)
        self.button2 = QPushButton('&Button2', self)

        """
        this hbox has the buttons on the bottom
        """
        hbox = QHBoxLayout()
        hbox.addWidget(self.button1)
        hbox.addWidget(self.button2)
        hbox.addStretch(1)

        """
        This grid layout has the gantt style chart
        """
        grid = GridComponent(self.backend)

        vbox = QVBoxLayout()
        vbox.addWidget(grid)
        vbox.addLayout(hbox)
        self.setLayout(vbox)

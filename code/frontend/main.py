from PyQt5 import QtCore
from backend.backend import Backend
from frontend.helpers import print_widget

from frontend.components.scroll_area import MainScrollArea

from os import path,  getcwd

from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton, QLabel,
                             QLineEdit, QHBoxLayout, QVBoxLayout, QFileDialog)
# from .backend.events import *


class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.backend = None  # Backend(path.relpath("./schedules/offline-online.csv"))
        self.initialize_gui()
        self.load_schedule()

    def initialize_gui(self):
        self.setGeometry(200, 100, 1200, 800)
        self.setWindowTitle('Schedule visualizer tool')

        self.open_button = QPushButton('&Open new schedule', self)
        self.print_button = QPushButton('&Print schedule', self)
        self.print_button.clicked.connect(self.generate_pdf)
        self.open_button.clicked.connect(self.load_schedule)

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

        vbox = QVBoxLayout()
        scroll = MainScrollArea(self.backend)
        self.scroll = scroll
        # self.scroll = QLabel("Open a schedule")
        vbox.addWidget(self.scroll)
        vbox.addLayout(hbox)
        self.setLayout(vbox)

    def load_schedule(self):

        fname = QFileDialog.getOpenFileName(self, 'Open schedule',
                                            path.abspath(getcwd()), "CSV (*.csv)")

        # csv_path = path.relpath("./schedules/offline-online.csv")
        print(fname)
        self.backend = Backend(fname[0])

        self.scroll.clear_layout()
        self.scroll.reset_gui(self.backend)

    def generate_pdf(self):
        fn, _ = QFileDialog.getSaveFileName(
            self, "Export PDF", None, "PDF files (.pdf);;All Files()"
        )
        if fn:
            if QtCore.QFileInfo(fn).suffix() == "":
                fn += ".pdf"

            print_widget(self.scroll, fn)

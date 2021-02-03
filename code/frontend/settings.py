import json
from PyQt5.QtWidgets import (QApplication, QWidget, QPushButton, QLabel,
                             QLineEdit, QHBoxLayout, QVBoxLayout, QFileDialog)


class Settings(QWidget):

    def __init__(self, path, reset_settings):
        super().__init__()
        self.reset_settings = reset_settings  # function

        self.data = {}
        with open(path) as json_file:
            self.data = json.load(json_file)

        self.colors = self.data['colors']
        self.sizes = self.data['sizes']
        self.display = self.data['display']

        self.initialize_gui()

    def initialize_gui(self):
        self.main_layout = QHBoxLayout()
        # main: [button show, settings]
        self.settings_controls = SettingControls(self)
        self.enable_button = QPushButton("&Show settings")
        self.enable_button.clicked.connect(self.show_controls)
        self.main_layout.addWidget(self.enable_button)
        self.main_layout.addWidget(self.settings_controls)

        self.setLayout(self.main_layout)

    def change_background_color(self, background_hex="blue"):
        self.colors['background_color'] = background_hex
        self.reset_settings()

    def change_sizes(self, sizes):
        """
        sizes = (slot_width, processor_slot_height, general_slot_height)
        """
        self.sizes['slot_width'] = sizes[0]
        self.sizes['processor_slot_height'] = sizes[1]
        self.sizes['general_slot_height'] = sizes[2]

        self.reset_settings()

    def show_controls(self):
        self.display['show_controls'] = not self.display['show_controls']
        if self.display['show_controls']:
            self.settings_controls.show()
        else:
            self.settings_controls.hide()


class SettingControls(QWidget):
    def __init__(self, parent):
        super().__init__()
        self.parent = parent
        self.initialize_layout()

    def initialize_layout(self):
        self.main_layout = QVBoxLayout()
        self.background_button = QPushButton("Change background")
        self.main_layout.addWidget(self.background_button)
        self.setLayout(self.main_layout)
        if not self.parent.display['show_controls']:
            self.hide()

        self.background_button.clicked.connect(self.parent.change_background_color)

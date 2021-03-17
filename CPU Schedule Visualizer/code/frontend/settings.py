import json
from PyQt5.QtCore import QSignalBlocker, Qt
from PyQt5.QtWidgets import (QApplication, QCheckBox, QWidget, QPushButton, QLabel,
                             QSlider, QHBoxLayout, QVBoxLayout, QColorDialog)


class Settings(QWidget):

    def __init__(self, path, reset_settings):
        """
        This widget contains the button and the actual setting window
        """
        super().__init__()
        self.reset_settings = reset_settings  # function

        self.data = {}
        self.path = path
        with open(path) as json_file:
            self.data = json.load(json_file)

        self.colors = self.data['colors']
        self.sizes = self.data['sizes']
        self.display = self.data['display']
        self.show_settings = False

        self.initialize_gui()

    def initialize_gui(self):
        self.main_layout = QHBoxLayout()
        # main: [button show, settings]
        self.settings_controls = SettingControls(self)
        self.settings_controls.hide()

        self.enable_button = QPushButton("&Show settings")
        self.enable_button.clicked.connect(self.show_controls)
        self.main_layout.addWidget(self.enable_button)

        self.setLayout(self.main_layout)

    def change_color(self, background_hex, event_caller):
        self.colors[event_caller] = background_hex
        self.reset_settings()

    def change_sizes(self, sizes):
        """
        sizes = (slot_width, processor_slot_height, general_slot_height, deadline_width)
        """
        self.sizes['slot_width'] = sizes['slot_width']
        self.sizes['deadline_width'] = sizes['deadline_width']
        self.sizes['processor_slot_height'] = sizes['processor_slot_height']
        # self.sizes['general_slot_height'] = sizes['general_slot_height']
        self.reset_settings()

    def change_show_deadlines(self, event):
        self.display['show_deadlines'] = event
        self.reset_settings()

    def show_controls(self):
        # self.display['show_controls'] = not self.display['show_controls']
        self.show_settings = not self.show_settings
        if self.show_settings:
            self.settings_controls.show()
        else:
            self.settings_controls.hide()

    def save_settings(self):

        data = {'colors': self.colors, 'sizes': self.sizes, 'display': self.display}
        with open(self.path, "w") as json_file:
            json.dump(data, json_file)


class SettingControls(QWidget):
    def __init__(self, parent):
        super().__init__()
        self.parent = parent
        self.setGeometry(300, 300, 500, 400)
        self.setWindowTitle('Settings')
        self.initialize_layout()

    def _define_controls(self):
        self.background_button = QPushButton("Change background color")
        self.offline_button = QPushButton("Change offline lane color")
        self.base_lane_button = QPushButton("Change base lane color")
        self.show_deadlines_checkbox = QCheckBox("Show deadlines")
        self.sizes_control = SizesControl(self.parent.sizes, self.parent.change_sizes)
        self.save_changes = QPushButton("Save changes permanently")
        self.close_interface = QPushButton("Close interface")
        self.sizes_control.init_values()

        self.save_changes.clicked.connect(self.parent.save_settings)
        self.close_interface.clicked.connect(lambda: self.parent.show_controls())
        self.background_button.clicked.connect(lambda: self.show_color_settings("background_color"))
        self.offline_button.clicked.connect(lambda: self.show_color_settings("offline_color"))
        self.base_lane_button.clicked.connect(lambda: self.show_color_settings("base_lane_color"))

        self.show_deadlines_checkbox.clicked.connect(self.parent.change_show_deadlines)
        self.show_deadlines_checkbox.setChecked(self.parent.display['show_deadlines'])

    def initialize_layout(self):
        self._define_controls()

        self.colors_layout = QVBoxLayout()
        self.colors_layout.addWidget(self.background_button)
        self.colors_layout.addWidget(self.offline_button)
        self.colors_layout.addWidget(self.base_lane_button)
        self.colors_layout.addWidget(self.show_deadlines_checkbox)

        self.horizontal_layout = QHBoxLayout()
        self.horizontal_layout.addLayout(self.colors_layout)
        self.horizontal_layout.addWidget(self.sizes_control)

        self.apply_settings_layout = QHBoxLayout()
        self.apply_settings_layout.addWidget(self.save_changes)
        self.apply_settings_layout.addWidget(self.close_interface)

        self.main_layout = QVBoxLayout()
        self.main_layout.addLayout(self.horizontal_layout)
        self.main_layout.addLayout(self.apply_settings_layout)

        self.setLayout(self.main_layout)

    def show_color_settings(self, event_caller):
        color = QColorDialog.getColor()
        if color.isValid():
            if event_caller == "background_color":
                self.parent.change_color(color.name(), event_caller)
            elif event_caller == "offline_color":
                self.parent.change_color(color.name(), event_caller)
            elif event_caller == "base_lane_color":
                self.parent.change_color(color.name(), event_caller)


class SizesControl(QWidget):
    def __init__(self, sizes, change_sizes):
        super().__init__()
        self.change_sizes = change_sizes
        self.deadline_width = sizes['deadline_width']
        self.slot_width = sizes['slot_width']
        self.processor_slot_height = sizes['processor_slot_height']

        self.deadline_width_slider = QSlider(orientation=Qt.Horizontal)
        self.slot_width_slider = QSlider(Qt.Horizontal)
        self.processor_slot_height_slider = QSlider(Qt.Horizontal)
        self.init_values()

        self.apply_button = QPushButton("Apply sizes")

        self.apply_button.clicked.connect(self.apply_size)

        self.v_layout = QVBoxLayout()
        self.v_layout.addWidget((QLabel("Deadline width")))
        self.v_layout.addWidget(self.deadline_width_slider)
        self.v_layout.addWidget((QLabel("Slot width")))
        self.v_layout.addWidget(self.slot_width_slider)
        self.v_layout.addWidget((QLabel("Slot height")))
        self.v_layout.addWidget(self.processor_slot_height_slider)

        self.setLayout(self.v_layout)

    def init_values(self):
        self.deadline_width_slider.setMinimum(4)
        self.deadline_width_slider.setMaximum(50)
        self.deadline_width_slider.setValue(self.deadline_width)

        self.slot_width_slider.setMinimum(10)
        self.slot_width_slider.setMaximum(300)
        self.slot_width_slider.setValue(self.slot_width)

        self.processor_slot_height_slider.setMinimum(10)
        self.processor_slot_height_slider.setMaximum(300)
        self.processor_slot_height_slider.setValue(self.processor_slot_height)

        self.deadline_width_slider.sliderReleased.connect(self.apply_size)
        self.slot_width_slider.sliderReleased.connect(self.apply_size)
        self.processor_slot_height_slider.sliderReleased.connect(self.apply_size)

    def apply_size(self):
        self.change_sizes({'slot_width': self.slot_width_slider.value(),
                           'processor_slot_height': self.processor_slot_height_slider.value(),
                           'deadline_width': self.deadline_width_slider.value()
                           })

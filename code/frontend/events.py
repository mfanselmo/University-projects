from PyQt5.QtCore import QObject, pyqtSignal


class PrintSignal(QObject):
    signal = pyqtSignal()

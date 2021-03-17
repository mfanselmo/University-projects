import sys

from PyQt5.QtWidgets import QApplication

from frontend.main import MainWindow

if __name__ == '__main__':
    def hook(type, value, traceback):
        print(type)
        print(traceback)

    sys.__excepthook__ = hook

    app = QApplication([])
    ventana = MainWindow()
    ventana.show()
    app.exec()

from PyQt5 import QtPrintSupport, QtCore, QtGui


def print_widget(widget, filename):

    width, height = widget.backend.size_of_grid()
    old_width, old_height = widget.width(), widget.height()
    widget.setGeometry(14, 14, width, height)

    printer = QtPrintSupport.QPrinter(QtPrintSupport.QPrinter.HighResolution)
    printer.setOutputFormat(QtPrintSupport.QPrinter.PdfFormat)
    printer.setOutputFileName(filename)
    # printer.setFullPage(True)

    size = QtGui.QPageSize(QtCore.QSizeF(width/5, height/5), QtGui.QPageSize.Millimeter)
    printer.setPageSize(size)

    painter = QtGui.QPainter(printer)

    # start scale
    xscale = printer.pageRect().width() * 1.0 / widget.width()
    yscale = printer.pageRect().height() * 1.0 / widget.height()
    scale = min(xscale, yscale)
    painter.translate(printer.paperRect().center())
    painter.scale(scale, scale)
    painter.translate(-widget.width() / 2, -widget.height() / 2)

    # end scale

    widget.render(painter)
    painter.end()

    # reset geometry of widget
    widget.setGeometry(14, 14, old_width, old_height)

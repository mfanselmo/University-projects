"""
File for testing purposes
"""
from os import path
from task import Task

FILE_PATH = path.relpath("./schedules/test1.csv")


tasks = {}
with open(FILE_PATH) as f:

    for line in f.readlines():
        process_line(line)

for task in Task.tasks.values():
    print(task)

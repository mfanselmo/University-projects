from os import times


class Processor:

    def __init__(self, processor_id):
        self.id = processor_id
        self.tasks = {}

    def add_task(self, task):
        self.tasks[task.id] = task

    def __getitem__(self, timestamp: int):
        """
        returns everything that happens in this processor at this timestamp
        syntax: processor_instance[2]
        """

        events = {}
        # check for processor dependant events (start, finish)
        for task in self.tasks.values():
            events[task.id] = task.get_processor_events(timestamp, self.id)

        # Also add processor independant events (activation, deadline)
        # for task in Processor.processor_independant_tasks.values():

        #     if task.id in events:
        #         new_tasks = task[timestamp]
        #         events[task.id].extend(new_tasks)
        #     else:
        #         new_tasks = task[timestamp]
        #         events[task.id] = new_tasks

        return events

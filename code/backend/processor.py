from os import execlp, times


class Processor:

    def __init__(self, processor_id):
        self.id = processor_id
        self.tasks = {}
        self.task_independant_events = {}

    def add_task(self, task):
        self.tasks[task.id] = task

    def add_task_independant_event(self, ts, type_of_event, data):
        try:
            self.task_independant_events[ts].append({"event": type_of_event, "data": data.strip("\n")})
        except KeyError:
            self.task_independant_events[ts] = [{"event": type_of_event, "data": data.strip("\n")}]

    def __getitem__(self, timestamp: int):
        """
        returns everything that happens in this processor at this timestamp
        syntax: processor_instance[2]
        """

        events = {}
        # check for processor dependant events (start, finish)
        for task in self.tasks.values():
            events[task.id] = task.get_processor_events(timestamp, self.id)

        back_online = False
        try:
            events['-1'] = self.task_independant_events[str(timestamp)]

            online_events = filter(lambda x: x['event'] == '+', events['-1'])
            try:
                next(online_events)
                back_online = True

            except StopIteration:
                pass

        except KeyError:
            pass

        # Lastly, check if procesor is offline or not

        # Not possible to be offline (can only start offline)
        if timestamp == 0 or back_online:
            return events

        # Check if timestamp before was offline and this is not back online
        timestamp_before = timestamp - 1

        # print("id: ", self.id, "TS: ", timestamp)

        try:
            # may generate key error exception
            tasks_before = self.task_independant_events[str(timestamp_before)]
            # print(self.task_independant_events)
            # print("Tasks before: ", tasks_before)

            aux = next(filter(lambda x: x['event'] == '-' or x['event'] == 'off', tasks_before))
            # print(aux)

            # If we reach this point, it means that the processor is offline. Add this event

            if '-1' in events:
                events['-1'].append({'event': 'off'})
            else:
                events['-1'] = [{'event': 'off'}]

            if str(timestamp) in self.task_independant_events:
                self.task_independant_events[str(timestamp)].append({'event': 'off'})
            else:
                self.task_independant_events[str(timestamp)] = [{'event': 'off'}]

        except (KeyError, StopIteration) as e:
            pass

        # Also add processor independant events (activation, deadline)
        # for task in Processor.processor_independant_tasks.values():

        #     if task.id in events:
        #         new_tasks = task[timestamp]
        #         events[task.id].extend(new_tasks)
        #     else:
        #         new_tasks = task[timestamp]
        #         events[task.id] = new_tasks

        return events

from backend.task import Task
from backend.processor import Processor


class Backend:
    """
    Contains all logic information
    Reads the file given, and creates the objects for the processors, tasks and jobs

    """

    def __init__(self, file_path, settings):

        self.tasks = {}
        self.processors = {}
        self.processor_independant_tasks = {}
        self.settings = settings

        self.file_path = file_path

        self._number_processors = None
        self._number_timestamps = None
        self._number_activations_deadlines = None

        self.read_file()

    @property
    def number_activations_deadlines(self):
        if self._number_activations_deadlines:
            return self._number_activations_deadlines

        self._number_activations_deadlines = 0
        for ts in range(self.number_timestamps + 1):
            events = self.get_processor_independant_tasks(ts)

            for task_events in events.values():
                self._number_activations_deadlines += len(task_events)

        return self._number_activations_deadlines

    @property
    def number_processors(self):
        """
        calculates once the number of processors on the tasks
        """
        if self._number_processors:
            return self._number_processors

        uniques = set()

        for task in self.tasks.values():
            for job in task.jobs.values():
                for start in job.starts:
                    uniques.add(start['processor_id'])
                for finish in job.finishes:
                    uniques.add(finish['processor_id'])

        self._number_processors = len(uniques)
        return self._number_processors

    @property
    def number_timestamps(self):
        """
        calculates once the number of processors on the tasks
        """
        if self._number_timestamps:
            return self._number_timestamps

        max_ = -1

        for task in self.tasks.values():
            for job in task.jobs.values():
                if job.activation_ts > max_:
                    max_ = job.activation_ts
                if job.deadline_ts > max_:
                    max_ = job.deadline_ts
                for start in job.starts:
                    if start['timestamp'] > max_:
                        max_ = start['timestamp']
                for finish in job.finishes:
                    if finish['timestamp'] > max_:
                        max_ = finish['timestamp']

        self._number_timestamps = max_
        return self._number_timestamps

    def __getitem__(self, processor_id: str):
        """
        Allows us to get a processor with the syntax backend['1']
        Which allows us to get all events on a timestamp on a processor
        backend['1'][0] gets the events that happened on processor '1' in the timestamp 0
        """
        if processor_id != '0':
            return self.processors[processor_id]

        return self.processor_independant_tasks

    def get_processor_independant_tasks(self, ts):
        """
        Returns the events associated with this timestamp
        Format: { 
            task_id: [{event: "activation", info_related...}], // (Activation, Deadline, WCET)
        }
        """
        events = {}
        for task_id, task in self.processor_independant_tasks.items():
            events[task_id] = task[ts]

        return events

    def read_file(self):
        with open(self.file_path) as f:

            for line in f.readlines():
                self.process_line(line)

    def process_line(self, line):
        timestamp, task_id, job_id, processor_id, type_of_event, extra_data = line.split(",")

        data = {
            'timestamp': timestamp,
            'task_id': task_id,
            'job_id': job_id,
            'processor_id': processor_id,
            'type_of_event': type_of_event,
            'extra_data': extra_data
        }

        """
        Types of events:
        - Depends on processor and task
            - WCET of job
            - Start of job      
            - Finish of job
        - Only depends on processor (task independant)
            - Goes Online
            - Goes Offline
            - Frequency change
        - Only depends on task (processor independant)
            - Activation of job
            - Deadline of job


        """

        # Get processor in which the event happens
        processor = None
        if processor_id != '0':
            if processor_id not in self.processors:
                processor = Processor(processor_id)
                self.processors[processor_id] = processor
            else:
                processor = self.processors[processor_id]

        if task_id == '0':
            # Task independant events (offline, online, frequency change)
            self.process_processor_only_event(data, processor)
        else:
            # Processor only events (Activation + Deadlines, start + finish + WCET)
            self.process_task_event(data, processor)

    def process_processor_only_event(self, data, processor):
        """
        CPU Offline
        CPU Online
        CPU Frequency change
        """
        processor.add_task_independant_event(data['timestamp'], data['type_of_event'], data['extra_data'])

    def process_task_event(self, data, processor):
        task_id = data['task_id']
        if task_id not in self.tasks:
            # Create new Task instance
            task = Task(task_id)
            self.tasks[task_id] = task
        else:
            task = self.tasks[task_id]

        task.add_job_info(data)
        if processor is not None:
            processor.add_task(task)
        else:
            self.processor_independant_tasks[task_id] = task

    def size_of_grid(self):
        width = (self.number_timestamps + 1)*self.settings.sizes['slot_width'] + 120

        if self.settings.display['show_deadlines']:
            width += self.number_activations_deadlines*self.settings.sizes['deadline_width'] + 20

        height = self.number_processors*self.settings.sizes['processor_slot_height'] + 250

        return (width, height)

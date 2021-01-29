from backend.job import Job
from palettable.colorbrewer.qualitative import Set3_12


class Task:
    """
    doc
    """
    COLORS = Set3_12

    def __init__(self, task_id):
        self.id = task_id
        self.jobs = {}
        self.color = Task.COLORS.hex_colors[(int(self.id)-1) % 12]

    def get_processor_events(self, timestamp, processor):
        """
        returns what happens with this task at this moment
        """
        events = []
        for job in self.jobs.values():

            for start in filter(lambda x: x['processor_id'] == processor, job.starts):
                if start['timestamp'] == timestamp:
                    events.append({'job_id': job.id, 'event': 'start', 'color': self.color})
            for finish in filter(lambda x: x['processor_id'] == processor, job.finishes):
                if finish['timestamp'] == timestamp:
                    events.append({'job_id': job.id, 'event': 'finish', 'color': self.color})

           # check if the task is running in this ts
            starts = filter(lambda x: x['processor_id'] == processor, job.starts)
            finishes = filter(lambda x: x['processor_id'] == processor, job.finishes)

            for start, finish in zip(starts, finishes):
                if start['timestamp'] < timestamp < finish['timestamp']:
                    events.append({'job_id': job.id, 'event': 'running', 'color': self.color})

        return events

    def __getitem__(self, timestamp):
        """
        Same as the other get_item, por processor independant events
        returns what happens with this task at this moment
        """
        events = []
        for job in self.jobs.values():
            if job.activation_ts == timestamp:
                events.append({'job_id': job.id, 'event': 'activation'})
            if job.deadline_ts == timestamp:
                events.append({'job_id': job.id, 'event': 'deadline'})
        return events

    def add_job_info(self, data):
        """
        data = {
            'timestamp': timestamp,
            'task_id': task_id,
            'job_id': job_id,
            'processor_id': processor_id,
            'type_of_event': type_of_event,
            'extra_data': extra_data
        }
        """
        job_id = data['job_id']

        job: Job

        if job_id not in self.jobs:
            job = Job(job_id)
            self.add_job(job)
        else:
            job = self.jobs[job_id]

        type_of_event = data['type_of_event']
        if type_of_event == 'A':
            job.add_activation_ts(data['timestamp'])
        elif type_of_event == 'D':
            job.add_deadline_ts(data['timestamp'])
        elif type_of_event == 'W':
            pass
        elif type_of_event == 'S':
            job.add_start_ts(data['timestamp'], data['processor_id'])
        elif type_of_event == 'F':
            job.add_finish_ts(data['timestamp'], data['processor_id'])

    def add_job(self, job: Job):
        self.jobs[job.id] = job

    def __repr__(self):
        jobs = ""
        for job in self.jobs.values():
            jobs += f"{job}"
        return (
            f"Task {self.id}\n"
            f"{jobs}"
            "\n"
        )

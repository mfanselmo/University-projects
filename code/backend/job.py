class Job:
    """
    The information about a Job, lives inside a Task object
    """

    def __init__(self, job_id: str):
        self.id: str = job_id
        self.starts = []
        self.finishes = []
        self.activation_ts = None
        self.deadline_ts = None

    def add_activation_ts(self, activation_ts):
        self.activation_ts = int(activation_ts)

    def add_deadline_ts(self, deadline_ts):
        self.deadline_ts = int(deadline_ts)

    def add_start_ts(self, ts, processor_id):
        self.starts.append({'timestamp': int(ts), 'processor_id': processor_id})

    def add_finish_ts(self, ts, processor_id):
        self.finishes.append({'timestamp': int(ts), 'processor_id': processor_id})

    def __repr__(self):
        return (
            f"\tJob: {self.id}:\n"
            f"\tActivation: {self.activation_ts}\n"
            f"\tDeadline: {self.deadline_ts}\n"
            f"\tStarts: {self.starts}\n"
            f"\tFinishes: {self.finishes}\n"
            "\n"
        )

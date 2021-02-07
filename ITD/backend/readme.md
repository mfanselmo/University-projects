# Clup - Backend

## Installing
For running the backend locally, the python interpreter and its package manager must be installed.
- Python: v3.6 (used to develop).
- Pip (python package installer): On version 3.6, it comes with python installation.
- SQLite 3 Database: v3.34.1.

First, install SQLite, adding it to the environment variables.
Then, clone the repository and inside the `/backend` and install all the dependencies and required libraries, using the command:
- `pip install -r requirements.txt`
You can also set up a virtual environment following [this](https://medium.com/@alicecampkin/setting-up-a-forked-django-project-53d5939b7e9e) guide’s steps 2 and 3.


Then you will have to run the migrations to the database, do this with the commands below:
- `python manage.py makemigrations`
- `python manage.py migrate`

Then, if you want to access and modify the database easely using django-rest-framework built in admin panel, you need to create a super user:
- `python manage.py createsuperuser`



## Running
To run the project simply run the following command, which will set up the database and the backend server in port 8000.
- `python manage.py runserver`
Then, the backend server will be running on localhost:8000

## Use a set up database
If you want to make use of a database provided by us, you can simply start with the sqlite file given in the repository, or you can run the following commands. Note, you will have to create a new superuser after this.
- `python manage.py flush` (deletes the database)
- `python manage.py dumpdata`
- `python manage.py loaddata users-data` 

This will load the data described in the fixture users-data.json, which contains 3 stores and 3 managers. To login with these managers, simply enter the register page, and complete all the fields with the same values given in the file, as well as the passwords you want to use.

## Admin panel
- To manage the database manually, simply go to the url in which this project is running, and go to `/admin` page. There, you can access with your super user's credentials

## Deployment

This backend is deployed on a digital ocean virtual machine, to access it simply go to 
- http://167.172.0.34:8000/

Super user credentials:
- admin
- root1234@


from faker import Faker
import csv
import requests
import random

fake = Faker()

# Usuarios

with open('usuarios.csv', 'w', newline='') as csvfile:
    usernames = []
    csvfile.write("mfanselmo, mfanselmo@uc.cl\n")
    csvfile.write("rihanuch, rihanuch@uc.cl\n")
    csvfile.write("nachocontreras, icontreras1@uc.cl\n")
    for _ in range(100):
        name = fake.name().split()
        username = name[0] + "_" + name[1]
        mail = name[0] + '.' + name[1] + "@gmail.com"
        csvfile.write(username + ", " + mail)
        csvfile.write('\n')
        usernames.append(username)


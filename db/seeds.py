from faker import Faker
import csv
import requests
import random

fake = Faker()

# Usuarios
# with open('usuarios.csv', 'w', newline='') as csvfile:
#     usernames = []
#     for _ in range(100):
#         name = fake.name().split()
#         username = name[0] + "_" + name[1]
#         mail = name[0] + '.' + name[1] + "@gmail.com"
#         csvfile.write(username + ", " + mail + ", " + "'123456'")
#         csvfile.write('\n')
#         usernames.append(username)


print(fake.sentence(nb_words=6, variable_nb_words=True, ext_word_list=None))
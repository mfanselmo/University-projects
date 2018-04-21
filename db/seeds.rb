# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.new
user.email = 'guest@guest.com'
user.password = '123456'
user.password_confirmation = '123456'
user.admin = false
user.username = 'guest'
user.save!

user = User.new
user.email = 'icontreras1@uc.cl'
user.password = 'Ignacio1'
user.password_confirmation = 'Ignacio1'
user.admin = true
user.username = 'nachocontreras'
# user.likes = 20
# user.dislikes = 15
user.points = 1000
user.save!
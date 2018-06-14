# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


forum_idea = Forum.new
forum_idea.name = "Ideas"
forum_idea.description = "Este foro es utilizado para sugerir ideas de foros!"
forum_idea.save!


user = User.new
user.email = 'icontreras1@uc.cl'
user.password = 'Ignacio1'
user.password_confirmation = 'Ignacio1'
user.admin = true
user.username = 'nachocontreras'
user.save!


user = User.new
user.email = 'mfanselmo@uc.cl'
user.password = '123456'
user.password_confirmation = '123456'
user.admin = true
user.username = 'mfanselmo'
user.save!


user = User.new
user.email = 'rihanuch@uc.cl'
user.password = '000000'
user.password_confirmation = '000000'
user.admin = true
user.username = 'rihanuch'
user.save!
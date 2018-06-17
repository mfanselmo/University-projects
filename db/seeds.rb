# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'
Forum.destroy_all
User.destroy_all

forum_idea = Forum.new
forum_idea.name = "Ideas"
forum_idea.description = "Este foro es utilizado para sugerir ideas de foros!"
forum_idea.save!

# Usuarios
CSV.foreach(Rails.root.join('db/usuarios.csv'), headers: false) do |row|
  	user = User.new
	user.email = row[1]
	user.password = '123456'
	user.password_confirmation = '123456'
	if row[0] == 'mfanselmo' || row[0] == 'nachocontreras' || row[0] == 'rihanuch'
		user.admin = true
	else
		user.admin = false
	end
	user.username = row[0]
	user.save!
end


forum_chuck = Forum.new
forum_chuck.name = "Chuck Norris facts"
forum_chuck.description = "Aqui se discuten muchos datos del gran Chuck Norris"
forum_chuck.save!

# post de chuck norris
# Falta hacer un loop, y en el user.find darle un numero al azar
(1..100).each do |a|
	post = Post.new
	post.name = User.find(20).username # random username
	post.title = "Dato numero #{a} de Chuck Norris"
	post.content = Faker::ChuckNorris.unique.fact
	post.forum_id = 2
	post.created_at = '2018-05-28' # random date
	post.save!
end

# comentarios post de chuck norris

forum_chuck.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	comment = Comment.new
	comment.commenter = User.find(35).username  # Numero al azar
	comment.body = 'string al azar'
	comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
	comment.created_at = '2018-08-04'  # random date
	comment.save!
end


# Foro postres

forum_dessert = Forum.new
forum_dessert.name = "Postres"
forum_dessert.description = "Foro para la discusion de postres"
forum_dessert.save!

# post de postres
# Falta hacer un loop, y en el user.find darle un numero al azar
(1..100).each do |a|
	post = Post.new
	post.name = User.find(1).username # random username
	post.title = "Postre numero #{a}"
	variety = Faker::Dessert.variety
	topping = Faker::Dessert.topping
	flavor = Faker::Dessert.flavor
	contenido = "
	### Postre
	#### tipo : #{variety}

	Recete:
	 - sabor: #{flavor}
	 - Agregados: #{topping}
				"
	post.content = contenido
	post.forum_id = 3
	post.created_at = '2018-05-28' # random date
	post.save!
end

# comentarios post de postres
forum_dessert.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	comment = Comment.new
	comment.commenter = User.find(35).username  # Numero al azar
	comment.body = 'string al azar'
	comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
	comment.created_at = '2018-08-04'  # random date
	comment.save!
end


# forum_perros
forum_perros = Forum.new
forum_perros.name = "Perros"
forum_perros.description = "Sube a tus perros!"
forum_perros.save!

# Falta hacer un loop, y en el user.find darle un numero al azar
(1..100).each do |a|
	post = Post.new
	post.name = User.find(1).username # random username
	post.title = "Mi perro #{Faker::Dog.unique.name}"
	raza = Faker::Dog.breed
	sonido = Faker::Dog.sound
	frase = Faker::Dog.meme_phrase
	edad = Faker::Dog.age
	genero = Faker::Dog.gender
	size = Faker::Dog.size

	contenido = "
	Es de raza #{raza}
	Tiene #{edad} años y es #{raza}
	Hace #{sonido} y dice #{frase}
	Es de tamaño #{size}
				"
	post.content = contenido
	post.forum_id = 4
	post.created_at = '2018-05-28' # random date
	post.save!
end

forum_perros.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	comment = Comment.new
	comment.commenter = User.find(35).username  # Numero al azar
	comment.body = 'string al azar'
	comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
	comment.created_at = '2018-08-04'  # random date
	comment.save!
end


# forum got

forum_got = Forum.new
forum_got.name = "Game of Thrones"
forum_got.description = "Para los aficionados de GoT"
forum_got.save!

(1..100).each do |a|
	post = Post.new
	post.name = User.find(1).username # random username
	character = Faker::GameOfThrones.character 
	house = Faker::GameOfThrones.house
	city = Faker::GameOfThrones.city 
	quote = Faker::GameOfThrones.quote 
	dragon = Faker::GameOfThrones.dragon

	post.title = "#{a}. #{character}"
	contenido = "
	#{character} es mi personaje favorito de game of thrones, aunque mi casa preferida es la casa #{house}.
	Me encanta cuando muestran #{city} siendo atacada por el dragon #{dragon}
	'#{quote}!'
				"
	post.content = contenido
	post.forum_id = 5
	post.created_at = '2018-05-28' # random date
	post.save!
end

forum_got.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	comment = Comment.new
	comment.commenter = User.find(35).username  # Numero al azar
	comment.body = 'string al azar'
	comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
	comment.created_at = '2018-08-04'  # random date
	comment.save!
end



# forum harry potter

forum_harry = Forum.new
forum_harry.name = "Harry Potter"
forum_harry.description = "Para los aficionados de Harry potter"
forum_harry.save!

# Falta hacer un loop, y en el user.find darle un numero al azar
(1..100).each do |a|
	post = Post.new
	post.name = User.find(1).username # random username
	character = Faker::HarryPotter.character #=> "Harry Potter"
	location = Faker::HarryPotter.location #=> "Hogwarts"
	quote = Faker::HarryPotter.quote #=> "I solemnly swear that I am up to no good."
	book = Faker::HarryPotter.book #=> "Harry Potter and the Chamber of Secrets"
	house = Faker::HarryPotter.house #=> "Gryffindor"
	spell = 'Avada Kadabra!' #Faker::HarryPotter.spell #=> "Reparo" No esta funcionando

	post.title = "#{a}. #{quote}"
	contenido = "
	Me encanta Harry Potter y #{location}. Yo soy de la casa #{house}, mi personaje favorito es #{character}.
	#{spell}!
				"
	post.content = contenido
	post.forum_id = 6
	post.created_at = '2018-05-28' # random date
	post.save!
end

forum_harry.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	comment = Comment.new
	comment.commenter = User.find(35).username  # Numero al azar
	comment.body = 'string al azar'
	comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
	comment.created_at = '2018-08-04'  # random date
	comment.save!
end

# Subscipciones

t.integer "user_id"
t.integer "forum_id"
t.datetime "created_at", null: false
Users.all.each do |user|
	# numero_subs = random
	numero_subs = 10
	# for i in range(numero_subs)
	sub = Subscription.new
	sub.user_id = user.id
	# sub.forum_id = random.randint()
	sub.forum_id = 2
	# sub.created_at = random
	sub.created_at = '28-05-12'
	sub.save!
end


require 'csv'

def time_rand from = Time.local(2018, 5, 1), to = Time.now
	Time.at(from + rand*(to.to_f - from.to_f))
end

POST_HARRY = 25
POST_CHUCK = 25
POST_GOT = 25
POST_POSTRES = 25
POST_PERROS = 25
MAXIMO_LIKES_POR_POST = 25 # 25
MAXIMO_DISLIKES_POR_POST = 15 # 15
MIN_COM_POR_POST = 5 # 5
MAX_COM_POR_POST = 25 # 25
MAX_FAVORITOS = 20 # 20


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
	user.created_at = time_rand
	user.save!
end

puts "Usuarios listos"

forum_chuck = Forum.new
forum_chuck.name = "Chuck Norris facts"
forum_chuck.description = "Aqui se discuten muchos datos del gran Chuck Norris"
forum_chuck.created_at = time_rand
forum_chuck.save!

# post de chuck norris
# Falta hacer un loop, y en el user.find darle un numero al azar
POST_CHUCK.times do |a|
	begin
		post = Post.new
		post.name = User.find(rand(1..User.count)).username # random username
		post.title = "Dato numero #{a} de Chuck Norris"
		post.content = Faker::ChuckNorris.unique.fact
		post.forum_id = forum_chuck.id
		post.created_at = time_rand forum_chuck.created_at
		post.save!
	rescue
		break
	end
end

puts "Posts 2 listos"

# comentarios post de chuck norris

forum_chuck.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	(1..rand(MIN_COM_POR_POST..MAX_COM_POR_POST)).each do |i|
		comment = Comment.new
		comment.commenter = User.find(rand(1..User.count)).username  # Numero al azar
		comment.body = Faker::Lorem.sentence(5, true, 10)
		comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
		comment.created_at = time_rand post.created_at  # random date
		comment.save!
	end
end

puts "comentarios 2 listos"

# Foro postres

forum_dessert = Forum.new
forum_dessert.name = "Postres"
forum_dessert.description = "Foro para la discusion de postres"
forum_dessert.created_at = time_rand
forum_dessert.save!

# post de postres
# Falta hacer un loop, y en el user.find darle un numero al azar
POST_POSTRES.times do |a|
	post = Post.new
	post.name = User.find(rand(1..User.count)).username # random username
	post.title = "Postre numero #{a}"
	variety = Faker::Dessert.variety
	topping = Faker::Dessert.topping
	flavor = Faker::Dessert.flavor
	contenido = "#### Postre\n tipo : #{variety}\nReceta:\n- sabor: #{flavor}\n- Agregados: #{topping}"
	post.content = contenido
	post.forum_id = forum_dessert.id
	post.created_at = time_rand forum_dessert.created_at # random date
	post.save!
end

puts "Posts 3 listos"
# comentarios post de postres
forum_dessert.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	(1..rand(MIN_COM_POR_POST..MAX_COM_POR_POST)).each do |i|

		comment = Comment.new
		comment.commenter = User.find(rand(1..User.count)).username  # Numero al azar
		comment.body = Faker::Lorem.sentence(5, true, 10)
		comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
		comment.created_at = time_rand post.created_at  # random date
		comment.save!
	end
end
puts "Comentarios 3 listos"


# forum_perros
forum_perros = Forum.new
forum_perros.name = "Perros"
forum_perros.description = "Sube a tus perros!"
forum_perros.created_at = time_rand
forum_perros.save!

# Falta hacer un loop, y en el user.find darle un numero al azar
POST_PERROS.times do |a|
	post = Post.new
	post.name = User.find(rand(1..User.count)).username # random username
	post.title = "Mi perro #{Faker::Dog.name} #{Faker::Lorem.unique.characters(3)}"
	raza = Faker::Dog.breed
	sonido = Faker::Dog.sound
	frase = Faker::Dog.meme_phrase
	edad = Faker::Dog.age
	genero = Faker::Dog.gender
	size = Faker::Dog.size

	contenido = "Es de raza #{raza}\nTiene #{edad} años y es #{raza}\nHace #{sonido} y dice #{frase}\nEs de tamaño #{size}"
	post.content = contenido
	post.forum_id = forum_perros.id
	post.created_at = time_rand forum_perros.created_at # random date
	post.save!
end

puts "Posts 4 listos"


forum_perros.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	(1..rand(MIN_COM_POR_POST..MAX_COM_POR_POST)).each do |i|

		comment = Comment.new
		comment.commenter = User.find(rand(1..User.count)).username  # Numero al azar
		comment.body = Faker::Lorem.sentence(5, true, 10)
		comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
		comment.created_at = time_rand post.created_at  # random date
		comment.save!
	end
end

puts "Comentarios 4 listos"


# forum got

forum_got = Forum.new
forum_got.name = "Game of Thrones"
forum_got.description = "Para los aficionados de GoT"
forum_got.created_at = time_rand
forum_got.save!

POST_GOT.times do |a|
	post = Post.new
	post.name = User.find(rand(1..User.count)).username # random username
	character = Faker::GameOfThrones.character 
	house = Faker::GameOfThrones.house
	city = Faker::GameOfThrones.city 
	quote = Faker::GameOfThrones.quote 
	dragon = Faker::GameOfThrones.dragon

	post.title = "#{character} #{Faker::Lorem.unique.characters(3)}"
	contenido = "#{character} es mi personaje favorito de game of thrones, aunque mi casa preferida es la casa #{house}.\nMe encanta cuando muestran #{city} siendo atacada por el dragon #{dragon}\n'#{quote}!'"
	post.content = contenido
	post.forum_id = forum_got.id
	post.created_at = time_rand forum_got.created_at
	post.save!
end

puts "Posts 5 listos"


forum_got.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	(1..rand(MIN_COM_POR_POST..MAX_COM_POR_POST)).each do |i|
		comment = Comment.new
		comment.commenter = User.find(rand(1..User.count)).username  # Numero al azar
		comment.body = Faker::Lorem.sentence(5, true, 10)
		comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
		comment.created_at = time_rand post.created_at
		comment.save!
	end
end

puts "Comentarios 5 listos"



# forum harry potter

forum_harry = Forum.new
forum_harry.name = "Harry Potter"
forum_harry.description = "Para los aficionados de Harry potter"
forum_harry.created_at = time_rand
forum_harry.save!

# Falta hacer un loop, y en el user.find darle un numero al azar
POST_HARRY.times do |a|
	begin
		post = Post.new
		post.name = User.find(rand(1..User.count)).username # random username
		character = Faker::HarryPotter.character #=> "Harry Potter"
		location = Faker::HarryPotter.location #=> "Hogwarts"
		quote = Faker::HarryPotter.quote #=> "I solemnly swear that I am up to no good."
		book = Faker::HarryPotter.book #=> "Harry Potter and the Chamber of Secrets"
		house = Faker::HarryPotter.house #=> "Gryffindor"
		spell = 'Avada Kadabra!' #Faker::HarryPotter.spell #=> "Reparo" No esta funcionando

		post.title = "#{book}, #{Faker::Lorem.unique.words(1)[0]}"
		contenido = "Me encanta Harry Potter y #{location}. Yo soy de la casa #{house}, mi personaje favorito es #{character}.\n'#{quote}'\n#{spell}!"
		post.content = contenido
		post.forum_id = forum_harry.id
		post.created_at = time_rand forum_harry.created_at
		post.save!
	rescue 
		puts 'Se acabaron los titulos'
	end
end
puts "Posts 6 listos"


forum_harry.posts.all.each do |post|
	# Falta hacer un for i in range(random.randint)
	(1..rand(MIN_COM_POR_POST..MAX_COM_POR_POST)).each do |i|
		comment = Comment.new
		comment.commenter = User.find(rand(1..User.count)).username  # Numero al azar
		comment.body = Faker::Lorem.sentence(5, true, 10)
		comment.post_id = post.id # Pasar por todos los post y darle un random de comentarios
		comment.created_at = time_rand post.created_at  # random date
		comment.save!
	end
end

puts "Comentarios 6 listos"


# Subscipciones

User.all.each do |user|
	numero_subs = rand(1..Forum.count)
	# numero_subs = 10
	# for i in range(numero_subs)

	# sub = Subscription.new
	# sub.user_id = user.id
	# sub.forum_id = 1
	# sub.save!

	(1..rand(1..Forum.count)).each do |i|  # ELIGE A CUALES FOROS LO SUBSCRIBE
		begin
			sub = Subscription.new
			sub.user_id = user.id
			forum =  Forum.find(i)
			sub.forum_id = forum.id
			# sub.created_at = random
			sub.created_at = time_rand [user.created_at, forum.created_at].max
			sub.save!
		rescue  # En caso de que ya exista la subscripcion creo
		end
	end
end


# Likes a posts

Post.all.each do |post|
	numero_likes = rand(1..MAXIMO_LIKES_POR_POST)
	(1..numero_likes).each do |like|
		begin
			post.upvote_from User.find(rand(1..User.count))
		rescue
			puts "Ya le hizo like"
		end
	end
	puts "likes post #{post.id} listos"
end

# dislikes a posts

Post.all.each do |post|
	numero_dislikes = rand(1..MAXIMO_DISLIKES_POR_POST)
	(1..numero_dislikes).each do |dislike|
		begin
			post.downvote_from User.find(rand(1..User.count))
		rescue
			puts "Ya le hizo dislike"
		end
	end
	puts "dislikes post #{post.id} listos"

end

# Favoritos
    # t.integer "user_id"
    # t.integer "post_id"
    # t.datetime "created_at", null: false

Post.all.each do |post|
	num_favoritos = rand(1..MAX_FAVORITOS)
	(1..num_favoritos).each do |i|
		begin
			fav = Favorite.new
			usuario = User.find(rand(1..User.count))
			fav.user_id = usuario.id
			fav.post_id = post.id
			fav.created_at = time_rand post.created_at
			fav.save!
		rescue
			# Usuarios ya le puso favorito
		end
	end  
	puts "Favoritos post #{post.id} listos"

end
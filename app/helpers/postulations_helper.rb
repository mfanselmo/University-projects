module PostulationsHelper

	def esta_postulando(usuario,forum)
		lista_postulaciones = []
		Postulation.all.each do |pos|
			lista_postulaciones << [pos.user_id, pos.forum_id]
		end
		lista_postulaciones.include? [usuario.id, forum.id]
	end
end

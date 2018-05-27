# frozen_string_literal: true

module PostulationsHelper
  def esta_postulando(usuario, forum)
    lista_postulaciones = []
    Postulation.all.each do |pos|
      lista_postulaciones << [pos.user_id, pos.forum_id]
    end
    if forum.is_a? Integer
    	lista_postulaciones.include? [usuario, forum]
    else
    	lista_postulaciones.include? [usuario.id, forum.id]
    end
  end
end

# frozen_string_literal: true

module PostsHelper
  def post_subscripciones_usuario(usuario)
    # Funcion que retorna los post de los foros de un usuario
  end

  def post_mas_recientes
    Post.order('created_at').all
  end
end

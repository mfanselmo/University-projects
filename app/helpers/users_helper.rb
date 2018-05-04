module UsersHelper
  def subscripciones(usuario)
    @lista  = []
    usuario.subscriptions.each do |sub|
    	@lista << sub.forum_id
    end
    @lista
  end

  def moderaciones(usuario)
    @lista  = []
    usuario.subscriptions.each do |sub|
    	@lista << sub.forum_id
    end
    @lista
  end
end
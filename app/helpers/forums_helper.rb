# frozen_string_literal: true

module ForumsHelper
  def subscriptores(forum)
    @lista  = []
    forum.subscriptions.each do |sub|
    	@lista << sub.user_id
    end
    @lista
  end


def moderadores(forum)
    @lista  = []
    forum.moderators.each do |sub|
    	@lista << sub.user_id
    end
    @lista
  end

end

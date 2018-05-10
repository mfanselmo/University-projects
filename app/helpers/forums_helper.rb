# frozen_string_literal: true

module ForumsHelper


	def points_user(forum, user)
		@total = 0
		forum.posts.each do |post|
			if post.name == user.username
				@total += 1 # post creado
				@total += post.points # puntos post
			end
		end
		@total
	end

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

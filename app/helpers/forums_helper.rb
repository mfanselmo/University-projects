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

  def activity(user, forum)
    # info = Hash["posts" => [], "comments" => []]
    # count = 0
    # forum.posts.each do |post|
    #   comm = []
    #   if post.name == user.username
    #     post.comments.each do |com|
    #       if com.commenter == user.username
    #         comm << com
    #       end
    #     info["posts"] << Hash["post" => post, "comment" => comm]
    #     end
    #   else
    #     post.comments.each do |com|
    #       if com.commenter == user.username
    #         info["comments"] << comm
    #       end
    #     end
    #   end
    #   count += 1
    # end
    # list = []
    info = Hash["posts" => [], "comments" => []]
    forum.posts.each do |post|
      if post.name == user.username
        # list << p.name
        cc = []
        post.comments.each do |comment|
          if comment.commenter == user.username
            # x = "c" + c.commenter
            cc << comment
          end
        end
        info["posts"] << Hash["post" => post, "comment" => cc]
      else
        post.comments.each do |comment|
          if comment.commenter == user.username
            # x = "cd" + c.commenter
            # list << x
            info["comments"] << comment
          end
        end
      end
    end
    info
  end

end

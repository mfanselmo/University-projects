# frozen_string_literal: true

module UsersHelper
  def vote_info(user)
    @info = Hash['post_likes' => 0, 'post_dislikes' => 0,
                 'comment_likes' => 0, 'comment_dislikes' => 0]
    Post.all.each do |post|
      next unless post.name == user.username
      @info['post_likes'] += post.get_likes.size
      @info['post_dislikes'] += post.get_dislikes.size
      post.comments.each do |comment|
        @info['comment_likes'] += comment.get_likes.size
        @info['comment_dislikes'] += comment.get_dislikes.size
      end
    end
    @info
  end

  def calculate_points(info)
    pl = info['post_likes']
    pd = info['post_dislikes']
    cl = info['comment_likes']
    cd = info['comment_dislikes']
    (pl - pd) * 2 + (cl - cd)
  end

  def subscripciones(usuario)
    @lista = []
    usuario.subscriptions.each do |sub|
      @lista << sub.forum_id
    end
    @lista
  end

  def posts_favoritos(user)
    # Retorna ids de posts favoritos
    @lista = []
    user.favorites.order(created_at: :desc).each do |fav|
      @lista << fav.post_id
    end
    @lista
  end

  def moderaciones(usuario)
    # Retorna los foros que el usuario modera
    @lista = []
    if usuario.admin?
      Forum.all.each do |forum|
        @lista << forum.id
      end
    else
      Moderator.all.each do |mod|
        @lista << mod.forum_id if mod.user_id == usuario.id
      end
    end
    @lista
  end
end

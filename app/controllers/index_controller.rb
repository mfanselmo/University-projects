# frozen_string_literal: true

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

class IndexController < ApplicationController
  protect_from_forgery with: :exception

  def index
    @currentUser = current_user.id
  end

  def postulation
    @forum = Forum.find(params[:forum_id])
    @user = User.find(params[:user_id])
  end

  def admin
    @users = User.all.paginate(page: params[:page], per_page: 10)
  end

  def stats
    @forums = Forum.all
    @forums = @forums.sort_by { |forum| forum.subscriptions.length }.reverse[0..9]

    @sub_count = []
    Forum.all.each do |form|
      # agrega los foros con su contador de la forma id, nombre, cant_subs
      @sub_count.push([form.name, form.subscriptions.size])
    end

    @user_points = []
    User.all.each do |user|
      # toma los puntajes de cada usuario
      @user_points.push([user.username, user.points()])
    end

    @users = User.all.sort_by(&:points).reverse[0..9]
    @posts = Post.all

    response = { forums: @forums, users: @users, posts: @posts,
                 sub_count: @sub_count, user_points: @user_points }
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: response }
    end
  end
end

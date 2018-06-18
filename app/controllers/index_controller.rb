# frozen_string_literal: true

class IndexController < ApplicationController
  protect_from_forgery with: :exception
  before_action :authenticate_user!, only: %i[stats]

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

    @users = User.all.sort_by(&:points).reverse[0..9]
    @posts = Post.all.sort_by(&:com_size).reverse[0..9]

    @user_points = []
    @users.each do |user|
      # toma los puntajes de cada usuario
      @user_points.push([user.username, user.points()])
    end

    response = { forums: @forums, users: @users, posts: @posts,
                 sub_count: @sub_count, user_points: @user_points }
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: response }
    end
  end
end

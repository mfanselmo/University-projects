# frozen_string_literal: true

class IndexController < ApplicationController

  protect_from_forgery with: :exception

  def hello
    render html: 'Hola a todos, esto no se ve'
  end

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
    @forums = @forums.paginate(page: params[:page], per_page: 10)
    @forums = @forums.sort_by {|forum| forum.subscriptions.length }.reverse
    @users = User.all
    @users = @users.paginate(page: params[:page], per_page: 10)
    @users = @users.sort_by {|user| user.points }.reverse
  end

end

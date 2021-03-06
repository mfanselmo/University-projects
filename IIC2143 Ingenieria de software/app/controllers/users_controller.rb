# frozen_string_literal: true

class UsersController < ApplicationController
  def index
    @users = User.all
    @users = if params[:search]
               User.search(params[:search]).order('created_at DESC')
             else
               User.all.order('created_at DESC')
             end
  end

  def show
    @user = User.find(params[:id])
  end

  def logged_in
    redirect_to root_path
  end

  def destroy
    @user = User.find(params[:id])

    Notification.all.each do |noti|
      noti.destroy if noti.user_id == @user.id
    end

    redirect_to root_url, notice: 'User deleted.' if @user.destroy
  end

  def unread
    notification = Notification.find(params[:notification_id])
    notification.unread = false
    result = notification.save
    render json: { result: result }
  end

  def del_notify
    notification = Notification.find(params[:notification_id])
    result = notification.destroy
    render json: { result: result }
  end

  def admin_create
    user = User.find(params[:user_id])
    user.admin = true
    result = user.save
    @pos = Postulation.find_by(user_id: params[:user_id], forum_id: 0)
    if @pos
      @pos.destroy
    end
    msg = 'Enhorabuena! Eres administrador!'
    subs = Subscription.new(user_id: user.id, forum_id: 3)
    subs.save!
    user.notify(user, user, msg)
    render json: { result: result }
  end
end

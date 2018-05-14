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

    if @user.destroy
        redirect_to root_url, notice: "User deleted."
    end
  end
end

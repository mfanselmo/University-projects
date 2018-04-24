# frozen_string_literal: true

class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end


  def change_user
  	return unless current_user.username != guest
    sign_in(:user, User.find(params[:id]))
    redirect_to root_url # or user_root_url
  end
end

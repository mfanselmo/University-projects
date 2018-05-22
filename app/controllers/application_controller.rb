# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  # rescue_from ActiveRecord::RecordNotFound, :with => :not_found

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys:
                                      %i[username email password
                                         password_confirmation admin])
    devise_parameter_sanitizer.permit(:sign_in, keys:
                                      %i[login password password_confirmation])
    devise_parameter_sanitizer.permit(:account_update, keys:
                                      %i[username email password
                                         password_confirmation
                                         current_password admin
                                         avatar remove_avatar avatar_cache])
  end

  def not_found
    redirect_to root_path, notice: "No se encontró la página"
  end
end

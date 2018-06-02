# frozen_string_literal: true

class Postulation < ApplicationRecord
  def notify(_creator, object, message)
    users = User.where(admin: true)
    users.each do |observer|
      Notification.create(recipient: observer, user: observer, action: message, notifiable: object)
    end
  end
end

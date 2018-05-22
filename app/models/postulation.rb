# frozen_string_literal: true

class Postulation < ApplicationRecord

  def notify(creator, object, message)
  	users = User.where(:admin => true)
    users.each do |observer|
      Notification.create(recipient: observer, user: creator, action: message, notifiable: object)
    end
  end

end

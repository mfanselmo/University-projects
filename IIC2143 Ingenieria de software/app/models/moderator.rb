# frozen_string_literal: true

class Moderator < ApplicationRecord
  belongs_to :user
  belongs_to :forum

  def notify(creator, object, message)
    Notification.create(recipient: creator, user: creator, action: message, notifiable: object)
  end
end

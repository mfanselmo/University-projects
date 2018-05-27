# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy

  has_many :subscriptions
  has_many :users, through: :subscriptions

  has_many :moderators
  has_many :users, through: :moderators

  validates :name, presence: true,
                   length: { minimum: 1 }

  def self.search(search)
    where('name LIKE ?', "%#{search}%")
    # where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

  def subscriptores
    count = 0
    self.subscriptions.each do |sub|
      count += 1
    end
    if count != 1
      return "#{count} subscriptores"
    else
      return "1 subscriptor"
    end
  end

  def notify(creator, object, message)
    self.subscriptions.each do |sub|
      observer = User.find(sub.user_id)
      if creator != observer
        Notification.create(recipient: observer, user: creator, action: message, notifiable: object)
      end
    end
  end

  def send_mail(user)
    Thread.new do
      Rails.application.executor.wrap do
        EmailMailer.with(user: user, forum: self).subscription_mail.deliver_now
      end
    end
  end

end

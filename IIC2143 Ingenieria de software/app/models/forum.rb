# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy

  has_many :subscriptions, dependent: :destroy
  has_many :users, through: :subscriptions

  has_many :moderators, dependent: :destroy
  has_many :users, through: :moderators

  validates :name, presence: true,
                   length: { minimum: 1 }
  validates :description, presence: true

  def self.search(search)
    where('name LIKE ?', "%#{search}%")
    # where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

  def subscriptores
    count = 0
    subscriptions.each do |_sub|
      count += 1
    end
    if count != 1
      return "#{count} subscriptores"
    else
      return '1 subscriptor'
    end
  end

  def notify(creator, object, message)
    subscriptions.each do |sub|
      observer = User.find(sub.user_id)
      Notification.create(recipient: observer, user: creator, action: message, notifiable: object) if creator != observer
    end
  end

  def send_mail(user)
    Thread.new do
      Rails.application.executor.wrap do
        EmailMailer.with(user: user, forum: self).subscription_mail.deliver_now
      end
    end
  end

  def self.cant_subs
    [Forum.subscriptions.size]
  end

end

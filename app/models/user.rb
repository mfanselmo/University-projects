# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include UsersHelper

  mount_uploader :avatar, AvatarUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, omniauth_providers: %i[facebook]

  has_many :comments
  has_many :posts

  has_many :subscriptions, dependent: :destroy
  has_many :forums, through: :subscriptions

  has_many :favorites, dependent: :destroy
  has_many :posts, through: :favorites

  has_many :moderators, dependent: :destroy
  has_many :forums, through: :moderators, source: :mod

  has_many :notifications, foreign_key: :recipient_id

  def user_params
    params.require(:user).permit(:user, :email, :avatar, :remove_avatar, :avatar_cache)
  end

  validates :username, presence: :true, uniqueness: { case_sensitive: false }

  def increment(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] += by
    save
  end

  def decrement(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] -= by
    save
  end

  acts_as_voter

  def self.search(search)
    where('username LIKE ?', "%#{search}%")
  end

  def role_type
    if admin?
      'Administrador'
    else
      'Usuario'
    end
  end

  def points
    calculate_points(vote_info(self))
  end

  def all_notifications
    notifications.order(created_at: :desc)
  end

  def unread_notifications
    notifications.where(unread: true)
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.username = auth.info.name # assuming the user model has a name
      user.avatar = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  def notify(creator, object, message)
    Notification.create(recipient: creator, user: creator, action: message, notifiable: object)
  end
end

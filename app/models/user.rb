# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  mount_uploader :avatar, AvatarUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :comments, dependent: :destroy
  has_many :posts, dependent: :destroy

  has_many :subscriptions
  has_many :forums, through: :subscriptions

  has_many :moderators
  has_many :forums, through: :moderators, :source => :mod

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
end

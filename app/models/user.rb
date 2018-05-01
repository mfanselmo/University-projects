# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable

  mount_uploader :image, ImageUploader

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :comments, dependent: :destroy
  has_many :posts, dependent: :destroy

  def user_params
    params.require(:user).permit(:user, :email, :image, :remove_image, :image_cache)
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

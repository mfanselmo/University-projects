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
  	where("name LIKE ?", "%#{search}%")
  	#where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

end

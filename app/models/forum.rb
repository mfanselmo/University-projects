# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy

  has_many :subcriptions
  has_many :users, through: :subcriptions

  def self.search(search)
  	where("name LIKE ?", "%#{search}%")
  	#where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

end

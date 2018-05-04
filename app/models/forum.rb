# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy

  has_many :subcriptions
  has_many :users, through: :subcriptions
end

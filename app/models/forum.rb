# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy

  has_many :subscriptions
  has_many :users, through: :subscriptions

  has_many :moderators
  has_many :users, through: :moderators
end

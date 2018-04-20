# frozen_string_literal: true

class Forum < ApplicationRecord
  has_many :posts, dependent: :destroy
end

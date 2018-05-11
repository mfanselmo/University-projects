# frozen_string_literal: true

class Moderator < ApplicationRecord
  belongs_to :user
  belongs_to :forum
end

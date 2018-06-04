class Attempt < ApplicationRecord
  has_one :user
  belongs_to :question
end

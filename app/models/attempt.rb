class Attempt < ApplicationRecord
  has_one :user
  belongs_to :question
  belongs_to :poll
end

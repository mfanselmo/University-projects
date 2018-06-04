class Question < ApplicationRecord
  has_many :attempts
  belongs_to :poll
end

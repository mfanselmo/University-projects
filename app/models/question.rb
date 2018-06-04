class Question < ApplicationRecord
  has_many :attempts
  belongs_to :poll
  validates_presence_of :content
end

class Question < ApplicationRecord
  has_many :attempts
  belongs_to :poll
  # validates :content, presence: true, allow_blank: false
end

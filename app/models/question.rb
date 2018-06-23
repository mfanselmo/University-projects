class Question < ApplicationRecord
  has_many :attempts, dependent: :destroy
  belongs_to :poll
  # validates :content, presence: true, allow_blank: false
end

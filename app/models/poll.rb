class Poll < ApplicationRecord
  has_many :questions, :dependent => :destroy, :inverse_of => :poll
  belongs_to :post, optional: true
  accepts_nested_attributes_for :questions, allow_destroy: true 
  has_many :attempts, through: :questions
end

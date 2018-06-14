class Poll < ApplicationRecord
  has_many :questions, :dependent => :destroy, :inverse_of => :poll
  belongs_to :post, optional: true
  accepts_nested_attributes_for :questions, allow_destroy: true 
  has_many :attempts, through: :questions

  def total_answers
  	count = 0
  	self.questions.each do |q|
  		count += q.attempts.size
  	end
  	count
  end
end

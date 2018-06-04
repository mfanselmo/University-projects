class Poll < ApplicationRecord
  has_many :questions, :dependent => :destroy, :inverse_of => :poll
  belongs_to :post, optional: true
end

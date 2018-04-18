class Post < ActiveRecord::Base
  belongs_to :forum

  validates :name,  :presence => true
  validates :title, :presence => true,
                    :length => { :minimum => 5 }

  has_many :comments, dependent: :destroy

  def increment(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] += by
    self.save
  end

  def decrement(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] -= by
    self.save
  end
  
end
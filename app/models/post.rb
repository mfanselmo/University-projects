# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :forum

  validates :name,  presence: true
  validates :title, presence: true,
                    length: { minimum: 5 }

  has_many :comments, dependent: :destroy

  def increment(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] += by
    save
  end

  def decrement(attribute, by = 1)
    self[attribute] ||= 0
    self[attribute] -= by
    save
  end

  def points
    return self.get_upvotes.size - self.get_downvotes.size
  end

  acts_as_votable
end

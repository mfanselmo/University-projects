# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post
  acts_as_votable

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
end

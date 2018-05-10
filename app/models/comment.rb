# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post
  acts_as_votable

  mount_uploader :image, ImageUploader

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

  def self.search(search)
    where("commenter LIKE ? OR body LIKE ?", "%#{search}%", "%#{search}%")
    # where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

  def points
    return self.get_upvotes.size - self.get_downvotes.size
  end
  
end

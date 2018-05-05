# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post

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
end

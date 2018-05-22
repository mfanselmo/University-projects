# frozen_string_literal: true

class Comment < ApplicationRecord
  belongs_to :post
  acts_as_votable

  validates :body, presence: true,
                   length: { minimum: 1 }

  mount_uploader :image, ImageUploader

  after_create :new_comment_send
  def new_comment_send
    EmailerMailer.new_comment_mail(post, self).deliver_now
  end

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
    where('commenter LIKE ? OR body LIKE ?', "%#{search}%", "%#{search}%")
    # where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

  def points
    get_upvotes.size - get_downvotes.size
  end
end

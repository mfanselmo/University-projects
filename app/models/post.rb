# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :forum

  mount_uploader :image, ImageUploader

  validates :name,  presence: true
  validates :title, presence: true,
                    length: { minimum: 1 }
  validates :content, presence: true,
                      length: { minimum: 1 }

  has_many :comments, dependent: :destroy


  after_create :new_post_send
  def new_post_send
    EmailerMailer.new_post_mail(forum, self).deliver_now
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

  def points
    get_upvotes.size - get_downvotes.size
  end

  acts_as_votable

  def self.search(search)
    # title es nombre del post
    # name es usuario creador
    where('title LIKE ? OR name LIKE ?', "%#{search}%", "%#{search}%")
    # where("name LIKE ? OR ingredients LIKE ? OR cooking_instructions LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
  end

  def notify(creator, object, message)
    observer = User.find_by(:username => self.name)
    if creator != observer
      Notification.create(recipient: observer, user: creator, action: message, notifiable: object)
    end
  end

end

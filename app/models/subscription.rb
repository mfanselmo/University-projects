# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :forum

  after_create :subscription_send
  def subscription_send
  	EmailerMailer.subscription_mail(user, forum).deliver_now
  end
end
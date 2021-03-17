# frozen_string_literal: true

class Subscription < ApplicationRecord
  belongs_to :user
  belongs_to :forum
  # Descomentar lo siguiente para despues de seeds
  after_create :subscription_send  
  def subscription_send
  	begin
      Thread.new do
        Rails.application.executor.wrap do
    	    EmailerMailer.subscription_mail(user, forum).deliver_now
        end
      end
  	rescue
  		puts 'Hubo un error'
  	end
  end
end

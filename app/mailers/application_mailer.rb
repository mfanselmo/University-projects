# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: 'grupo02software@gmail.com'
  layout 'mailer'

  def sample_email(user)
    @user = user
    mail(to: @user.email, subject: 'Sample Email')
  end
end

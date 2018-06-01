# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/emailer_mailer
class EmailerMailerPreview < ActionMailer::Preview
  def sample_mail_preview
    EmailerMailer.subscription_mail(User.first, Forum.first)
  end
end

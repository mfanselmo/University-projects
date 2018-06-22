# frozen_string_literal: true

class EmailerMailer < ApplicationMailer
  default from: 'grupo02software@gmail.com'

  def subscription_mail(user, forum)
    @user = user
    @forum = forum
    email_with_name = %("#{@user.username}" <#{@user.email}>)
    mail(to: email_with_name, subject: '¡Te has subscrito a un foro!')
  end

  def new_post_mail(forum, post)
    @forum = forum
    @post = post
    subscriptores_forum(@forum).each do |user|
      @user = User.find_by(id: user)
      email_with_name = %("#{@user.username}" <#{@user.email}>)
      mail(to: email_with_name, subject: 'Hay un nuevo post')
    end
  end

  def new_comment_mail(post, comment)
    @forum = post.forum
    @post = post
    @comment = comment
    subscriptores_forum(@forum).each do |user|
      @user = User.find_by(id: user)
      email_with_name = %("#{@user.username}" <#{@user.email}>)
      mail(to: email_with_name, subject: 'Hay un nuevo comentario en un post')
    end
  end


  def subscriptores_forum(forum)
    @lista = []
    if not forum.nil?
      forum.subscriptions.each do |sub|
        @lista << sub.user_id
      end
    end
    @lista
  end
end

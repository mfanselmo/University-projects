# frozen_string_literal: true

# :nodoc:
class CommentsController < ApplicationController
  # http_basic_authenticate_with :name => "dhh", :password => "secret", :only => :destroy
  include ActionView::Helpers::TextHelper
  before_action :find_post, only: %i[edit update]
  before_action :authenticate_user!, only: %i[create destroy edit]

  def index
    @comments = Comment.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
    # @comments = Comment.all
    @comments = if params[:search]
                  Comment.search(params[:search]).order('created_at DESC')
                else
                  Comment.all.order('created_at DESC')
                end
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(params[:comment].permit(:commenter, :body, :image, :remove_image))
    msg = current_user.username + ' creó un comentario en su post: ' + truncate(@post.title, lenght: 20)
    @post.notify(current_user, @comment, msg)
    redirect_to post_path(@post)
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    Notification.all.each do |noti|
      noti.destroy if noti.notifiable == @comment
    end
    @comment.destroy
    redirect_to post_path(@post)
  end

  def edit
    @comment = @post.comments.find(params[:id])
  end

  def update
    @comment = @post.comments.find(params[:id])
    @comment.update(comment_params)
    if @comment.save
      redirect_to @post
    else
      render 'edit'
    end
  end

  def upvote
    @comment = Comment.find(params[:id])
    result = @comment.upvote_from current_user if user_signed_in?
    if result
      @post = Post.find(@comment.post_id)
      msg = 'Has recibido un like en comentario del post: ' + @post.title
      @comment.notify(current_user, @comment, msg)
    end
    render json: { result: result, count: { votes:
                                          { like: @comment.get_likes.size,
                                            dislike: @comment.get_dislikes.size },
                                            points: @comment.points } }
  end

  def downvote
    @comment = Comment.find(params[:id])
    result = @comment.downvote_from current_user if user_signed_in?
    if result
      @post = Post.find(@comment.post_id)
      msg = 'Has recibido un dislike en comentario del post: ' + truncate(@post.title, lenght: 20)
      @comment.notify(current_user, @comment, msg)
    end
    render json: { result: result, count: { votes:
                                          { like: @comment.get_likes.size,
                                            dislike: @comment.get_dislikes.size },
                                            points: @comment.points } }
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :commenter, :post_id, :image, :remove_image)
  end

  def find_post
    @post = Post.find(params[:post_id])
  end
end

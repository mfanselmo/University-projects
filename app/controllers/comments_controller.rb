# frozen_string_literal: true

# :nodoc:
class CommentsController < ApplicationController
  # http_basic_authenticate_with :name => "dhh", :password => "secret", :only => :destroy

  before_action :find_post, only: [:edit]
  before_action :authenticate_user!, only: [:create, :destroy, :edit]


  def index
    @comments = Comment.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
    # @comments = Comment.all
    if params[:search]
      @comments = Comment.search(params[:search]).order("created_at DESC")
    else
      @comments = Comment.all.order("created_at DESC")
    end
  end

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.create(params[:comment].permit(:commenter, :body, :image, :remove_image))
    redirect_to post_path(@post)
  end

  def destroy
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.destroy
    redirect_to post_path(@post)
  end

  def edit
    @comment = @post.comments.find(params[:id])
  end

  def update
    @comment = @post.comments.find(params[:id])
    @comment.update_attributes(comment_params)
    if @comment.save
        redirect_to @post
    else
        render 'edit'
    end
  end

  def upvote
      @comment = Comment.find(params[:id])
      if user_signed_in?
        result = @comment.upvote_from current_user
      end
      render json: {result: result, count: { votes: 
                                            {like: @comment.get_likes.size, 
                                             dislike: @comment.get_dislikes.size}, 
                                             points: @comment.points}}
    end

  def downvote
      @comment = Comment.find(params[:id])
      if user_signed_in?
        result = @comment.downvote_from current_user
      end
      render json: {result: result, count: { votes: 
                                            {like: @comment.get_likes.size, 
                                             dislike: @comment.get_dislikes.size}, 
                                             points: @comment.points}}
    end

  private

  def comment_params
    params.require(:user).permit(:body, :commenter, :post_id, :image, :remove_image)
  end

  private

  def find_post
    @post = Post.find(params[:post_id])
  end


end

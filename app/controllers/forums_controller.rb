# frozen_string_literal: true

class ForumsController < ApplicationController
  before_action :set_forum, only: %i[show edit update destroy]

  # GET /forums
  # GET /forums.json
  def index
    @forums = Forum.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @forums }
    end
  end

  # GET /forums/1
  # GET /forums/1.json
  def show
    @forum = Forum.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @forum }
    end
  end

  # GET /forums/new
  def new
    @forum = Forum.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @forum }
    end
  end

  # GET /forums/1/edit
  def edit; end

  # POST /forums
  # POST /forums.json
  def create
    @forum = Forum.new(forum_params)

    respond_to do |format|
      if @forum.save
        format.html do
          redirect_to(@forum,
                      notice: 'Forum was successfully created.')
        end
        format.json do
          render json: @forum,
                 status: :created, location: @forum
        end
      else
        format.html  { render action: 'new' }
        format.json  do
          render json: @forum.errors,
                 status: :unprocessable_entity
        end
      end
    end
  end

  # PATCH/PUT /forums/1
  # PATCH/PUT /forums/1.json
  def update
    respond_to do |format|
      if @forum.update(forum_params)
        format.html { redirect_to @forum, notice: 'Forum was successfully updated.' }
        format.json { render :show, status: :ok, location: @forum }
      else
        format.html { render :edit }
        format.json { render json: @forum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /forums/1
  # DELETE /forums/1.json
  def destroy
    @forum.destroy
    respond_to do |format|
      format.html { redirect_to forums_url, notice: 'Forum was successfully destroyed.'}
      format.json { head :no_content }
    end
  end

def upvote
    @post = Post.find(params[:id])
    if current_user.username != "guest"
      result = @post.upvote_from current_user
    end
    # respond_to do |format|
      # format.html {redirect_to :back}
      #format.js.erb
    # end
    render json: {result: result, count: {like: @post.get_likes.size, dislike: @post.get_dislikes.size}}
  end

def downvote
    @post = Post.find(params[:id])
    if current_user.username != "guest"
      result = @post.downvote_from current_user
    end
    # respond_to do |format|,
      # format.html {redirect_to :back}
      #format.js.erb
    # end
    render json: {result: result, count: {like: @post.get_likes.size, dislike: @post.get_dislikes.size}}
  end

  def downvote2
    @post = Post.find(params[:id])
    if current_user.username != "guest"
      @post.downvote_from current_user
    end
    # if request.xhr?
      # head :ok
      # render status: 200, json: { count: @post.get_likes.size, id: @post.id }
    # else
      # redirect_to(:controller => "forums", :action => "show", :id => @post.forum_id)
    #
    respond_to do |format|
      # format.html {redirect_to :back}
      format.js.erb
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_forum
    @forum = Forum.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def forum_params
    params.require(:forum).permit(:name, :forum, :post)
  end
end

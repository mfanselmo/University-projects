# frozen_string_literal: true

class PostsController < ApplicationController
  # http_basic_authenticate_with :name => "dhh", :password => "secret", :except => [:index, :show]

  before_action :set_post, only: %i[show edit update destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show; end

  # GET /posts/new
  # def new
  #   @post = Post.new
  #   respond_to do |format|
  #     format.html  # new.html.erb
  #     format.json  { render :json => @post }
  #   end
  # end

  # GET /posts/1/edit
  def edit; end

  # POST /posts
  # POST /posts.json
  def create
    @forum = Forum.find(params[:forum_id])
    @post = @forum.posts.create(params[:post].permit(:name, :title, :content))
    redirect_to forum_path(@forum)
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Se actualizo exitosamente el post!' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to forums_url, notice: 'Se borro exitosamente el post' }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def post_params
    params.require(:post).permit(:content, :name, :title, :forum_id)
  end
end

# frozen_string_literal: true

class PostsController < ApplicationController
  # http_basic_authenticate_with :name => "dhh", :password => "secret", :except => [:index, :show]

  before_action :set_post, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[create destroy edit]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    @posts = if params[:search]
               Post.search(params[:search]).order('created_at DESC')
             else
               Post.all.order('created_at DESC')
             end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json

  def show
    @post = Post.find(params[:id])
    @user = User.find_by(username: @post.name)
    @poll = @post.polls.first || nil
    if @poll
      @attempt = Attempt.new
    end
    # votable = true
  end

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
    @post = @forum.posts.create(params[:post].permit(:name, :title, :content, :image, :remove_image))
    # data = params["post"]["polls"]
    # data["questions"].delete_if {|key, value| value == {"content"=>""} }
    # questions_data = data["questions"].permit!
    # new_data = data.delete_if {|key, value| key == "questions" }
    # new_data["questions_attributes"] = {"0" => questions_data.to_h}
    # puts new_data
    # @poll = Poll.new(new_data)
    # puts data
    msg = current_user.username + ' creó un post en foro suscrito: ' + @forum.name
    @forum.notify(current_user, @post, msg)
    # EmailMailer.with(forum: @forum, post: @post).new_post_mail.deliver_now
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
    @forum = Forum.find(@post.forum_id)
    @post.destroy
    respond_to do |format|
      format.html { redirect_to @forum, notice: 'Se borro exitosamente el post' }
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
    params.require(:post).permit(:content, :name, :title, :forum_id, :image, :remove_image)
    params.require(:poll).permit(:title, :post_id, questions_attributes: [:id, :poll_id, :content, :_destroy])
      # {polls_attributes: [:title, :post_id, questions_attributes: [:id, :poll_id, :content, :_destroy]]})
  end
end

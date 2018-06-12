class PollsController < ApplicationController
  before_action :set_poll, only: [:show, :edit, :update, :destroy]

  # GET /polls
  # GET /polls.json
  def index
    @polls = Poll.all
  end

  # GET /polls/1
  # GET /polls/1.json
  def show
    @attempt = Attempt.new
  end

  # GET /polls/new
  def new
    @poll = Poll.new(post_id: params[:post_id])
    @poll.questions.build
  end

  # GET /polls/1/edit
  def edit
  end

  # POST /polls
  # POST /polls.json
  def create
    data = poll_params
    puts data
    data["questions_attributes"].delete_if {|key, value| value["content"] == ""}
    puts data
    @poll = Poll.new(data)

    if @poll.save
      # @questions = @poll.questions.create
      redirect_to Post.find(@poll.post_id), votable: true
    else
      render 'new'
    end
  end

  # PATCH/PUT /polls/1
  # PATCH/PUT /polls/1.json
  def update
    # respond_to do |format|
    data = poll_params
    data["questions_attributes"].delete_if {|key, value| value["content"] == ""}
      if @poll.update_attributes!(data)
        # format.html { redirect_to @poll, notice: 'Poll was successfully updated.' }
        # format.json { render :show, status: :ok, location: @poll }
        redirect_to Post.find(@poll.post_id), notice: 'El poll se ha actualizado correctamente.'
      else
        # format.html { render :edit }
        # format.json { render json: @poll.errors, status: :unprocessable_entity }
        render 'edit'
      end
    # end
  end

  # DELETE /polls/1
  # DELETE /polls/1.json
  def destroy
    id = @poll.post_id
    @poll.destroy
    respond_to do |format|
      format.html { redirect_to Post.find(@poll.post_id), notice: 'Se ha eliminado el poll de este post.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_poll
      @poll = Poll.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def poll_params
      params.require(:poll).permit(:title, :post_id, questions_attributes: [:id, :poll_id, :content, :_destroy])
    end
end

class ModeratorsController < ApplicationController
  before_action :set_moderator, only: [:show, :edit, :update, :destroy]

  # GET /moderators
  # GET /moderators.json
  def index
    @moderators = Moderator.all
  end

  # GET /moderators/1


  # GET /moderators/new
  def new
    @moderator = Moderator.new
  end



  # POST /moderators
  # POST /moderators.json
  def create
    @moderator = Moderator.new(:user_id => params[:user_id], :forum_id => params[:forum_id])
    result = @moderator.save!

    @pos = Postulation.find_by(:user_id => params[:user_id], :forum_id => params[:forum_id])
    @pos.destroy

    render json: {result: result}

  end



  # PATCH/PUT /moderators/1
  # PATCH/PUT /moderators/1.json
  def update
    respond_to do |format|
      if @moderator.update(moderator_params)
        format.html { redirect_to @moderator, notice: 'Moderator was successfully updated.' }
        format.json { render :show, status: :ok, location: @moderator }
      else
        format.html { render :edit }
        format.json { render json: @moderator.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /moderators/1
  # DELETE /moderators/1.json
  def destroy
    result = @moderator.destroy
    render json: {result: result}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_moderator
      @moderator = Moderator.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def moderator_params
      params.permit(:user_id, :forum_id)
    end
end

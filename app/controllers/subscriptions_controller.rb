class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: [:show, :edit, :update, :destroy]

  # GET /subscriptions
  # GET /subscriptions.json
  def index
    @subscriptions = Subscription.all
  end

  # GET /subscriptions/1
  # GET /subscriptions/1.json
  def show
  end

  # GET /subscriptions/new
  def new
    @subscription = Subscription.new
  end

  # GET /subscriptions/1/edit
  def edit
  end

  # POST /subscriptions
  # POST /subscriptions.json
  def create
    id = params[:forum_id]
    @forum = Forum.find_by_id(id)
    @subscription = Subscription.new(:user_id => params[:user_id], :forum_id => params[:forum_id])
    result = @subscription.save!
    render json: {result: result, info: {id: @subscription.id}} #, count: ForumsHelper.subscriptores(@forum).length}}
  end

  # PATCH/PUT /subscriptions/1
  # PATCH/PUT /subscriptions/1.json
  def update
    respond_to do |format|
      if @subscription.update(subscription_params)
        format.html { redirect_to @subscription, notice: 'Subscription was successfully updated.' }
        format.json { render :show, status: :ok, location: @subscription }
      else
        format.html { render :edit }
        format.json { render json: @subscription.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /subscriptions/1
  # DELETE /subscriptions/1.json
  def destroy
    forum_id = @subscription.forum_id
    result = @subscription.destroy
    @forum = Forum.find_by_id(forum_id)
    render json: {result: result, info: {forum_id: forum_id}} #, count: ForumsHelper.subscriptores(@forum).length}}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subscription
      @subscription = Subscription.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def subscription_params
      params.permit(:user_id, :forum_id)
    end
end

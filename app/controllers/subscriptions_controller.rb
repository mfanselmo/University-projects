# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  before_action :set_subscription, only: %i[show edit update destroy]

  # GET /subscriptions
  # GET /subscriptions.json
  def index
    @subscriptions = Subscription.all
  end

  # GET /subscriptions/1
  # GET /subscriptions/1.json
  def show; end

  # GET /subscriptions/new
  def new
    @subscription = Subscription.new
  end

  # GET /subscriptions/1/edit
  def edit; end

  # POST /subscriptions
  # POST /subscriptions.json
  def create
    @forum = Forum.find_by(id: params[:forum_id])
    @subscription = Subscription.new(user_id: params[:user_id], forum_id: params[:forum_id])
    result = @subscription.save!
    number = @forum.subscriptores # helpers.subscriptores(@forum).length
    @user = User.find_by(id: params[:user_id])
    EmailMailer.with(user: @user, forum: @forum).subscription_mail.deliver_now
    render json: { result: result, info: { id: @subscription.id, count: number}}
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
    @forum = Forum.find_by(id: forum_id)
    number = @forum.subscriptores
    render json: { result: result, info: { forum_id: forum_id , count: number}}
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

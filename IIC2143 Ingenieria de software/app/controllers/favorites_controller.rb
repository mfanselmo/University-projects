# frozen_string_literal: true

class FavoritesController < ApplicationController
  before_action :set_favorite, only: %i[show edit update destroy]
  before_action :authenticate_user!, only: %i[index]

  # GET /favorites
  # GET /favorites.json
  def index
    @favorites = Favorite.all
  end

  # GET /favorites/1
  # GET /favorites/1.json
  def show; end

  # GET /favorites/new
  def new
    @favorite = Favorite.new
  end

  # GET /favorites/1/edit
  def edit; end

  # POST /favorites
  # POST /favorites.json
  # favorite_params
  def create
    @favorite = Favorite.new(user_id: params[:user_id], post_id: params[:post_id])
    result = @favorite.save!
    render json: { result: result, info: @favorite.id }
  end

  # PATCH/PUT /favorites/1
  # PATCH/PUT /favorites/1.json
  def update
    respond_to do |format|
      if @favorite.update(favorite_params)
        format.html { redirect_to @favorite, notice: 'Favorite was successfully updated.' }
        format.json { render :show, status: :ok, location: @favorite }
      else
        format.html { render :edit }
        format.json { render json: @favorite.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /favorites/1
  # DELETE /favorites/1.json
  def destroy
    result = @favorite.destroy
    # respond_to do |format|
    # format.html { redirect_to favorites_url, notice: 'Favorite was successfully destroyed.' }
    # format.json { head :no_content }
    # end
    render json: { result: result }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_favorite
    @favorite = Favorite.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def favorite_params
    params.permit(:user_id, :post_id)
  end
end

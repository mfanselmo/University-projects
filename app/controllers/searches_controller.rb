class SearchesController < ApplicationController
  before_action :set_search, only: [:show, :edit, :update, :destroy]

  require 'uri'

  # GET /searches
  # GET /searches.json
  def index
    @searches = Search.all

    if params[:search].include? 'user:'
      redirect_to(controller: 'users', action: 'index',
                  search: params[:search][6..-1])

    elsif params[:search].include? 'users:'
      redirect_to(controller: 'users', action: 'index',
                  search: params[:search][7..-1])

    elsif params[:search].include? 'forum:'
      redirect_to(controller: 'forums', action: 'index',
                  search: params[:search][7..-1])

    elsif params[:search].include? 'forums:'
      redirect_to(controller: 'forums', action: 'index',
                  search: params[:search][8..-1])

    elsif params[:search].include? 'comment:'
      redirect_to(controller: 'comments', action: 'index',
                  search: params[:search][9..-1])

    elsif params[:search].include? 'comments:'
      redirect_to(controller: 'comments', action: 'index',
                  search: params[:search][10..-1])

    elsif params[:search].include? 'post:'
      redirect_to(controller: 'posts', action: 'index',
                  search: params[:search][6..-1])

    elsif params[:search].include? 'posts:'
      redirect_to(controller: 'posts', action: 'index',
                  search: params[:search][7..-1])
    end
  end

  # GET /searches/1
  # GET /searches/1.json
  def show
  end

  # GET /searches/new
  def new
    @search = Search.new
  end

  # GET /searches/1/edit
  def edit
  end

  # POST /searches
  # POST /searches.json
  def create
    @search = Search.new(search_params)

    respond_to do |format|
      if @search.save
        format.html { redirect_to @search, notice: 'Search was successfully created.' }
        format.json { render :show, status: :created, location: @search }
      else
        format.html { render :new }
        format.json { render json: @search.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /searches/1
  # PATCH/PUT /searches/1.json
  def update
    respond_to do |format|
      if @search.update(search_params)
        format.html { redirect_to @search, notice: 'Search was successfully updated.' }
        format.json { render :show, status: :ok, location: @search }
      else
        format.html { render :edit }
        format.json { render json: @search.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /searches/1
  # DELETE /searches/1.json
  def destroy
    @search.destroy
    respond_to do |format|
      format.html { redirect_to searches_url, notice: 'Search was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_search
      @search = Search.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def search_params
      params.fetch(:search, {})
    end
end

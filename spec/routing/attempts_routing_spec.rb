require "rails_helper"

RSpec.describe AttemptsController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/attempts").to route_to("attempts#index")
    end

    it "routes to #new" do
      expect(:get => "/attempts/new").to route_to("attempts#new")
    end

    it "routes to #show" do
      expect(:get => "/attempts/1").to route_to("attempts#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/attempts/1/edit").to route_to("attempts#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/attempts").to route_to("attempts#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/attempts/1").to route_to("attempts#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/attempts/1").to route_to("attempts#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/attempts/1").to route_to("attempts#destroy", :id => "1")
    end

  end
end

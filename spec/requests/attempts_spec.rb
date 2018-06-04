require 'rails_helper'

RSpec.describe "Attempts", type: :request do
  describe "GET /attempts" do
    it "works! (now write some real specs)" do
      get attempts_path
      expect(response).to have_http_status(200)
    end
  end
end

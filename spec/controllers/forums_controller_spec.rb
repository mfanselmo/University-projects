require 'rails_helper'

RSpec.describe ForumsController, type: :controller do

	describe "GET /forums" do
		it "render the forums/show template" do
			get :index
			expect(response.status).to eq(200)
		end
	end

end

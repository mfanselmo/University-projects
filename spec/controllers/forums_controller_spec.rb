require 'rails_helper'

RSpec.describe ForumsController, type: :controller do

	describe "GET /forums/:id" do
		it "render the forums/show template" do
			get :show, params: {id: 1}
			expect(response.status).to eq(200)
		end
	end

end

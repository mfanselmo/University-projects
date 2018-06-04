require 'rails_helper'

RSpec.describe "polls/index", type: :view do
  before(:each) do
    assign(:polls, [
      Poll.create!(
        :title => "Title",
        :post_id => 2
      ),
      Poll.create!(
        :title => "Title",
        :post_id => 2
      )
    ])
  end

  it "renders a list of polls" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end

require 'rails_helper'

RSpec.describe "attempts/index", type: :view do
  before(:each) do
    assign(:attempts, [
      Attempt.create!(
        :user_id => 2,
        :question_id => 3,
        :poll_id => 4
      ),
      Attempt.create!(
        :user_id => 2,
        :question_id => 3,
        :poll_id => 4
      )
    ])
  end

  it "renders a list of attempts" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => 4.to_s, :count => 2
  end
end

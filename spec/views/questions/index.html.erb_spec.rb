require 'rails_helper'

RSpec.describe "questions/index", type: :view do
  before(:each) do
    assign(:questions, [
      Question.create!(
        :poll_id => 2,
        :content => "Content"
      ),
      Question.create!(
        :poll_id => 2,
        :content => "Content"
      )
    ])
  end

  it "renders a list of questions" do
    render
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => "Content".to_s, :count => 2
  end
end

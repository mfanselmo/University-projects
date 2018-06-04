require 'rails_helper'

RSpec.describe "attempts/new", type: :view do
  before(:each) do
    assign(:attempt, Attempt.new(
      :user_id => 1,
      :question_id => 1,
      :poll_id => 1
    ))
  end

  it "renders new attempt form" do
    render

    assert_select "form[action=?][method=?]", attempts_path, "post" do

      assert_select "input[name=?]", "attempt[user_id]"

      assert_select "input[name=?]", "attempt[question_id]"

      assert_select "input[name=?]", "attempt[poll_id]"
    end
  end
end

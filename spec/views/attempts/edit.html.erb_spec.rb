require 'rails_helper'

RSpec.describe "attempts/edit", type: :view do
  before(:each) do
    @attempt = assign(:attempt, Attempt.create!(
      :user_id => 1,
      :question_id => 1,
      :poll_id => 1
    ))
  end

  it "renders the edit attempt form" do
    render

    assert_select "form[action=?][method=?]", attempt_path(@attempt), "post" do

      assert_select "input[name=?]", "attempt[user_id]"

      assert_select "input[name=?]", "attempt[question_id]"

      assert_select "input[name=?]", "attempt[poll_id]"
    end
  end
end

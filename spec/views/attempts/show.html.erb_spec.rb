require 'rails_helper'

RSpec.describe "attempts/show", type: :view do
  before(:each) do
    @attempt = assign(:attempt, Attempt.create!(
      :user_id => 2,
      :question_id => 3,
      :poll_id => 4
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2/)
    expect(rendered).to match(/3/)
    expect(rendered).to match(/4/)
  end
end

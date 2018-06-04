require 'rails_helper'

RSpec.describe "polls/show", type: :view do
  before(:each) do
    @poll = assign(:poll, Poll.create!(
      :title => "Title",
      :post_id => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Title/)
    expect(rendered).to match(/2/)
  end
end

require 'rails_helper'

RSpec.describe Post, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it {is_expected.to have_many(:comments).dependent(:destroy)}
  it {is_expected.to validate_presence_of(:name)}
  it {is_expected.to validate_presence_of(:title)}
  it {is_expected.to validate_uniqueness_of(:title).ignoring_case_sensitivity}
  it {is_expected.to validate_presence_of(:content)}
  it {is_expected.to belong_to(:forum)}
end

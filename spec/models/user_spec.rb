require 'rails_helper'

RSpec.describe User, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it {is_expected.to have_many(:subscriptions).dependent(:destroy)}
  it {is_expected.to validate_presence_of(:username)}
  it {is_expected.to validate_uniqueness_of(:username).ignoring_case_sensitivity}

end

require 'rails_helper'

RSpec.describe Attempt, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:question) }
end

require 'rails_helper'

RSpec.describe Moderator, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it { is_expected.to belong_to(:forum) }
  it { is_expected.to belong_to(:user) }
end

require 'rails_helper'

RSpec.describe Postulation, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:forum) }
end

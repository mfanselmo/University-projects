require 'rails_helper'

RSpec.describe Poll, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it { is_expected.to have_many(:questions).dependent(:destroy) }
  it { is_expected.to have_many(:attempts).through(:questions) }
  it { is_expected.to belong_to(:post) }
end

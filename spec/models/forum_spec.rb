require 'rails_helper'

RSpec.describe Forum, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"

  it { is_expected.to have_many(:posts).dependent(:destroy) }
  it { is_expected.to have_many(:subscriptions).dependent(:destroy) }
  it { is_expected.to have_many(:moderators).dependent(:destroy) }
  it { is_expected.to have_many(:users).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:description) }
  it { is_expected.to belong_to(:forum) }
end

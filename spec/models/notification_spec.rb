# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Notification, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  
  it { is_expected.to belong_to(:user) }
end

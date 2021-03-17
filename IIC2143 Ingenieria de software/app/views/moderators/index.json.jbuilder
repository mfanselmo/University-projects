# frozen_string_literal: true

json.array! @moderators, partial: 'moderators/moderator', as: :moderator

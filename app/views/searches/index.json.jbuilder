# frozen_string_literal: true

json.array! @searches, partial: 'searches/search', as: :search

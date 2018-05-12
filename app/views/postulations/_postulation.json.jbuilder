# frozen_string_literal: true

json.extract! postulation, :id, :user_id, :forum_id, :created_at, :updated_at
json.url postulation_url(postulation, format: :json)

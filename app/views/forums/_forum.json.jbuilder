# frozen_string_literal: true

json.extract! forum, :id, :name, :created_at, :updated_at
json.url forum_url(forum, format: :json)

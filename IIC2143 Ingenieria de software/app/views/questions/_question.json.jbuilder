json.extract! question, :id, :poll_id, :content, :created_at, :updated_at
json.url question_url(question, format: :json)

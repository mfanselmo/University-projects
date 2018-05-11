# frozen_string_literal: true

module CommentsHelper
  def get_comment
    @comment ||= @post.comments.build
    @comment
  end
end

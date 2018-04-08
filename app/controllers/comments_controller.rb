class CommentsController < ApplicationController

	def create
	    @post = Post.find(params[:post_id])
	    @comment = @post.comments.create(params[:comment].permit(:commenter, :body))
	redirect_to post_path(@post)
	end

  private
  def comment_params
    params.require(:user).permit(:body, :commenter, :post_id)
  end
end

module PollsHelper
  def get_poll
    @poll ||= Poll.new(post_id: params[:post_id])
    @poll.questions.build
    @poll
  end
end

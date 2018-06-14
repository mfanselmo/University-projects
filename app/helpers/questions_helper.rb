module QuestionsHelper
  def get_question
    @question ||= @poll.questions.build
    @question
  end
end

# frozen_string_literal: true

module MarkDownHelper
  def markdown(text)
    options = {
      filter_html:          true,
      hard_wrap:            true,
      link_attributes: { rel: 'nofollow', target: '_blank' },
      space_after_headers:  true,
      fenced_code_blocks:   true,
      no_styles:            true
    }

    extensions = {
      autolink:                     true,
      superscript:                  true,
      tables:                       true,
      strikethrough:                true,
      footnotes:                    true,
      fenced_code_blocks:           true,
      disable_indented_code_blocks: false
    }

    renderer = Redcarpet::Render::HTML.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end
end

# frozen_string_literal: true

module MarkDownHelper
  def markdown(text)
    options = {
      filter_html:     true,
      hard_wrap:       true,
      link_attributes: { rel: 'nofollow', target: '_blank' },
      space_after_headers: true,
      fenced_code_blocks: true,
      no_styles: true
    }

    extensions = {
      autolink:           true,
      superscript:        true,
      disable_indented_code_blocks: true
    }

    renderer = CustomRender.new(options)
    markdown = Redcarpet::Markdown.new(renderer, extensions)

    markdown.render(text).html_safe
  end

  class CustomRender < Redcarpet::Render::HTML
    def image(link, title, alt_text)
      if link =~ /^(.+?)\s*=+(\d+)(?:px|)$/
        # e.g. ![alt](url.png =100px)
        # e.g. ![alt](url.png =100)
        %(<img src="#{$1}" style="max-width: 700px" alt="#{alt_text}">)
      elsif link =~ /^(.+?)\s*=+(\d+)(?:px|)x(\d+)(?:px|)$/
        # e.g. ![alt](url.png =30x50)
        %(<img src="#{$1}" style="max-width: 700px; max-height: #{$3}px;" alt="#{alt_text}">)
      else
        %(<img src="#{link}" title="#{title}" alt="#{alt_text}" style="max-width: 700px;">)
      end
    end
  end
end

# frozen_string_literal: true

require "rouge"

module Jekyll
  # {% highlight_file assets/commentsys.sty latex %}
  #
  # Shows a file from the site with syntax colors, like {% highlight %}, but
  # reads it straight from disk so the file only exists in one place. Liquid
  # never sees the contents, so `{%` and `{{` in the file are safe.
  class HighlightFileTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @path, @lang = markup.split
      return if @path && @lang

      raise SyntaxError, "Usage: {% highlight_file path/from/site/root language %}"
    end

    def render(context)
      site = context.registers[:site]
      # in_source_dir keeps the path inside the site folder
      file = site.in_source_dir(@path)
      raise IOError, "highlight_file: #{@path} not found" unless File.file?(file)

      code = File.read(file, :encoding => "UTF-8").strip
      lexer = Rouge::Lexer.find_fancy(@lang, code) || Rouge::Lexers::PlainText
      html = Rouge::Formatters::HTML.new.format(lexer.lex(code))

      # Same markup as {% highlight %}, so the copy buttons and styles apply
      %(<figure class="highlight"><pre><code class="language-#{@lang}" data-lang="#{@lang}">) +
        %(#{html.chomp}</code></pre></figure>)
    end
  end
end

Liquid::Template.register_tag("highlight_file", Jekyll::HighlightFileTag)

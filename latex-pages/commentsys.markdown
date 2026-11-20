---
layout: page
title: LaTeX Comment System
permalink: /latex/commentsys/
---

This is the package I use to leave comments in papers. Simple and effective.

<p class="cta"><a class="cta-button" href="{{ "/assets/commentsys.sty" | relative_url }}" download>Download commentsys.sty</a></p>

Register each commenter in the preamble with a command name, an optional full name, initials, a color and an optional default style:

{% highlight latex %}
\usepackage{commentsys}
\registercommenter{adr}[Adrian]{AE}{teal}
\registercommenter{rev}[Reviewer 2]{R2}{red}
{% endhighlight %}

Each commenter gets five commands, here `\badr`, `\sadr`, `\iadr`, `\madr` and `\adr`.
They all take an optional subtitle and the comment text:

{% highlight latex %}
\badr[Introduction]{Should we cite the 2024 survey here?}% block
\sadr[Results]{This section needs a baseline.}%            section
The gain is 3~dB\iadr[Gain]{check this number}.%          inline
\madr{Rephrase?}%                                          margin
\adr{Uses the default style, block unless changed.}%       default
{% endhighlight %}

A block comment is a colored box. A section comment has no box, only a tinted heading between two thin rules, so it breaks across pages like ordinary text.

[![A paragraph of blindtext with an inline comment with a subtitle, a margin note, a numbered block comment from Adrian and a numbered section comment from Reviewer 2]({{ '/assets/commentsys-images/1-comments.webp' | relative_url }})]({{ '/assets/commentsys-images/1-comments.webp' | relative_url }})

## Default style

`\adr` is a copy of one of the four styles, block by default.
Pick another with the optional last argument of `\registercommenter`, or change it later in the preamble with `\setdefaultcomment`:

{% highlight latex %}
\registercommenter{sv}[Supervisor]{SV}{blue}[s]% \sv is a section comment
\setdefaultcomment{adr}{m}%                      \adr is now a margin comment
{% endhighlight %}

The style is one of `b` (block), `s` (section), `i` (inline) or `m` (margin).
Since all four take the same arguments, switching the default never breaks existing comments: write `\adr` everywhere and decide later how the comments should look.

## Long comments

For long comments, or comments containing verbatim, use the `bcomment` (block) and `scomment` (section) environments with the commenter name:

{% highlight latex %}
\begin{scomment}{rev}[Method]
  The derivation in \verb|eq:gain| skips a step.
\end{scomment}
{% endhighlight %}

## Numbering and hiding

Block and section comments are numbered (AE.1, AE.2, …) and can be referenced with `\label` and `\cref`.
Put the `\label` right after the command, or inside the environment.

To hide every comment for the final version, load the package with `\usepackage[disable]{commentsys}`, or switch it with `\disablecommentsys` and `\enablecommentsys`.
The same document then compiles without a trace of the comments:

[![The same paragraphs with every comment removed]({{ '/assets/commentsys-images/2-disabled.webp' | relative_url }})]({{ '/assets/commentsys-images/2-disabled.webp' | relative_url }})

The screenshots come from [this example document]({{ '/assets/commentsys-images/example.tex' | relative_url }}).

Requires a LaTeX kernel from 2021-06-01 or later.
Released under the MIT license, so use it, change it and share it as you like.

<details>
<summary>The complete code</summary>

{% highlight_file assets/commentsys.sty latex %}
</details>

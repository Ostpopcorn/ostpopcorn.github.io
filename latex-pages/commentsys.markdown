---
layout: page
title: LaTeX Comment System
permalink: /latex/commentsys/
---

This is the package I use to leave comments in papers. Simple and effective.

<p class="cta"><a class="cta-button" href="{{ "/assets/commentsys.sty" | relative_url }}" download>Download commentsys.sty</a></p>

Register each commenter in the preamble with a command name, an optional full name, initials and a color:

{% highlight latex %}
\usepackage{commentsys}
\registercommenter{adr}[Adrian]{AE}{teal}
\registercommenter{rev}[Reviewer 2]{R2}{red}
{% endhighlight %}

Each commenter gets three commands, here `\adr`, `\iadr` and `\madr`:

{% highlight latex %}
\adr[Introduction]{Should we cite the 2024 survey here?}% block
The gain is 3~dB\iadr{check this number}.%              inline
\madr{Rephrase?}%                                       margin
{% endhighlight %}

[![A paragraph of blindtext with an inline comment, a margin note, and two numbered block comments from Adrian and Reviewer 2]({{ '/assets/commentsys-images/1-comments.webp' | relative_url }})]({{ '/assets/commentsys-images/1-comments.webp' | relative_url }})

Block comments are numbered (AE.1, AE.2, …) and can be referenced with `\label` and `\cref`.
To hide every comment for the final version, load the package with `\usepackage[disable]{commentsys}`, or switch it with `\disablecommentsys` and `\enablecommentsys`.
The same document then compiles without a trace of the comments:

[![The same paragraphs with every comment removed]({{ '/assets/commentsys-images/2-disabled.webp' | relative_url }})]({{ '/assets/commentsys-images/2-disabled.webp' | relative_url }})

The screenshots come from [this example document]({{ '/assets/commentsys-images/example.tex' | relative_url }}).

Requires a LaTeX kernel from 2020-10-01 or later.

<details>
<summary>The complete code</summary>

{% highlight_file assets/commentsys.sty latex %}
</details>

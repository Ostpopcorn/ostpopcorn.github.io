---
layout: page
title: IEEEtran Preamble
permalink: /latex/ieeetran-preamble/
copy_all_latex: true
---

The things I put in the preamble to make IEEEtran nicer to work with.

## Biblatex

Biblatex with the `ieee` style from `biblatex-ieee`, compiled with biber.
DOI, ISBN and URL are dropped to keep the reference list short, and `natbib=true` keeps `\citet` and `\citep` working.

{% highlight latex %}
\usepackage[style=american]{csquotes}
\usepackage[style=ieee,doi=false,isbn=false,url=false,natbib=true]{biblatex}
\addbibresource{ref.bib}
\renewcommand*{\bibfont}{\footnotesize}
{% endhighlight %}

Print the references with `\printbibliography` at the end of the document.

## Subcaption

The caption package does not support IEEEtran and replaces its caption style.
The workaround from [Michael Shell's IEEEtran page](https://www.michaelshell.org/tex/ieeetran/#:%7E:text=subcaption) saves IEEEtran's `\@makecaption` before loading `subcaption` and puts it back afterwards, so the main captions keep the IEEE look.
The caption package still warns about an unknown document class, which is expected.

{% highlight latex %}
\makeatletter\let\MYcaption\@makecaption\makeatother
\usepackage[font=footnotesize,labelformat=simple]{subcaption}
\makeatletter\let\@makecaption\MYcaption\makeatother
\renewcommand\thesubfigure{(\alph{subfigure})}
{% endhighlight %}

With `\thesubfigure` set to `(a)`, the subfigures are labeled (a), (b), … and referenced as Fig. 1(a).
`labelformat=simple` stops subcaption from adding a second pair of parentheses.

## Cleveref

Load `cleveref` last, after `hyperref`.
`noabbrev` writes out Equation and Section, but IEEE abbreviates figures as Fig. in running text, so figures get their own names.

{% highlight latex %}
\usepackage[noabbrev,capitalise]{cleveref}
\crefname{figure}{Fig.}{Figs.}
\Crefname{figure}{Figure}{Figures}
{% endhighlight %}

Some parts of the [math macros]({{ '/latex/math-macros/' | relative_url }}) must be defined after `cleveref` is loaded.

`\cref{fig:a,fig:b}` gives Figs. 1 and 2, and `\Cref{fig:a}` at the start of a sentence gives Figure 1.
Sections come out as Section I and Section I-A.

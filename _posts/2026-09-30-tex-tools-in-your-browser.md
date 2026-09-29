---
layout: post
title:  "TeX Tools in your browser"
date:   2026-09-30 15:00:00 +0200
---

When you upload a paper to arXiv, you upload its LaTeX source, and anyone can download it. Mine usually contains:
- A header saying which draft it is,
- Notes to my co-authors and review comments, and 
- Whole paragraphs that I commented out.

So before uploading, everyone should remove the comments to prevent leakage of (possibly sensitive) information. At first, I cleaned them manually. Later, I found a set of regex search-and-replace string to do it much much quicker. And now, I made a web-based tool for it.

## What is TeX Tools?
TeX Tools is a small collection of tools for LaTeX files that runs in your browser, like [BibTeX Tools]({% post_url 2026-09-28-bibtex-tools-in-your-browser %}). For now it does one thing: it removes comments without changing the typeset document.

## Removing comments
The tool follows my regex workflow, in four steps that you can turn on and off:

| Step | Replace | with |
|------|---------|------|
| 1. Empty comments | `(?<!\\)%.*` | `%` |
| 2. Remove comment lines | `\n *% *\n` | `\n` |
| 3. Remove extra blank lines | `\n *\n *\n` | `\n\n` |
| 4. Remove `%` after spaces | `[ \t]+%.*$` | nothing |

These fours steps are not perfect, but did the job most of the time. 

**You must always be careful when removing `%`, since they are used to supress spaces and line breaks. **


## TeX Tools in your browser
Like BibTeX Tools, the app runs Python via [Pyodide](https://pyodide.org), so **your files never leave your browser**. It shows the original next to the result: removed lines are red, and the removed end of a changed line is struck through.

The best part: drop the .zip of your whole project, e.g., the source download from Overleaf, and download it again with the comments removed from every .tex file. Figures, the .bib file, and the folders stay exactly as they are, ready for arXiv.

<p class="cta"><a class="cta-button" href="https://ostpopcorn.github.io/tex-tools/">Open TeX Tools in your browser →</a></p>

### Example

<details markdown="1">
<summary><code>main.tex</code> before</summary>

```latex
% !TEX program = pdflatex
% main.tex -- draft 7, do not share!
\documentclass{article}
\newcommand{\R}{\mathbb{R}}% the real numbers

\begin{document}
\section{Introduction}
% Reviewer 2 asked for more motivation.
% TODO: cite Knuth here.
Comments are useful while writing, % but not in the final version
but they end up in the source that you upload.
About 20\% of this file are comments.
\[
  x \in \R^2 % should this be \R^n?
  % \norm{x}_1 = |x_1| + |x_2|
\]
\end{document}
```

</details>

After (7 comments removed, 17 → 13 lines):

```latex
% !TEX program = pdflatex
\documentclass{article}
\newcommand{\R}{\mathbb{R}}%

\begin{document}
\section{Introduction}
Comments are useful while writing,
but they end up in the source that you upload.
About 20\% of this file are comments.
\[
  x \in \R^2
\]
\end{document}
```

[![TeX Tools with main.tex: the original on the left with the removed comments marked, and the result on the right]({{ '/assets/tex-tools-images/1-example.webp' | relative_url }})]({{ '/assets/tex-tools-images/1-example.webp' | relative_url }})

### Example with zip

[![paper.zip open in TeX Tools: sections/results.tex is picked in the list of files above the original, and Download .zip saves the whole project]({{ '/assets/tex-tools-images/2-zip.webp' | relative_url }})]({{ '/assets/tex-tools-images/2-zip.webp' | relative_url }})

## Source code
The source code is on GitHub in [Ostpopcorn/tex-tools](https://github.com/Ostpopcorn/tex-tools), licensed under [GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.html). Bug reports and ideas for the next tool are welcome in the issue tracker.
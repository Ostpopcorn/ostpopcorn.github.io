#---
layout: page
title: LaTeX Tikz Macros
permalink: /latex/math-macros/
#---

\usepackage{graphicx}       % For \rotatebox in the shrug macro
## Minor relevance, but fun

\def\shrug{\texttt{\raisebox{0.75em}{\char`\_}\char`\\\char`\_\kern-0.5ex(\kern-0.25ex\raisebox{0.25ex}{\rotatebox{45}{\raisebox{-.75ex}"\kern-1.5ex\rotatebox{-90})}}\kern-0.5ex)\kern-0.5ex\char`\_/\raisebox{0.75em}{\char`\_}}}
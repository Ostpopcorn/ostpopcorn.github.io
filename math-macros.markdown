---
layout: page
title: LaTeX Math Macros
permalink: /latex/math-macros/
---

## Required Packages

To use these macros, add the following to your LaTeX preamble:

{% highlight latex %}
\usepackage{amsmath}        % Basic math environments and operators
\usepackage{amssymb}        % Mathematical symbols including \mathbb
\usepackage{mathtools}      % Enhanced math tools, includes PairedDelimiter
\usepackage{bm}             % Bold math symbols
\usepackage{xparse}         % NewDocumentCommand (included in modern LaTeX)
\usepackage{etoolbox}       % Programming tools (\ifstrempty, etc.)
{% endhighlight %}

**Note:** The special vectors section uses `\subscriptifnonempty` and `\mathbbx` which may need to be defined separately or come from additional packages like `bbm` or `dsfont`.

## Custom Delimiters

I tend to write my own LaTeX macros to make writing reports easier.

Since my discovery of `PariedDelimiter` from the `mathtools` package, I have tried to follow its style.



The core of my commands are the wrapper functions that uses `PairedDelimiter`s.
For my parenthesis I want a `\given` command that should spawn a vertical bar matching the surrounding parentesis.

First, we define the vertical bar symbol using `\SetSymbol` and `\given`. Then we define the main wrapper command `\gullwingsparenthesis`. This implementation is a bit overkill, but it allows for linebreaks in the argument when using the non-starred version.

<details open>
<summary>Gullwings parenthesis</summary>

{% highlight latex %}
\NewDocumentCommand\SetSymbol{o}{% raw %}{%{% endraw %}
    \nonscript\:#1\vert\allowbreak\nonscript\:\mathopen{}%
}
\NewDocumentCommand\given{}{\SetSymbol[]}
\makeatletter
\NewDocumentCommand\gullwingsparenthesis{sD{<}{>}{\BooleanFalse}O{}m}{% raw %}{%{% endraw %}
    % If either * or the <\BooleanTrue> is set we do the starred version.
    \IfBooleanTF{#1}% Check if star is set
    {\gullwingsparenthesis@star*{#4}}% Star
        {\IfBooleanTF{#2}% Check is star is passed using <...>
            {\gullwingsparenthesis@star*{#4}}% Star
        {\RenewDocumentCommand\given{}{\SetSymbol[#3]}%
            \gullwingsparenthesis@nostar[#3]{#4}}% Nostar
    }%
}
\DeclarePairedDelimiter\gullwingsparenthesis@nostar{\{}{\}}
\DeclarePairedDelimiterX\gullwingsparenthesis@star[1]{\{}{\}}
    {\RenewDocumentCommand\given{}{\SetSymbol[\delimsize]}#1}
\makeatother
{% endhighlight %}
</details>

<details>
<summary>Soft parenthesis</summary>

{% highlight latex %}
\NewDocumentCommand\softparenthesis{sD{<}{>}{\BooleanFalse}O{}m}{% raw %}{%{% endraw %}
    % If either * or the <\BooleanTrue> is set we do the starred version.
    \IfBooleanTF{#1}% Check if star is set
    {\softparenthesis@star*{#4}}% Star
    {\IfBooleanTF{#2}% Check is star is passed using <...>
        {\softparenthesis@star*{#4}}% Star
        {\RenewDocumentCommand\given{}{\SetSymbol[#3]}%
            \softparenthesis@nostar[#3]{#4}}% Nostar
    }%
}
\DeclarePairedDelimiter\softparenthesis@nostar{(}{)}
\DeclarePairedDelimiterX\softparenthesis@star[1]{(}{)}
{\RenewDocumentCommand\given{}{\SetSymbol[\delimsize]}#1}

{% endhighlight %}
</details>

<details>
<summary>Square parenthesis</summary>

{% highlight latex %}
\NewDocumentCommand\squareparenthesis{sD{<}{>}{\BooleanFalse}O{}m}{% raw %}{%{% endraw %}
    % If either * or the <\BooleanTrue> is set we do the starred version.
    \IfBooleanTF{#1}% Check if star is set
    {\squareparenthesis@star*{#4}}% Star
    {\IfBooleanTF{#2}% Check is star is passed using <...>
        {\squareparenthesis@star*{#4}}% Star
        {\RenewDocumentCommand\given{}{\SetSymbol[#3]}%
            \squareparenthesis@nostar[#3]{#4}}% Nostar
    }%
}
\DeclarePairedDelimiter\squareparenthesis@nostar{[}{]}
\DeclarePairedDelimiterX\squareparenthesis@star[1]{[}{]}
{\RenewDocumentCommand\given{}{\SetSymbol[\delimsize]}#1}

{% endhighlight %}
</details>

<div style="background-color: #fff8dc; border-left: 4px solid #ffd700; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
    <span style="font-size: 1.2em;">💡</span>
    <strong>We can now easily define operators!</strong>
  </div>
</div>

## Basic Paired Delimiters

Using `PairedDelimiter` from `mathtools`, we can define common mathematical delimiters that automatically scale.

{% highlight latex %}
\NewDocumentCommand\set{O{}m}{\gullwingsparenthesis[#1]{#2}}

\DeclarePairedDelimiter\abs{\vert}{\vert}
\DeclarePairedDelimiter{\norm}{\lVert}{\rVert}

\DeclarePairedDelimiterX\scalarprod[2]{\langle}{\rangle}{#1,\mathopen{}#2}

\DeclarePairedDelimiter\ceil{\lceil}{\rceil}
\DeclarePairedDelimiter\floor{\lfloor}{\rfloor}
{% endhighlight %}

## Numbers

### Domains

Standard mathematical domains using blackboard bold.

{% highlight latex %}
\newcommand{\reals}{\mathbb{R}}
\newcommand{\complexes}{\mathbb{C}}
\newcommand{\rationals}{\mathbb{Q}}
\newcommand{\naturals}{\mathbb{N}}
\newcommand{\integers}{\mathbb{Z}}
{% endhighlight %}

### Complex Numbers

Operators for complex number notation.

{% highlight latex %}
\DeclareMathOperator{\I}{\mathsf{j}}
\let\Re\relax
\DeclareMathOperator{\Re}{Re}
\let\Im\relax
\DeclareMathOperator{\Im}{Im}
{% endhighlight %}

## Optimization

Operators for optimization problems and argmin/argmax notation.

{% highlight latex %}
\DeclareMathOperator*{\argmin}{\arg\!\min}
\DeclareMathOperator*{\argmax}{\arg\!\max}

\newcommand{\maximize}{\mathop{\rm maximize}\limits}
\newcommand{\minimize}{\mathop{\rm minimize}\limits}

\newcommand{\minX}[1]{\ensuremath{\min\set{#1}}}
\newcommand{\maxX}[1]{\ensuremath{\max\set{#1}}}
{% endhighlight %}

## Probability
Basic expectation
{% highlight latex %}
\NewDocumentCommand\E{o}{\mathbb{E}\IfValueT{#1}{_{#1}}}
\NewDocumentCommand\EX{soO{}m}{\E[#2]\mathopen{}\gullwingsparenthesis<#1>[#3]{#4}}
{% endhighlight %}
Variance and covariance
{% highlight latex %}
\NewDocumentCommand\Var{o}{\text{Var}\IfValueT{#1}{_{#1}}}
\NewDocumentCommand\VarX{soO{}m}{\Var[#2]\mathopen{}\gullwingsparenthesis<#1>[#3]{#4}}
\NewDocumentCommand\Cov{o}{\text{Cov}\IfValueT{#1}{_{#1}}}
\NewDocumentCommand\CovX{soO{}m}{\Cov[#2]\mathopen{}\gullwingsparenthesis<#1>[#3]{#4}}
{% endhighlight %}

Probability distributions
{% highlight latex %}{% raw %}
\newcommand{\N}[2]{{\mathcal{N}\left( #1,#2 \right)}}
\newcommand{\CN}[2]{{\mathcal{CN}\left( #1,#2 \right)}}

\newcommand{\rayleigh}[1]{{\text{Rayleigh}\left( #1 \right)}}
\newcommand{\expdistribution}[1]{{\text{Exp}\left( #1 \right)}}
\newcommand{\bernoulli}[1]{{\text{Bernoulli}\left( #1 \right)}}
{% endraw %}{% endhighlight %}

## Linear Algebra

Vector and matrix notation
{% highlight latex %}{% raw %}
\newcommand{\matr}[1]{{\mathbf{#1}}}
\newcommand{\vect}[1]{{\bm{#1}}}

\newcommand{\transpose}{^{\mkern-1.5mu\mathsf{T}}}
\newcommand{\hermitian}{^{\mathsf{H}}}
{% endraw %}{% endhighlight %}

Special vectors
{% highlight latex %}
\newcommand{\onevec}[1]{\mathbf{1}\subscriptifnonempty{#1}}
\newcommand{\zerovec}[1]{\mathbf{0}\subscriptifnonempty{#1}}
\newcommand{\indicator}[1]{\mathbbx{1}\subscriptifnonempty{#1}}
{% endhighlight %}

Matrix operations
{% highlight latex %}
\NewDocumentCommand\hadamard{\odot}
\NewDocumentCommand\kronecker{\otimes}
{% endhighlight %}

## Caligraphic Letters
I also tend to use caligraphic letters as operators

{% highlight latex %}
\NewDocumentCommand\caligraphiccommand{D{<}{>}{\BooleanFalse}mom}{\ensuremath{#2\mathopen{}\softparenthesis<#1>[#3]{\ifstrempty{#4}{\cdot}{#4}}}}%
{% endhighlight %}
please note that this requires `etoolbox`.

Now it is simple to define:
{% highlight latex %}
\newcommand{\cC}{\mathcal{C}}
\NewDocumentCommand\cCX{sO{}m}{\caligraphiccommand<#1>{\cC}[#2]{#3}}
{% endhighlight %}

# Tikz Macros
Comming "soon"...



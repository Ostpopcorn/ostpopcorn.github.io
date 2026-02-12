---
layout: page
title: LaTeX Macros
permalink: /latex-macros/
---

I tend to write my own LaTeX macros to make writing reports easier.

# Mathmatical Macros

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
## Linear Algebra

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




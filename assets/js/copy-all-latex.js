// Add a "Copy All" button for all LaTeX code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Find all LaTeX code blocks (highlighted code blocks)
  const latexBlocks = document.querySelectorAll('.highlight');

  // Only show the button if there are multiple code blocks
  if (latexBlocks.length < 2) {
    return;
  }

  // Create the "Copy All" button
  const copyAllButton = document.createElement('button');
  copyAllButton.className = 'copy-all-button';
  copyAllButton.textContent = 'Copy All LaTeX';
  copyAllButton.setAttribute('aria-label', 'Copy all LaTeX code blocks to clipboard');

  // Add click handler
  copyAllButton.addEventListener('click', function() {
    // Collect all code block contents
    const allCode = Array.from(latexBlocks).map(function(block) {
      const code = block.querySelector('pre code') || block.querySelector('pre');
      return code.textContent.trim();
    }).join('\n\n');

    // Copy to clipboard
    navigator.clipboard.writeText(allCode).then(function() {
      // Show success state
      const originalText = copyAllButton.textContent;
      copyAllButton.textContent = 'Copied!';
      copyAllButton.classList.add('copied');

      // Reset after 2 seconds
      setTimeout(function() {
        copyAllButton.textContent = originalText;
        copyAllButton.classList.remove('copied');
      }, 2000);
    }).catch(function(err) {
      console.error('Failed to copy all LaTeX:', err);
      const originalText = copyAllButton.textContent;
      copyAllButton.textContent = 'Error';
      setTimeout(function() {
        copyAllButton.textContent = originalText;
      }, 2000);
    });
  });

  // Add button to page
  document.body.appendChild(copyAllButton);
});

// Add copy buttons to all code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('.highlight');

  codeBlocks.forEach(function(codeBlock) {
    // Create copy button
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');

    // Add click handler
    button.addEventListener('click', function() {
      // Get the code content
      const code = codeBlock.querySelector('pre code') || codeBlock.querySelector('pre');
      const text = code.textContent;

      // Copy to clipboard
      navigator.clipboard.writeText(text).then(function() {
        // Show success state
        button.textContent = 'Copied';
        button.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        button.textContent = 'Error';
        setTimeout(function() {
          button.textContent = 'Copy';
        }, 2000);
      });
    });

    // Add button to code block
    codeBlock.appendChild(button);
  });
});

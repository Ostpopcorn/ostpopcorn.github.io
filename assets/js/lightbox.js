// Open linked images in posts in a zoomable lightbox with arrows between them
import PhotoSwipeLightbox from 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe-lightbox.esm.min.js';

// Mark links that wrap an image, i.e. [![alt](url)](url) in markdown
document.querySelectorAll('.post-content a').forEach(function(link) {
  if (link.children.length === 1 && link.firstElementChild.tagName === 'IMG') {
    link.classList.add('lightbox-link');
  }
});

const lightbox = new PhotoSwipeLightbox({
  gallery: '.post-content',
  children: 'a.lightbox-link',
  pswpModule: () => import('https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/photoswipe.esm.min.js')
});

// PhotoSwipe needs the image size up front. The thumbnail is the full image,
// so read its natural size instead of writing it into every post.
lightbox.addFilter('domItemData', function(itemData, element, linkEl) {
  const img = linkEl.querySelector('img');
  itemData.src = linkEl.href;
  itemData.msrc = img.currentSrc;
  itemData.alt = img.alt;
  // Fall back to the window size if the image has not loaded yet
  itemData.w = img.naturalWidth || window.innerWidth;
  itemData.h = img.naturalHeight || window.innerHeight;
  return itemData;
});

lightbox.init();

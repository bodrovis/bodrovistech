function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  var body = document.body;
  var galleryDialog = null;
  var galleryContent = null;

  function ensureGalleryDialog() {
    if (galleryDialog) return;

    galleryDialog = document.createElement('div');
    galleryDialog.className = 'dialog js-image-dialog';
    galleryDialog.setAttribute('role', 'dialog');
    galleryDialog.setAttribute('aria-modal', 'true');

    galleryDialog.innerHTML =
      '<a href="#" class="js-close-gallery close-dialog" aria-label="Close gallery">&times;</a>' +
      '<div class="dialog-content"></div>';

    galleryContent = galleryDialog.querySelector('.dialog-content');

    body.appendChild(galleryDialog);
  }

  function closeGallery() {
    if (!galleryDialog || galleryDialog.style.display === 'none') {
      return;
    }

    galleryDialog.style.display = 'none';
    body.style.overflow = '';
  }

  function openGallery(href, preview, caption) {
    ensureGalleryDialog();

    galleryContent.innerHTML = '';

    var img = document.createElement('img');
    img.alt = caption;

    if (preview) {
      img.src = preview;
    }

    var loader = document.createElement('div');
    loader.className = 'gallery-loader';
    loader.setAttribute('role', 'status');
    loader.textContent = 'Loading full image…';

    var p = null;

    if (caption) {
      p = document.createElement('p');
      p.textContent = caption;
    }

    galleryContent.appendChild(img);
    galleryContent.appendChild(loader);

    if (p) {
      galleryContent.appendChild(p);
    }

    var fullImage = new Image();

    fullImage.addEventListener('load', function () {
      img.src = href;
      loader.remove();
    });

    fullImage.addEventListener('error', function () {
      loader.textContent = 'Could not load full image.';
    });

    fullImage.src = href;

    galleryDialog.style.display = 'flex';
    body.style.overflow = 'hidden';
  }

  document.addEventListener('click', function (e) {
    var target = e.target.closest('.js-show-gallery');

    if (!target) {
      return;
    }

    e.preventDefault();

    var href = target.getAttribute('href');
    var preview = target.dataset.preview || '';
    var caption = target.dataset.caption || '';

    openGallery(href, preview, caption);
  }, false);

  document.addEventListener('click', function (e) {
    if (!galleryDialog || galleryDialog.style.display === 'none') {
      return;
    }

    if (e.target.closest('.js-close-gallery')) {
      e.preventDefault();
      closeGallery();
      return;
    }

    if (e.target === galleryDialog) {
      closeGallery();
    }
  }, false);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeGallery();
    }
  });

  document.addEventListener('click', function (e) {
    var target = e.target.closest('.js-show-source');

    if (!target) {
      return;
    }

    e.preventDefault();

    var citation = target.closest('.source-citation');

    if (!citation) {
      return;
    }

    var content = citation.querySelector('.source-content');

    if (!content) {
      return;
    }

    var isOpen = !content.hidden;

    var openedSources = document.querySelectorAll(
      '.source-content:not([hidden])'
    );

    openedSources.forEach(function (source) {
      source.hidden = true;

      var parent = source.closest('.source-citation');

      if (parent) {
        var link = parent.querySelector('.js-show-source');

        if (link) {
          link.setAttribute('aria-expanded', 'false');
        }
      }
    });

    if (!isOpen) {
      content.hidden = false;
      target.setAttribute('aria-expanded', 'true');
    }
  }, false);
});
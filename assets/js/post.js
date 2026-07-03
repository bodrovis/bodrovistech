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

  document.addEventListener('click', function (e) {
    var target = e.target;

    for (; target && target !== this; target = target.parentNode) {
      if (target.matches('.js-show-gallery')) {
        e.preventDefault();

        ensureGalleryDialog();

        var href = target.getAttribute('href');
        var caption = target.dataset.caption || '';

        galleryContent.innerHTML = '';

        var img = document.createElement('img');
        img.src = href;
        img.alt = caption;

        var p = document.createElement('p');
        p.textContent = caption;

        galleryContent.appendChild(img);
        galleryContent.appendChild(p);

        galleryDialog.style.display = 'block';

        break;
      }
    }
  }, false);

  document.addEventListener('click', function (e) {
    var target = e.target;

    for (; target && target !== this; target = target.parentNode) {
      if (target.matches('.js-close-gallery')) {
        e.preventDefault();

        if (galleryDialog) {
          galleryDialog.style.display = 'none';
        }

        break;
      }
    }
  }, false);
});
function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  document.addEventListener('click', function(e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('.js-show-gallery')) {
        e.preventDefault();

        if(!document.querySelector('.js-image-dialog .dialog-content')) {
          document.querySelector(
            'body'
          ).innerHTML += '<div class="dialog"><a class="js-close-gallery close-dialog">&times;</a><div class="dialog-content"></div></div>'
        }

        document.querySelector(
          '.dialog .dialog-content'
        ).innerHTML = `<img src='${target.href}'><p>${target.dataset.caption}</p>`
    
        document.querySelector('.dialog').style.display = 'block'

        break;
      }
    }
  }, false);

  document.addEventListener('click', function(e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      if (target.matches('.js-close-gallery')) {
        e.preventDefault();

        target.parentNode.style.display = 'none'

        break;
      }
    }
  }, false);
});
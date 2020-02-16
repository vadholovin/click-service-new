
/**
 * #Accordion
 */
(function ($) {
  var $ = window.$;
  var duration = 300;

  $.fn.accordionShow = function () {
    var
      block = this,
      content = block.find('.js-accordion-content'),
      siblings = block.siblings('.js-accordion.is-active');
  
    content.slideDown(duration);
    block.addClass('is-active');
    siblings.removeClass('is-active');
    siblings.find('.js-accordion-content').slideUp(duration);
  };
  
  // Close accordion content
  $.fn.accordionHide = function () {
    var
      block = this,
      content = block.find('.js-accordion-content');
  
    content.slideUp(duration);
    block.removeClass('is-active');
  };
  
  // Accordion button's actions
  $(document).on('click', '.js-accordion-button', function (e) {
    if (e.target.tagName === 'a') {
      e.preventDefault();
    }

    var
      block = $(this).parents('.js-accordion'),
      isActive = block.hasClass('is-active');

    isActive ? block.accordionHide() : block.accordionShow();
  });
})(jQuery);


/**
 * #Sliders
 */
(function ($) {
  $('.js-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    mobileFirst: true,
    dots: true,
    arrows: false,
    lazyLoad: 'ondemand',
  });

  // Slider inside an accordion
  $('.js-inner-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    mobileFirst: true,
    dots: true,
    arrows: false,
    lazyLoad: 'ondemand',
  });

  $('.js-accordion-button').click(function (e) {
    var
      block = $(this).parents('.js-accordion'),
      slider = block.find('.js-inner-slider');

    setTimeout(function () {
      slider.slick('setPosition');
    }, 200);
  });

})(jQuery);


/**
 * AOS init
 */
(function () {
  AOS.init({
    animatedClassName: 'aos-animate', // class applied on animation
  
    offset: 60, // offset (in px) from the original trigger point
    delay: 50, // values from 0 to 3000, with step 50ms
    duration: 400, // values from 0 to 3000, with step 50ms
    easing: 'ease-in-out', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
  
  });
})();


/**
 * #Smooth scroll to anchor
 */
(function(){
  var scroll = new SmoothScroll('a[href*="#"]', {
    offset: 50,
    speed: 500,
    speedAsDuration: true,
    easing: 'Linear',
  });
})();


/**
 * #Inputmask
 */
(function () {
  function inputmask() {
    Inputmask({
      mask: '+7 (999) 999-99-99',
    }).mask('.js-tel');
  
    Inputmask({
      alias: 'email',
    }).mask('.js-email');
  }

  inputmask();
})();


/**
 * Forms
 */
(function ($) {
  $.validator.addMethod( "lettersonly", function( value, element ) {
    return this.optional( element ) || /^[а-яА-ЯёЁa-zA-Z -]+$/i.test( value );
  }, "Letters only please" );
  
  $('.js-form').submit(function (e) {
    e.preventDefault();
    var
      form = $(this),
      modalBox = $('#modal-success'),
      modalTextElement = modalBox.find('.modal-text'),
      modalText = {
        'success': 'Менеджер скоро свяжется с Вами',
        'fail': 'Ошибка отправки, попробуйте позже'
      };

    var validator = form.validate({
      rules: {
        'feedback-name': {
          required: true,
          minlength: 3,
          maxlength: 30,
          lettersonly: true,
        },
        'feedback-phone': {
          required: true,
        },
      },
      messages: {
        'feedback-name': {
          required: 'Обязательное поле',
          minlength: jQuery.validator.format('Слишком короткое имя'),
          maxlength: jQuery.validator.format('Слишком длинное имя'),
          lettersonly: jQuery.validator.format('Допускается только текст'),
        },
        'feedback-phone': {
          required: 'Обязательное поле',
        },
      },
    });

    if(form.valid()) {
      $.ajax({
        url : 'post.php',
        type: 'POST',
        data: $(this).serialize(),
      }).done(function(res) {
        answer(res);
      });
    }

    function answer(res) {
      if (res === 'done') {
        modalTextElement.text(modalText['success']);
        modalBox.modal();
        form.trigger('reset');
      }
      if (res === 'error') {
        modalTextElement.text(modalText['fail']);
        modalBox.modal();
      }
    }
  });

})(jQuery);


/**
 * #Modal
 */
(function ($) {
  $.modal.defaults.showClose = false;

  $('.js-modal-close').click(function (e) { 
    e.preventDefault();
    $.modal.close();
  });

  $('.js-modal').on($.modal.OPEN, function () {
    $('body').addClass('is-modal-open');
  });

  $('.js-modal').on($.modal.AFTER_CLOSE, function () {
    $('body').removeClass('is-modal-open');
  });
})(jQuery);


(function ($) {
  // $('.tooltip').tooltipster({
  //   theme: 'tooltipster-shadow'
  // });
})(jQuery);

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
    e.preventDefault();

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
    speed: 1000,
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

  $('[data-mail-subject]').click(function () { 
    var subject = $(this).data('mail-subject');
    $('#feedback-subject').val(subject);
  });

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


/**
 * #Timer
 */
(function ($) {

  var countdown = function(endDate) {
    var days, hours, minutes, seconds,
        daysPercent, hoursPercent, minutesPercent, secondsPercent;
    var 
        // daysBlock = document.getElementById('days'),
        hoursBlock = document.getElementById('hours'),
        minutesBlock = document.getElementById('minutes'),
        secondsBlock = document.getElementById('seconds'),
    
    endDate = new Date(endDate).getTime();
    
    if (isNaN(endDate)) {
    return;
    }
    
    setInterval(calculate, 1000);
    
    function calculate() {
      var startDate = new Date().getTime();
      
      var timeRemaining = parseInt((endDate - startDate) / 1000);
      
      if (timeRemaining >= 0) {
        days = parseInt(timeRemaining / 86400);
        daysPercent = Math.floor(100 / days);
        timeRemaining = (timeRemaining % 86400);
        
        hours = parseInt(timeRemaining / 3600) + days * 24;
        hoursPercent = Math.floor(100 * hours / 24);
        timeRemaining = (timeRemaining % 3600);
        
        minutes = parseInt(timeRemaining / 60);
        minutesPercent = Math.floor(100 * minutes / 60);
        timeRemaining = (timeRemaining % 60);
        
        seconds = parseInt(timeRemaining);
        secondsPercent = Math.floor(100 * seconds / 60);

        // daysBlock.parentElement.setAttribute('data-percent', daysPercent);
        hoursBlock.parentElement.setAttribute('data-percent', hoursPercent);
        minutesBlock.parentElement.setAttribute('data-percent', minutesPercent);
        secondsBlock.parentElement.setAttribute('data-percent', secondsPercent);
        
        // daysBlock.textContent = parseInt(days, 10);
        hoursBlock.textContent = hours < 10 ? "0" + hours : hours;
        minutesBlock.textContent = minutes < 10 ? "0" + minutes : minutes;
        secondsBlock.textContent = seconds < 10 ? "0" + seconds : seconds;
      } else {
        return;
      }
    }
  };


  var drawProgress = function(targets) {
    var elements = document.querySelectorAll(targets);

    Array.prototype.forEach.call(elements, function(el, i){
      let options = {
        percent: el.getAttribute('data-percent') || 100,
        size: el.getAttribute('data-size') || 74,
        lineWidth: el.getAttribute('data-line') || 5,
        rotate: el.getAttribute('data-rotate') || 0
      };

      if (window.innerWidth >= 980) {
        options.size = 100;
      }
    
      var canvas = document.createElement('canvas');
      // var span = document.createElement('span');
      // span.textContent = options.percent + '%';
    
      if (typeof G_vmlCanvasManager !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
      }
    
      var ctx = canvas.getContext('2d');
      canvas.width = canvas.height = options.size;
    
      // el.appendChild(span);
      el.appendChild(canvas);
    
      ctx.translate(options.size / 2, options.size / 2); // change center
      ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg
    
      //imd = ctx.getImageData(0, 0, 240, 240);
      var radius = (options.size - options.lineWidth) / 2;
    
      var drawCircle = function (color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
        ctx.lineCap = 'square'; // butt, round or square
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      };

      drawCircle('#ffc100', options.lineWidth, 100 / 100);
      drawCircle('#e8e8e8', options.lineWidth + 2, (100 - options.percent) / 100);
    });
  };


  var url = 'data.json';
  var req = new XMLHttpRequest();
  req.overrideMimeType("application/json");
  req.open('GET', url, true);
  req.onload = function() {
    var endDate = JSON.parse(req.responseText);
    endDate = endDate.year + '-'
            + endDate.month + '-'
            + endDate.day + 'T'
            + endDate.hours + ':'
            + endDate.minutes + ':'
            + endDate.seconds + '.000'
            + endDate.gtm;
    console.log(endDate);
    if (endDate) countdown(endDate);
  };
  req.send(null);

  // setInterval(function () {
  //   drawProgress('.js-graph');
  // }, 1000);
  
})(jQuery);

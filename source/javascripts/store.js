var inPreview = (/\/admin\/design/.test(top.location.pathname));

$('.dropdown-navigation-title').click(function(e) { 
  $('.dropdown-navigation-list').toggleClass('visible');
});

$('.option-quantity').blur(function(e) {
  $(this).closest('form').submit();
  return false;
});
$('.cart-item-remove').click(function(e) {
  $(this).closest('li').find('input.option-quantity').val(0).closest('form').submit();
  return false;
});

$('.product-option-list li').not('.disabled').click(function() { 
  var option_id = $(this).data("option-id");
  if (option_id > 0) { 
    $('#option').val(option_id);
    $('.product-form').submit();
  }
});

$(window).scroll(function(e){
  parallax();
});

function parallax(){
  var scrolled = $(window).scrollTop();
  $('.accent-background').css('top',-(scrolled*0.20)+'px');
}

if (!inPreview) {
  document.addEventListener('DOMContentLoaded', function(){
  	var trigger = new ScrollTrigger({
  	  toggle: {
  	    visible: 'visible',
  	    hidden: 'invisible'
  	  },
  	  offset: {
  	    x: 0,
  	    y: 60
  	  },
  	  addHeight: false,
  	  once: true
  	}, document.body, window);
  });
}
else { 
  $('div[data-scroll]').each(function() {
    $(this).addClass('visible');
  });
}


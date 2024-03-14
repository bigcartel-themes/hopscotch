"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("preloader");
  let contactFields = document.querySelectorAll(".contact-form input, .contact-form textarea");
  contactFields.forEach(function (contactField) {
    contactField.removeAttribute("tabindex");
  });
  const numShades = 5;

  let cssProperties = [];

  for (const themeColor in themeColors) {
    const hexValue = themeColors[themeColor];
    var hsl = tinycolor(hexValue).toHsl();
    for (var i = numShades - 1; i >= 0; i -= 1) {
      hsl.l = (i + 0.5) / numShades;
      cssProperties.push(`--${camelCaseToDash(themeColor)}-${((i * 100) / 1000) * 200}: ${tinycolor(hsl).toRgbString()};`);
    }
    numColor = tinycolor(hexValue).toRgb();
    cssProperties.push(`--${camelCaseToDash(themeColor)}-rgb: ${numColor["r"]}, ${numColor["g"]}, ${numColor["b"]};`);
  }

  const headTag = document.getElementsByTagName("head")[0];
  const styleTag = document.createElement("style");

  styleTag.innerHTML = `
    :root {
      ${cssProperties.join("\n")}
    }
  `;
  headTag.appendChild(styleTag);
});

window.addEventListener("load", () => {
  document.body.classList.remove("transition-preloader");
});


$(document).on('click', '.dropdown-navigation-title', function(e) {
  let $this = $(this);
  let $dropdownNavigationList = $('.dropdown-navigation-list');
  $dropdownNavigationList.attr('aria-hidden', function(i, attr) {
    return attr === 'true' ? 'false' : 'true';
  });
  $this.attr('aria-expanded', function(i, attr) {
    return attr === 'true' ? 'false' : 'true';
  });
});

$('.option-quantity').blur(function(e) {
  $(this).closest('form').submit();
  return false;
});
$('.cart-item-remove').click(function(e) {
  $(this).closest('li').find('input.option-quantity').val(0).closest('form').submit();
  return false;
});

let animateElements = document.querySelectorAll('.product-card');

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 60 / entry.boundingClientRect.height) {
      entry.target.classList.add('visible');
    }
  });
}, {
  rootMargin: '0px',
  threshold: Array.from({length: 100}, (_, i) => i / 100) // Array of thresholds from 0.0 to 1.0
});

animateElements.forEach(element => {
  observer.observe(element);
});
var debt = document.getElementById('debt');
var debt_counter = document.getElementById('debt-counter');
var debtCounterStart = document.getElementById('debt-counter-start');

var thousand = new Intl.NumberFormat('pl-PL')
var money = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
var additional_instructions_shown = false;

function detect_confused_user(e, timer) {
  if (!additional_instructions_shown) {
    additional_instructions_shown = true;

    setTimeout(function(){
      if (window.scrollX < 1) {
        document.getElementById('instructions').classList.add("show");
      }
    }, timer);
  }
}
function detect_slightly_confused_user(e, timer) {
  detect_confused_user(e, 2000);
}
function detect_very_confused_user(e, timer) {
  detect_confused_user(e, 4500);
}

if (window.innerWidth > 450) {
  document.addEventListener("mousemove", detect_very_confused_user, {once: true});
  document.addEventListener("mousewheel", detect_slightly_confused_user, {once: true});
  document.addEventListener("DOMMouseScroll", detect_slightly_confused_user, {once: true});
}

window.addEventListener('scroll', function(){
  update_wealth_counter();
});

function update_wealth_counter() {
  if (debt_viewable()) {
    if (debt_counter_viewable()) {
      let wealth = (window.scrollX - debt.offsetLeft + 1000) * 500000;
      debt_counter.innerHTML = (wealth < 290000000000) ? money.format(wealth) : "290 000 000 000 zł";
    }
    else {
      debt_counter.innerHTML = '';
    }
  }
  function debt_viewable() {
    return window.scrollX < debt.offsetLeft + debt.offsetWidth + 100;
  }
  function debt_counter_viewable() {
    return debtCounterStart.offsetLeft - window.scrollX < (window.innerWidth);
  }
}



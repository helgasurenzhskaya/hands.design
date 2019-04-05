

var $bigBall = document.querySelector('.cursor__ball--big');
var $smallBall = document.querySelector('.cursor__ball--small');
var $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (var i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($bigBall, .4, {
    x: e.pageX - 15,
    y: e.pageY - 15 });

  TweenMax.to($smallBall, .1, {
    x: e.pageX - 5,
    y: e.pageY - 7 });

}

// Hover an element
function onMouseHover() {
  TweenMax.to($bigBall, .3, {
    scale: 4 });

}
function onMouseHoverOut() {
  TweenMax.to($bigBall, .3, {
    scale: 1 });

}






$(document).ready(function() {
  
  initialSlide.addClass('active');
  initalSelected.addClass('active');
  TweenMax.to(initialSlide, 0.5, {autoAlpha:1});
  
});

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// super simple router - go to page specified in hash, otherwise go to "default"
function router(route) {
  var pageName = route ? route : $('.default.page').attr('data-page-name');
  var $page = $('[data-page-name="' + pageName + '"]');
  $('.page').css('display', 'none');
  $('[data-page]').removeClass('active');
  $('[data-page="' + pageName + '"]').addClass('active');
  $page.css('display', 'block');
}
router();

// fake loader
var progress = 0;
var fakeLoaderInterval = window.setInterval(function () {
  var $lp = $('.loading-progress');
  progress = progress + getRandomArbitrary(10, 25);
  $lp.css('transform', 'translateX(' + progress + '%)');

  if (progress >= 75) {
    window.clearInterval(fakeLoaderInterval);
    $lp.css('transform', 'translateX(100%)');
    setTimeout(function () {
      return $('.loading').css('transform', 'translateY(calc(100% + 10px))');
    }, 400);
  }
}, getRandomArbitrary(100, 500));

// navigation
$('.main-nav li a').on('click', function (e) {
  var $this = $(e.currentTarget);
  var route = $this.attr('data-page');

  $('.main-nav li a').removeClass('active');
  $this.addClass('active');
  router(route);
});

console.clear();

ScrollIndicator = (function(){
	
	var scrollIndicator,
			sections;
	
	function onSectionClick(e) {
		
		e.preventDefault();
		
		if (!/li|a/.test(e.target.nodeName.toLowerCase())) {
			return false;
		}
		
		ScrollIt(e.target);
		
	}
	
	function addEventListeners() {
		scrollIndicator.addEventListener('click', onSectionClick);
	}
	
	function update(val) {
		
		var winOffset = window.innerHeight * 0.25;
		
		for (var i = 0; i < sections.length; i++) {
			var activeTitle = sections[i].getAttribute('data-title'),
					activeSection = scrollIndicator.querySelector('[data-title=' + activeTitle + ']');

			if (val >= (sections[i].offsetTop - winOffset) && val < sections[i].offsetTop + (sections[i].clientHeight - winOffset)) {
				activeSection.className = 'active';
			} else {
				activeSection.removeAttribute('class');
			}
		}
		
	}
	
	function init() {
		
		scrollIndicator = document.getElementById('scroll-indicator');
		sections = document.querySelectorAll('section');
		
		var ul = document.createElement('ul');
		
		//build the scroll nav
		for (var i = 0; i < sections.length; i++) {
			
			var count = (i < 10 ? '0' : '') + (i + 1),
					section = sections[i],
					li = document.createElement('li'),
					a = document.createElement('a'),
					id = section.id;
			
			li.setAttribute('data-title', section.getAttribute('data-title'));
			
			a.innerHTML = count;
			a.href = '#' + id;
			
			li.appendChild(a);
			ul.appendChild(li);
		}
		
		scrollIndicator.appendChild(ul);
		
		addEventListeners();
	}
	
	document.addEventListener('DOMContentLoaded', init);
	
	return {
		update: update
	}
	
})();



GlobalScroll = (function() {
	var scrollPos;
	
	function getValue() {
		return scrollPos;
	}
	
	function scrollVal() {
		scrollPos = window.pageYOffset || document.body.scrollTop;
		ScrollIndicator.update(scrollPos);
		requestAnimationFrame(scrollVal);
	}
	
	document.addEventListener('DOMContentLoaded', scrollVal);
	
})();



ScrollIt = function(target, time) {
	
	var targetId = target.href.split('#')[1],
			end = document.getElementById(targetId).offsetTop,
			start = window.pageYOffset,
			duration = time || 1000,
			distance = end - start,
			timeStart = Date.now(),
			timeEnd = timeStart + duration,
			tick, cachedTick;
	
	//https://en.wikipedia.org/wiki/Smoothstep
	function step(startTime, endTime, point) {
		if (point <= startTime) { return 0; }
		if (point >= endTime) { return 1; }
		var x = (point - startTime) / (endTime - startTime);
		return x*x*x*(x*(x*6 - 15) + 10);
	}
	
  (function loop() {
	
		var now = Date.now(),
				tick = start + (distance * step(timeStart, timeEnd, now));
		
		window.scrollTo(0, Math.floor(tick));

		if (now <= timeEnd) {
			requestAnimationFrame(loop);
		}
		
  })();
  
}



// Create an animation for each border and letter
document.querySelectorAll('.letter, .border').forEach(function (elem) {

  // Get the end values from the data attributes
  var tx = elem.getAttribute('data-tx') + 'px';
  var ty = elem.getAttribute('data-ty') + 'px';
  var r = elem.getAttribute('data-r') + 'deg';

  // Crate an instance for the current element and store the instance in an array.
  // We start the animation later using the instances from the array.
  instances.push(basicScroll.create({
    elem: anchor,
    from: 'top-bottom',
    to: 'top-top',
    direct: elem,
    props: {
      '--tx': {
        from: '0',
        to: tx },

      '--ty': {
        from: '0',
        to: ty },

      '--r': {
        from: '0',
        to: r } } }));




});

instances.forEach(function (instance) {return instance.start();});


// Global
var win = window,
    doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
};

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {

    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className = el.className.replace(reg,' ');
  }
};

// Elements

var site = doc.getElementsByClassName('site-wrap')[0];
var wrap = doc.getElementsByClassName('panel-wrap')[0];

var panel = doc.getElementsByClassName('panel');

var zoom = doc.getElementsByClassName('js-zoom');

var nav_up = doc.getElementsByClassName('js-up'),
    nav_left = doc.getElementsByClassName('js-left'),
    nav_right = doc.getElementsByClassName('js-right'),
    nav_down = doc.getElementsByClassName('js-down');

var animation = doc.getElementsByClassName('js-animation');

// Tracking
var pos_x = 0,
    pos_y = 0;

function setPos(){
  wrap.style.transform = 'translateX(' + pos_x + '00%) translateY(' + pos_y + '00%)';
  setTimeout( function(){
    removeClass(wrap, 'animate');
  }, 600);
}

setPos();

function moveUp(){
  addClass(wrap, 'animate');
  pos_y++;
  setPos();
}

function moveLeft(){
  addClass(wrap, 'animate');
  pos_x++;
  setPos();
}

function moveRight(){
  addClass(wrap, 'animate');
  pos_x--;
  setPos();
}

function moveDown(){
  addClass(wrap, 'animate');
  pos_y--;
  setPos();
}

for (var x = 0; x < nav_up.length; x++){
  nav_up[x].addEventListener('click', moveUp);
}

for (var x = 0; x < nav_left.length; x++){
  nav_left[x].addEventListener('click', moveLeft);
}

for (var x = 0; x < nav_right.length; x++){
  nav_right[x].addEventListener('click', moveRight);
}

for (var x = 0; x < nav_down.length; x++){
  nav_down[x].addEventListener('click', moveDown);
}

// Animations

for (var x = 0; x < animation.length; x++){
  ( function(_x){
    animation[_x].addEventListener('click', function(){
      toggleAnimation(_x);
    });
  })(x);
}

function toggleAnimation(i){
  for (var x = 0; x < animation.length; x++){
    if (i === x){
      addClass(animation[x], 'active');
      addClass(wrap, animation[x].getAttribute('data-animation'));
    } else {
      removeClass(animation[x], 'active');
      removeClass(wrap, animation[x].getAttribute('data-animation'));
    }
  }
  
}

for (var x = 0; x < zoom.length; x++){
  zoom[x].addEventListener('click', zoomOut);   
}

function zoomOut(e){
  e.stopPropagation();
  addClass(site, 'show-all');
  for (var x = 0; x < panel.length; x++){
    ( function(_x){
      panel[_x].addEventListener('click', setPanelAndZoom);
    })(x);
  }
}

function setPanelAndZoom(e){
  pos_x = -e.target.getAttribute('data-x-pos'),
  pos_y = e.target.getAttribute('data-y-pos');
  setPos();
  zoomIn();
}


function zoomIn(){
  for (var x = 0; x < panel.length; x++){
    panel[x].removeEventListener('click', setPanelAndZoom);
  }
  removeClass(site, 'show-all');
}

var TxtType = function(el, toRotate, period) {
		        this.toRotate = toRotate;
		        this.el = el;
		        this.loopNum = 0;
		        this.period = parseInt(period, 10) || 2000;
		        this.txt = '';
		        this.tick();
		        this.isDeleting = false;
		    };
		
		    TxtType.prototype.tick = function() {
		        var i = this.loopNum % this.toRotate.length;
		        var fullTxt = this.toRotate[i];
		
		        if (this.isDeleting) {
		        this.txt = fullTxt.substring(0, this.txt.length - 1);
		        } else {
		        this.txt = fullTxt.substring(0, this.txt.length + 1);
		        }
		
		        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
		
		        var that = this;
		        var delta = 200 - Math.random() * 100;
		
		        if (this.isDeleting) { delta /= 2; }
		
		        if (!this.isDeleting && this.txt === fullTxt) {
		        delta = this.period;
		        this.isDeleting = true;
		        } else if (this.isDeleting && this.txt === '') {
		        this.isDeleting = false;
		        this.loopNum++;
		        delta = 500;
		        }
		
		        setTimeout(function() {
		        that.tick();
		        }, delta);
		    };
		
		    window.onload = function() {
		        var elements = document.getElementsByClassName('typewrite');
		        for (var i=0; i<elements.length; i++) {
		            var toRotate = elements[i].getAttribute('data-type');
		            var period = elements[i].getAttribute('data-period');
		            if (toRotate) {
		              new TxtType(elements[i], JSON.parse(toRotate), period);
		            }
		        }
		        // INJECT CSS
		        var css = document.createElement("style");
		        css.type = "text/css";
		        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		        document.body.appendChild(css);
		    };


var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function() {
      that.tick();
    }, delta);
  };

  window.onload = function() {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
  };

		        this.el = el;
		        this.loopNum = 0;
		        this.period = parseInt(period, 10) || 2000;
		        this.txt = '';
		        this.tick();
		        this.isDeleting = false;
		    };
		
		    TxtType.prototype.tick = function() {
		        var i = this.loopNum % this.toRotate.length;
		        var fullTxt = this.toRotate[i];
		
		        if (this.isDeleting) {
		        this.txt = fullTxt.substring(0, this.txt.length - 1);
		        } else {
		        this.txt = fullTxt.substring(0, this.txt.length + 1);
		        }
		
		        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
		
		        var that = this;
		        var delta = 200 - Math.random() * 100;
		
		        if (this.isDeleting) { delta /= 2; }
		
		        if (!this.isDeleting && this.txt === fullTxt) {
		        delta = this.period;
		        this.isDeleting = true;
		        } else if (this.isDeleting && this.txt === '') {
		        this.isDeleting = false;
		        this.loopNum++;
		        delta = 500;
		        }
		
		        setTimeout(function() {
		        that.tick();
		        }, delta);
		    };
		
		    window.onload = function() {
		        var elements = document.getElementsByClassName('typewrite');
		        for (var i=0; i<elements.length; i++) {
		            var toRotate = elements[i].getAttribute('data-type');
		            var period = elements[i].getAttribute('data-period');
		            if (toRotate) {
		              new TxtType(elements[i], JSON.parse(toRotate), period);
		            }
		        }
		        // INJECT CSS
		        var css = document.createElement("style");
		        css.type = "text/css";
		        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
		        document.body.appendChild(css);
		    };
			
			








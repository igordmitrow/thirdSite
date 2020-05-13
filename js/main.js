const img = document.querySelector('.main-pic img');
const header = document.getElementById('header');
var isMouseDown = false;
var lastScrollTop = 0;
var startX = 0;
prev = document.querySelector('.reviews .prev');
active = document.querySelector('.slide-active');
next = document.querySelector('.reviews .next');

function chgClass (prev, active, next, args) {
	let animation = document.querySelectorAll('.animation');
	if(animation.length == 2){
		animation.forEach( e => {
			e.classList.remove('animation');
		});
	}
	args.forEach( e => {
		e.removeAttribute('style');
		e.removeAttribute('class');
	});
	prev.classList.add('animation');
	active.classList.add('animation');
	next.classList.add('prev');
	prev.classList.add('slide-active');
	active.classList.add('next');		
	document.querySelector('.indicator-active').classList.remove('indicator-active');
	document.querySelector('.indicator-'+prev.getAttribute('data-pos')).classList.add('indicator-active');
	getReviews();
}

function getReviews () {
	prev = document.querySelector('.reviews .prev');
	active = document.querySelector('.slide-active');
	next = document.querySelector('.reviews .next');

}

function initSlider () {
	const arrows = document.querySelectorAll('.slide-arrow');
	const slider = document.querySelector('.reviews');
	arrows[0].addEventListener('click', function () {
		chgClass(prev, active, next, [prev, active, next]);
	});

	arrows[1].addEventListener('click', function () {
		chgClass(next, prev, active, [next, prev, active]);
	});

	slider.addEventListener('mousedown', function (e) {
		isMouseDown = true;
		startX = e.clientX;
	});

	slider.addEventListener('touchstart', function(e) {
		startX = e.touches[0].clientX;
	}, false);
	slider.addEventListener('touchend', function(e) {
		var deltaX;
		deltaX = e.changedTouches[0].clientX - startX;
		if(deltaX < 0) {
			chgClass(next, prev, active, [next, prev, active]);
		} else if (deltaX > 0) {
			chgClass(prev, active, next, [prev, active, next]);
		}
	}, false);

	slider.addEventListener('mouseup', function (e) {
		isMouseDown = false;
		deltaX = e.clientX - startX;

		if(deltaX < -100) {
			chgClass(next, prev, active, [next, prev, active]);
		} else if (deltaX > 100) {
			chgClass(prev, active, next, [prev, active, next]);
		}
	});

	slider.addEventListener('mouseleave', function (){
		isMouseDown = false;
		var style = window.getComputedStyle(active);
		var matrix = new WebKitCSSMatrix(style.webkitTransform);
		if(matrix.m41 < 0) {
			chgClass(next, prev, active, [next, prev, active]);
		} else if (matrix.m41 > 0) {
			chgClass(prev, active, next, [prev, active, next]);
		}
	});

	document.querySelectorAll('.indicators div').forEach(e => {
		e.addEventListener('click',function () {
			fpos = e.getAttribute('data-pos');
			pos = active.getAttribute('data-pos');
			if(pos-fpos == 1 || pos-fpos == -2){
				chgClass(prev, active, next, [prev, active, next]);
			}else if (pos-fpos == -1 || pos-fpos == 2){
				chgClass(next, prev, active, [next, prev, active]);
			}
		});
	});
}

window.addEventListener('scroll', function () {
	var scrollTop = window.pageYoffset || document.documentElement.scrollTop;
	if( scrollTop > lastScrollTop) {
		header.style.transform = 'translate(0,-100px)';
	}else {
		header.style.transform = 'translate(0,0)';
	}
	if(location.href.split("/").slice(-1) == '' || location.href.split("/").slice(-1) == 'index.html' || location.href.split("/").slice(-1) == 'about.html' || location.href.split("/").slice(-1) == '#'){
		if( scrollTop > '162'){
			header.classList.add('convert');
		} else {
			header.classList.remove('convert');
		}
	}
	img.style.objectPosition = `50% ${scrollTop*.5-120}px`;

	lastScrollTop = scrollTop;
});

window.addEventListener('load', function () {
	if(location.href.split("/").slice(-1) == '' || location.href.split("/").slice(-1) == 'index.html' || location.href.split("/").slice(-1) == 'about.html' || location.href.split("/").slice(-1) == '#'){
		initSlider();
	} else {
		header.classList.add('convert');
	}
	checkbox = document.querySelector('#check');
	checkbox.addEventListener('change', function () {
		let checkbox = document.querySelector('#check');

		if(checkbox.checked){
			document.querySelector('body').style.overflow = 'hidden';
		}else {
			document.querySelector('body').style.overflow = 'initial';
		}
	});
});

window.addEventListener('resize', function () {
	if(window.innerWidth <= 576) {
		document.querySelector('ul.menu').classList.add('no-animation');

		setTimeout(function () {
			document.querySelector('ul.menu').classList.remove('no-animation');
		}, 300);
	}
})
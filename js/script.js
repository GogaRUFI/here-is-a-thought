function setTheme(theme) {
	localStorage.setItem('theme', theme);
	document.documentElement.className = theme;
	document.getElementsByClassName(theme)[0].style.removeProperty('--color-primary');
	var primaryColor = localStorage.getItem(`${theme}-color`) || getComputedStyle(document.getElementsByClassName(theme)[0]).getPropertyValue('--color-primary');
	setPrimaryColor(primaryColor);
}

function setPrimaryColor(color) {
	const theme = localStorage.getItem('theme')
	localStorage.setItem(`${theme}-color`, color.trim());
	document.getElementsByClassName(theme)[0].style.setProperty('--color-primary', color.trim());
}

function toggleTheme() {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-light');
	} else {
		setTheme('theme-dark');
	}
}

function angle(cx, cy, ex, ey) {
	const dy = ey - cy;
	const dx = ex - cx;
	var theta = Math.atan2(dy, dx);
	theta *= 180 / Math.PI;
	if (theta < 0) theta = 360 + theta;
	if (theta <= 180)
		theta += 180;
	else
		theta -= 180;
	return Math.round(theta);
}

(function () {
	if (localStorage.getItem('theme') === 'theme-dark') {
		setTheme('theme-dark');
	} else {
		setTheme('theme-light');
	}

	const theme = localStorage.getItem('theme');

	if (!localStorage.getItem(`${theme}-color`)) {
		setPrimaryColor(getComputedStyle(document.getElementsByClassName(`${theme}`)[0]).getPropertyValue('--color-primary'));
	} else {
		setPrimaryColor(localStorage.getItem(`${theme}-color`));
	}

	const draggable = new PlainDraggable(document.getElementById('draggable'));
	draggable.left = 20;
	draggable.top = 20;

	draggable.onDragStart = function(position) {
		document.getElementById('draggable').style.removeProperty('transition');
	};

	draggable.onDrag = function(position) {
		const degree = angle(window.innerWidth / 2, window.innerHeight / 2, position.left, position.top);
		const x = localStorage.getItem('theme') === 'theme-dark' ? 100 : 70;
		setPrimaryColor(`hsl(${degree},${x}%,50%)`);
	};

	draggable.onDragEnd = function(position) {
		document.getElementById('draggable').style.setProperty('transition','1s ease-in-out');
		draggable.left = 20;
		draggable.top = 20;
	};

	const mc = new Hammer(document.getElementById('draggable'));
	mc.on("doubletap", function(ev) {
		toggleTheme();
	});
})();
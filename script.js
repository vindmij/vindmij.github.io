// JS available on https://github.com/colinlohner/FSM-JS


//Setup
var fsmActual = document.createElement('div');
fsmActual.setAttribute('id', 'fsm_actual');
document.body.appendChild(fsmActual);
var $fsm = document.querySelectorAll('.fsm');;
var $fsmActual = document.querySelector('#fsm_actual');
$fsmActual.style.position = "absolute";
var $metaThemeColor = document.querySelector("meta[name=theme-color]");

var position = {};
var size = {};
var color;

//modal action stuffs
var openFSM = function(event) {
	var $this = event.currentTarget;
	position = $this.getBoundingClientRect();
	size = {
		width: window.getComputedStyle($this).width,
		height: window.getComputedStyle($this).height
	}
	
	$fsmActual.style.position = "absolute";
	$fsmActual.style.top = position.top + 'px';
	$fsmActual.style.left = position.left + 'px';
	$fsmActual.style.height = size.height;
	$fsmActual.style.width = size.width;
	$fsmActual.style.margin = $this.style.margin;
	
	setTimeout(function(){
		$fsmActual.innerHTML = $this.innerHTML;
		var classes = $this.classList.value.split(' ');
		for (var i = 0; i < classes.length; i++) {
			$fsmActual.classList.add(classes[i]);
			if(classes[i].match(/color/)) {
				color = classes[i].substring(5, 11);
			}
		}
		$fsmActual.classList.add('growing');
		$fsmActual.style.height = '100vh';
		$fsmActual.style.width = '100vw';
		$fsmActual.style.top = '0';
		$fsmActual.style.left = '0';
		$fsmActual.style.margin = '0';
	}, 0.7);
	
	setTimeout(function(){
		$fsmActual.classList.remove('growing');
		$fsmActual.classList.add('full-screen');
		$metaThemeColor.setAttribute("content", "#"+color);
	}, 500);
};

var closeFSM = function(event){
	var $this = event.currentTarget;
	
	$this.style.height = size.height;
	$this.style.width = size.width;
	$this.style.top = position.top + 'px';
	$this.style.left = position.left + 'px';
	$this.style.margin = '0';
	$this.classList.remove('full-screen');
	$this.classList.add('shrinking');
	$metaThemeColor.setAttribute("content", "#f5f5f5");
	
	setTimeout(function(){
		while($this.firstChild) $this.removeChild($this.firstChild);
		var classList = $this.classList;
		while (classList.length > 0) {
			 classList.remove(classList.item(0));
		}
		$this.style = '';;
	}, 500);
};

for (var i = 0; i < $fsm.length; i++) {
	$fsm[i].addEventListener("click", openFSM);
}
$fsmActual.addEventListener("click", closeFSM);

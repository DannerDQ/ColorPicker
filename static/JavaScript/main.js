var $ = selec => document.querySelector(selec);
let move = false, click = false, moveBarSelector = false;
let color = '#F00'; 
const canvas = $('canvas'), colorBar = $('#rainbowBar');
const ctx = canvas.getContext('2d');
const context = colorBar.getContext('2d');

// Escuchar cuando se cambia de tamaño la pantalla

addEventListener('resize', ()=>{Canvas(); defColor()})

// Define el color y tamaño inicial de canvas y rainBow Bar

function Canvas () {
	canvas.height = $('#canvasContainer').clientHeight;
	canvas.width = $('#canvasContainer').clientWidth;
	colorBar.height = $('#rainbowBarContainer').clientHeight;
	colorBar.width = $('#rainbowBarContainer').clientWidth-2;
	$('#barSelector').style.width = `${colorBar.width + 6}px`
	const gradient1 = context.createLinearGradient(colorBar.width,0, colorBar.width,colorBar.height);
	gradient1.addColorStop(0, '#F00');
	gradient1.addColorStop(0.1, '#F00');
	gradient1.addColorStop(0.2, '#F70');
	gradient1.addColorStop(0.3, '#FF0');
	gradient1.addColorStop(0.35, '#FF0');
	gradient1.addColorStop(0.5, '#0F0');
	gradient1.addColorStop(0.6, '#0FF');
	gradient1.addColorStop(0.7, '#09F');
	gradient1.addColorStop(0.8, '#00F');
	gradient1.addColorStop(0.9, '#50F');
	gradient1.addColorStop(1, '#A0F');
	context.fillStyle = gradient1;
	context.fillRect(0,0,colorBar.width, colorBar.height)
}
Canvas()

// Cambia el color en canvas

function defColor(){
	const horizontalGradient = ctx.createLinearGradient(0, canvas.height, canvas.width, canvas.height);
	const verticalGradient = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height);
	horizontalGradient.addColorStop(0, '#FFF');
	horizontalGradient.addColorStop(0.1, '#FFF');
	horizontalGradient.addColorStop(0.95, color);
	horizontalGradient.addColorStop(1, color);
	verticalGradient.addColorStop(0, 'transparent');
	verticalGradient.addColorStop(0.1, 'transparent');
	verticalGradient.addColorStop(0.95, '#000');
	verticalGradient.addColorStop(1, '#000');
	ctx.fillStyle = horizontalGradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = verticalGradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
defColor()

// RGB to HEX

function rgbToHex(r,g,b){
	let args = [r,g,b]
	let hex = '';
	for(arg of args){
		hex += Number(arg).toString(16).length == 1? 
		'0'+arg.toString(16) : arg.toString(16)
	}
	return '#'+hex.toUpperCase();
}

// RGB to HSL

function rgbToHsl(r, g, b){
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
  		? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  hsl = [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
  HSL = '';
  for(x in hsl){
  	if(x == 0)HSL+='(';
  	HSL += Math.round(hsl[x]*10)/10
  	if(x != 0)HSL+='%';
  	if(x != 2)HSL+=',';
  	if(x == 2)HSL+=')';
  }
  return HSL;
};

// Selecion de solor en canvas

canvas.addEventListener('click', e =>{
const pixel = ctx.getImageData(e.offsetX, e.offsetY,1,1).data;
	$('#selectedColor').style.backgroundColor = 
	`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
	move = false, click = false;
	$('#gradientSelector').style.transform = 
		`translate(${e.offsetX}px, ${e.offsetY}px)`;
	$('#rgb').textContent = `(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
	$('#hex').textContent = rgbToHex(pixel[0], pixel[1], pixel[2]);
	$('#hsl').textContent = rgbToHsl(pixel[0], pixel[1], pixel[2])
})
canvas.addEventListener('mousemove', e =>{
	if(move){
		$('#gradientSelector').style.transform = 
		`translate(${e.offsetX}px, ${e.offsetY}px)`
	}
	if(click){
		const pixel = ctx.getImageData(e.offsetX, e.offsetY,1,1).data;
		$('#selectedColor').style.backgroundColor = 
		`rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
		$('#rgb').textContent = `(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
		$('#hex').textContent = rgbToHex(pixel[0], pixel[1], pixel[2]);
		$('#hsl').textContent = rgbToHsl(pixel[0], pixel[1], pixel[2])
	}
})
canvas.addEventListener('mousedown', e =>{move = true,
 click = true})
addEventListener('mouseup',e =>{move = false, 
	click = false, moveBarSelector = false})

// Seleccionar colores en rainbow bar

colorBar.addEventListener('click', e =>{
	const colorSelect = context.getImageData(e.offsetX, e.offsetY,  1,1).data;
	$('#barSelector').style.transform = `translate(0, ${e.offsetY}px)`;
	color = `rgb(${colorSelect[0]}, ${colorSelect[1]}, ${colorSelect[2]})`;
	defColor();
	moveBarSelector = false;
})
colorBar.addEventListener('mousemove', e =>{
	if(moveBarSelector){
		const colorSelect = context.getImageData(e.offsetX, e.offsetY,  1,1).data;
		$('#barSelector').style.transform = `translate(0, ${e.offsetY}px)`;
		color = `rgb(${colorSelect[0]}, ${colorSelect[1]}, ${colorSelect[2]})`
		defColor();
	}
})
colorBar.addEventListener('mousedown', e =>{moveBarSelector = true})

// Copiar los colores al portapapeles y autoguardado en localStorage

$('.copyRgb').addEventListener('click', e =>{
	addHistory();
	let content = $('#textRgb');
	content.textContent += $('#rgb').textContent;
	content.select();
	document.execCommand('copy');
	content.textContent = 'rgb';
})
$('.copyHex').addEventListener('click', e =>{
	addHistory();
	let content = $('#textHex');
	content.textContent += $('#hex').textContent;
	content.select();
	document.execCommand('copy');
	content.textContent = '';
})
$('.copyHsl').addEventListener('click', e =>{
	addHistory();
	let content = $('#textHsl');
	content.textContent += $('#hsl').textContent;
	content.select();
	document.execCommand('copy');
	content.textContent = 'hsl';
})

function addHistory(){
	let hsl = $('#textHsl').textContent + $('#hsl').textContent;
	let hex = $('#textHex').textContent + $('#hex').textContent;
	let rgb = $('#textRgb').textContent + $('#rgb').textContent;
	localStorage.setItem(hex,JSON.stringify({
			hex: hex,
			hsl: hsl,
			rgb: rgb
		}))
}
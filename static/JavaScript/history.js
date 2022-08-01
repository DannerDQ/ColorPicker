var $ = selec => document.querySelector(selec);
let localStorageKeys = Object.keys(localStorage);
let fragment = document.createDocumentFragment();
for(key of localStorageKeys){
	let element = document.createElement('div');
	element.setAttribute('class', 'historyElement');
	let color = document.createElement('div');
	color.setAttribute('class', 'colorHistory')
	color.style.backgroundColor = key;
	let div = document.createElement('div')
	div.setAttribute('class','info')
	let title = document.createElement('span');
	title.setAttribute('class','title');
	title.className += ` title${key.replace('#','-')}`
	title.textContent = key;
	let más = document.createElement('select');
	más.setAttribute('class','más');
	for(let i=3;i>0;i--){
		let option = document.createElement('option');
		option.className = i == 3? 'hex':i == 2? 'hsl':'rgb';
		option.label = i == 3? 'HEX':i == 2? 'HSL':'RGB';
		option.id = key;
		option.setAttribute('onclick','modifTitle(this.id, this.className)')
		más.appendChild(option)
	}
	let eliminar = document.createElement('span');
	eliminar.setAttribute('class','eliminar');
	eliminar.textContent = 'Eliminar';
	eliminar.setAttribute('id',key);
	eliminar.setAttribute('onclick','deleteColor(this.id)');
	div.appendChild(title);
	div.appendChild(más);
	div.appendChild(eliminar);
	element.appendChild(color);
	element.appendChild(div)
	fragment.appendChild(element);
}
$('#historyContainer').appendChild(fragment)
function deleteColor(id) {
	localStorage.removeItem(id);
	location.reload()
}
function modifTitle(elm,format){
	let formatObj = JSON.parse(localStorage.getItem(elm));
	elm = elm.replace('#','-')
	let clase = `.title${elm}`;
	$(clase).textContent = formatObj[format];
}
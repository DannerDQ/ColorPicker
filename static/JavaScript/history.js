var $ = selec => document.querySelector(selec);

// Array con las claves de Local Storage:

let localStorageKeys = Object.keys(localStorage);

// Document Fragment

let fragment = document.createDocumentFragment();

// Recorremos el array con las claves de local storage

for(key of localStorageKeys){

	// Key es cada clave del Array, y cada clave del Array es un ID con el color en hex

	// Creamos un elemento de la lista del historial
	let element = document.createElement('div');
	element.setAttribute('class', 'historyElement');
	// mostramos el color en el historial
	let color = document.createElement('div');
	color.setAttribute('class', 'colorHistory')
	color.style.backgroundColor = key;
	// Creamos un contenedor par ala información del color en historial
	let div = document.createElement('div')
	div.setAttribute('class','info')
	// Codigo del color como titulo
	let title = document.createElement('span');
	title.setAttribute('class','title');
	title.className += ` title${key.replace('#','-')}`
	title.textContent = key;
	// Lista para seleccionar el formato en el que se muestra el color
	let más = document.createElement('select');
	más.setAttribute('class','más');
	for(let i=3;i>0;i--){
		// creamos las opciones a seleccionar
		let option = document.createElement('option');
		option.className = i == 3? 'hex':i == 2? 'hsl':'rgb';
		option.label = i == 3? 'HEX':i == 2? 'HSL':'RGB';
		option.id = key;
		option.setAttribute('onclick','modifTitle(this.id, this.className)')
		// Agregamos la opción creada a la lista
		más.appendChild(option)
	}
	// Creamos botón para eliminar un color
	let eliminar = document.createElement('span');
	eliminar.setAttribute('class','eliminar');
	eliminar.textContent = 'Eliminar';
	eliminar.setAttribute('id',key);
	eliminar.setAttribute('onclick','deleteColor(this.id)');
	// Agregamos el titulo al contenedor de información en historial
	div.appendChild(title);
	// Agregamos la lista al contenedor de información en historial
	div.appendChild(más);
	//  Agregamos el botón 'eliminar' al contenedor de información en historial
	div.appendChild(eliminar);
	// Agregamos el color en historial al contenedor general
	element.appendChild(color);
	// Agregamos el contenedor de información al contenedor general
	element.appendChild(div)
	// agregamos el contenedor general al fragmento de documento HTML
	fragment.appendChild(element);
}
// agregamos el fragmento de documento HTML al documento HTML
$('#historyContainer').appendChild(fragment)

// Elimina un color del historial
function deleteColor(id) {
	localStorage.removeItem(id);
	location.reload()
}

// Modifica el titulo del color en historial mediante la lista de selección de formato
function modifTitle(elm,format){
	let formatObj = JSON.parse(localStorage.getItem(elm));
	elm = elm.replace('#','-')
	let clase = `.title${elm}`;
	$(clase).textContent = formatObj[format];
}
console.clear();

const pattern = document.getElementById('diagonalHatch');
const morph = document.getElementById('outline').querySelector("feMorphology");
const inputText = document.getElementById("text");
const inputSize = document.getElementById("size");
const inputThickness = document.getElementById("thickness");
const text = document.querySelector("text");

const getTime = () => (new Date()).getTime();
const start = getTime();
const duration= 2000;

let size = 6;
let thickness = .1

const setSizes = () => {
	pattern.setAttribute("width", size);
	pattern.setAttribute("height", size);
	morph.setAttribute("radius", size * thickness)
	pattern.innerHTML = `
		<path d="M-${size * .25},${size * .25} l${size * .5},-${size * .5}
						 M0,${size} l${size},-${size}
						 M${size * .75},${size * 1.25} l${size * .5},-${size * .5}" 
						style="stroke:white; stroke-width:${size * .25}" />
	`
}
setSizes();

const updateText = (newText) => text.innerHTML = newText.toUpperCase();
inputText.addEventListener("keyup", (e) =>{
	text.innerHTML = updateText(e.target.value)
})
inputText.value = "design";
updateText(inputText.value)


const updateSize = (newSize) => {
	size = newSize;
	setSizes();
}
inputSize.value = size;
inputSize.addEventListener("change", (e) =>{
	updateSize(e.target.value);
})


const updateThickness = (newThickness) => {
	thickness = newThickness;
	setSizes();
}
inputThickness.value = thickness;
inputThickness.addEventListener("change", (e) =>{
	updateThickness(e.target.value);
})

function animate () {
	requestAnimationFrame(animate);
	
	const now = getTime();
	const diff = now - start;
	const t = (diff % duration) / duration;
	
	pattern.setAttribute("y", size * -t);
}
animate();
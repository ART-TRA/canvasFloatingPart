let canvas = document.getElementById('can1');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let particleArray; //particle - частица
let ctx = canvas.getContext("2d");
console.log(canvas.width);

let mouse = {
	x: null,
	y: null,
	radius: 70
}

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
});

// create constructor function
function Particle(x, y, directionX, directionY, size, color){ //direction - направление
	this.x = x;
	this.y = y;
	this.directionX = directionX;
	this.directionY = directionY;
	this.size = size;
	this.color = color;
}

// add draw method to particle prototype
Particle.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
	ctx.fillStyle = this.color;
	ctx.strokeStyle = '#111';
	ctx.fill();
	ctx.stroke();
}


// add update method to particle prototype
Particle.prototype.update = function(){
	//обработка выхода за границы поля
	if(this.x + this.size > canvas.width || this.x - this.size < 0){
		this.directionX = -this.directionX;
	}
	if(this.y + this.size > canvas.height || this.y - this.size < 0){
		this.directionY = -this.directionY;
	}
	
	//check collision detection - mouse position / particle position
	let dx = mouse.x - this.x; //расст-е от мыши до частицы по х
	let dy = mouse.y - this.y; //расст-е от мыши до частицы по y
	let distance = Math.sqrt(dx*dx + dy*dy); //теорема Пифагора
	if(distance < mouse.radius + this.size){
	// if(this.x < mouse.x + mouse.radius && this.x > mouse.x - mouse.radius && 
	// 	this.y < mouse.y + mouse.radius && this.y > mouse.y - mouse.radius){
		if(mouse.x < this.x && this.x + this.size*2 < canvas.width){
			this.x += this.size*2;
		}
		if(mouse.x > this.x && this.x - this.size*2 > 0){
			this.x -= this.size*2;
		}
		if(mouse.y < this.y && this.y + this.size*2 < canvas.height){
			this.y += this.size*2;
		}
		if(mouse.y > this.y && this.y - this.size*2 > 0){
			this.y -= this.size*2;
		}
	}
	

	//передвижение частиц
	this.x +=this.directionX;
	this.y +=this.directionY;
	//их отрисовка на поле
	this.draw(); 
}

// create particle array
function init(){
	particleArray = [];
	for(let i=0;i<2000;++i){
		let size = Math.random() * 20; //рандомное число от 0 до 20 с плавающей запятой
		let x = Math.random() * (canvas.width - size * 2);
		let y = Math.random() * (canvas.height - size * 2);
		let directionX = (Math.random() * .8) - .4;
		let directionY = (Math.random() * .8) - .4;
		let color = 'white';
		
		particleArray.push(new Particle(x,y,directionX,directionY,size,color));
	}
}


//animation loop
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0,canvas.width,canvas.height);

	for(let i=0;i<particleArray.length;++i){
		particleArray[i].update();
	}
}
init();
animate();

window.addEventListener('resize', 
	function(){
		canvas.width = document.documentElement.clientWidth;
		canvas.height = document.documentElement.clientHeight;
		init();
});
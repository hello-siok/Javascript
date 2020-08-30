document.addEventListener('DOMContentLoaded', () => {
const dino = document.querySelector('.dino');
const grid = document.querySelector('.grid');
let   score = 0;
const bottom = 10;
//let isJumping = false;
const gravity = 0.9;

//let dino_y = getComputedStyle(dino).bottom.replace("px","");
// console.log(dino_y);

const crash_x = 100; //left=50px and width=150px
const crash_y = 120;//bottom=20px and height = 100px;

/*********************************************************
JUMP
*********************************************************/
document.addEventListener('keyup',control);
document.addEventListener('click',jump);
document.addEventListener('touchend',jump);

//check keycode http://keycode.info/
function control(e) {
	if (e.keyCode > 0) { //e.keyCode === 32
		jump(); 
		//if (isJumping == false) {
		//	isJumping = true;
		//	jump();
		//}	
	}
}

// setIntervals -> increment y position by __ ms
// we modify property dino.style.bottom 
function jump() {
	let position = 0;

	let timerId = setInterval(function(){
		//move up
		position += 80;
		position *= gravity;
		dino.style.bottom = position + 'px';

		//move down (when reach certain height)
		if (position >= Math.floor(window.screen.height*0.25)){
			clearInterval(timerId);

			let downTimerId = setInterval(function(){
				position -= 15;
				position *= gravity;
				dino.style.bottom = position + 'px';
				

				if (position < 30){
					clearInterval(downTimerId);
					isJumping = false;
				}
			}, 50);
		}
	},50);
}

/*********************************************************
GENERATE OBSTACLE
*********************************************************/
function generateObstable(){
	console.log(window.screen.width);
	let obstaclePosition = Math.floor(window.screen.width*0.9/20)*20;
	let randomTime = Math.random() * 4000;
	

	const obstacle = document.createElement('div');
	obstacle.classList.add('obstacle');
	grid.appendChild(obstacle);
	obstacle.style.left = obstaclePosition;

	let o_timerId = setInterval(function(){
		obstaclePosition -= 20;
		obstacle.style.left	= obstaclePosition+'px';
		let dino_y = getComputedStyle(dino).bottom.replace("px","");

		//gameover
		if (obstaclePosition === crash_x && dino_y <= crash_y) {
			console.log(dino_y);
			console.log('crash happen');
			document.querySelector('.game-over').style.visibility='visible';
			clearInterval(o_timerId);
			clearTimeout(obs_timeId);
			//grid.removeChild(obstacle);
		}

		//add score 
		if (obstaclePosition === crash_x && dino_y > crash_y) {
			console.log(dino_y);
			console.log("pass 1 cactus!!");
			score += 10;
			document.querySelector('.score-actual').innerHTML = score; 
			//console.log(score.innerHTML);
		}

		// clear up paassed cactus
		if (obstaclePosition === 0) {
			clearInterval(o_timerId);
			grid.removeChild(obstacle);
		}
	},50);

	obs_timeId = setTimeout(generateObstable, randomTime);
}

generateObstable();

})
document.addEventListener('DOMContentLoaded',()=>{
const rocket  = document.querySelector('.firework-2');
const score   = document.querySelector('.score-point');
let   score_cache = 0;
rocket.addEventListener('click', firework);

function firework(){
	//console.log('i am clicked!');	
	const speed   = 10;
	let   height  = 5;

	const reposition = () => {
		rocket.style.bottom = "5%";
	}

	const rise = ()=> {
		flying_boolean = 1;
		height += 10;
		rocket.style.bottom = height + '%';

		if (height >=85){
			// stop rising after reaching certain height
			clearInterval(timerId);

			//update the score
			score_cache += 1;
			score.innerHTML = score_cache;

			// reposition the rocket to bottom
			setTimeout(reposition, 100);
			flying_boolean = 0;

		}
	}

	const timerId = setInterval(rise, 100);

	
}

});

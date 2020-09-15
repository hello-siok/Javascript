document.addEventListener('DOMContentLoaded', () => {

let player = 'X';
let win    = 0;
let player_x= [];
let player_o= [];
const player_icon = {
	'X': 'https://images.vexels.com/media/users/3/155473/isolated/preview/faa3172dd52035d0c227d7ecab4d6024-x-cross-doodle-by-vexels.png',
	'O':'https://img.pngio.com/letter-o-png-transparent-letter-opng-images-pluspng-png-that-begins-with-letter-o-2720_2400.png'
};

const win_arr = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7]
];

let game_result    = document.querySelector('.player-win');
let current_player = document.querySelector('.player-which');
let player_x_img     = document.querySelector('.player_x_icon');
let player_o_img     = document.querySelector('.player_o_icon');

const grids = Array.from(document.querySelectorAll('.game-grid'));
grids.forEach(grid_click);

function grid_click(item, index){
	item.addEventListener('click', click_func);

	function click_func(e){
		let index_click = parseInt(e.srcElement.id);

		//check if grid has been clicked before
		if ([...player_x, ...player_o].indexOf(index_click)> -1){
			console.log('this has been clicked before');
		} 
		else{
			// if not clicked, update image
			item.style.backgroundSize = 'cover';
			item.style.backgroundImage = 'url('+player_icon[player]+')';
			console.log('clicked id is ' + index_click);

			// update player grid
			if(player == 'X'){
				player_x.push(index_click);
				//console.log(player_x);
			}else if(player == 'O'){
				player_o.push(index_click);
				//console.log(player_o);
			}

			//win check
			win_check();

			// if win, update win result
			if(win==1){
				game_result.innerHTML= (player == 'X') ? 'Player X wins!' : 'Player O wins!';
				game_result.style.visibility = 'visible';

			}

			// if tie, update tie result
			if(win < 0){
				console.log('executed');
				game_result.innerHTML='player X vs player O - TIE!';
			}

			//if not win nor tie, switch player
			if(win==0){
				player = (player == 'X') ? 'O' : 'X';
				current_player.innerHTML = (player == 'X') ? 'Player X' : 'Player O';
			}
			
		}
	}
}



function win_check(){
	console.log(player_x.length+player_o.length == 9);
	console.log(typeof(win));
	if(player == 'X' && player_x.length >= 3){

		for(let i=0; i < win_arr.length; i++){
			let check_1 = player_x.indexOf(win_arr[i][0]) > -1;
			let check_2 = player_x.indexOf(win_arr[i][1]) > -1;
			let check_3 = player_x.indexOf(win_arr[i][2]) > -1;
			checks = check_1 && check_2 && check_3;

			win = checks ? 1 : 0;

			if (win==1) {break;}
		}

	}else if (player == 'O' && player_o.length >= 3){

		for(let i=0; i < win_arr.length; i++){
			let check_1 = player_o.indexOf(win_arr[i][0]) > -1;
			let check_2 = player_o.indexOf(win_arr[i][1]) > -1;
			let check_3 = player_o.indexOf(win_arr[i][2]) > -1;
			checks = check_1 && check_2 && check_3;

			win = checks ? 1 : 0;
			if (win==1) {break;}
		}
	}else if ((player_x.length+player_o.length) == 9){
		console.log(player_o.length);
		win = -1;
		console.log(win);
	}

}

	
})
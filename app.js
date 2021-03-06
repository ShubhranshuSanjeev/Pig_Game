/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

NEW RULE ADDED: 
- A player looses the ENTIRE score when he rolls two 6 in a row. After that it's next players turn.
*/

var scores, roundScore, activePlayer, gamePlay, prevRoll = 0;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlay)
	{
		//1. Getting the random number
		var dice = Math.floor(Math.random()*6) + 1;
		
	 	//2. Changing the on-screen dice 
	 	var diceDom = document.querySelector('.dice');
	 	diceDom.style.display = 'block';
	 	diceDom.src = 'dice-' + dice + '.png';

	 	//Changing the player if dice roll is 1.
	 	if(dice === 1)
	 	{
	 		changePlayer();
	 	}
	 	//4. If the player rolls 6 two times
	 	else if(dice===6 && prevRoll===6)
		{
			scores[activePlayer] = 0;
			document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
			// Changing the player
	 		changePlayer();

	 		console.log('worked');
		}
	 	//3. Updating the score if the rolled number is not 1.
	 	else
	 	{
	 		roundScore += dice;
	 		document.getElementById('current-' + activePlayer).textContent = roundScore;	
	 	}
		prevRoll = dice;
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {

	if (gamePlay) 
	{
		// Adding the round score to the Global Score
		scores[activePlayer] += roundScore;
		
		var gamePoint = document.querySelector('.game_point').value;

		if(!gamePoint)
		{
			gamePoint = 100;
		}

		// Updating the UI
		document.getElementById('score-' + activePlayer ).textContent = scores[activePlayer]; 

		// Check if the player won
		if (scores[activePlayer]>=gamePoint) 
		{
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			gamePlay = false;
		}
		else
		{
			// Changing the Player
			changePlayer();
		}	
	}

});


function changePlayer() 
{
	// Resettig the round score to 0. 
	roundScore = 0;
	document.getElementById('current-' + activePlayer).textContent = '0';
	
	// Changing the Active player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;    

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlay = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}



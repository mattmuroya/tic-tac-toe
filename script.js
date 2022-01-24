// create the board array

// |0|1|2|
// |3|4|5|
// |6|7|8|

const gameBoard = (() => {
  const board = [
    '', '', '',
    '', '', '',
    '', '', '',];
  return {board};
})();

// player factory

const Player = (name, token) => {
  const play = (spaceId) => {
    gameBoard.board[spaceId] = token;
    let space = document.getElementById(spaceId);
    space.classList.add('taken');
    space.insertAdjacentHTML('afterbegin', `<p>${token}</p>`);
  };
  return {name, token, play};
};

// game object

const startBtn = document.querySelector('.start-button');
startBtn.addEventListener('click', () => {
  document.querySelector('.curtain').style.display = 'none';

  let name1 = document.getElementById('player-1-name').value.trim();
  if (name1 === '') name1 = 'Player 1';

  let name2 = document.getElementById('player-2-name').value.trim();
  if (name2 === '') name2 = 'Player 2';

  game(
    Player(name1, 'X'),
    Player(name2, 'O')
  );
});
  
const game = (p1, p2) => {
  document.querySelectorAll('input').forEach(input => input.value = '');

  let activePlayer = p1;

  const changeActivePlayer = () => activePlayer = activePlayer === p1 ? p2 : p1;

  const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  const message = document.querySelector('.message');
  message.textContent = `${activePlayer.name}'s turn.`

  const checkForWin = () => {
    const playedSpaces = gameBoard.board.reduce((indexList, boardSpace, i) => {
      if (boardSpace === activePlayer.token) indexList.push(i);
      return indexList;
    },[]);
    return winConditions.find(winArray => {
      return winArray.every(winArrIndex => playedSpaces.includes(winArrIndex));
    });
  };

  const triggerWin = () => {
    checkForWin().forEach(index => {
      document.getElementById(index).classList.add(`win-${activePlayer.token}`);
    });
    document.querySelectorAll('.space').forEach(space => {
      space.removeEventListener('click', playTurn);
      space.classList.add('taken');
    })
    message.textContent = `${activePlayer.name} wins!`;
    message.classList.add(`win-${activePlayer.token}`);
    rematchBtn.classList.add('visible');
    newGameBtn.classList.add('visible');
  };

  const triggerTie = () => {
    message.textContent = "It's a tie!";
    rematchBtn.classList.add('visible');
    newGameBtn.classList.add('visible');
  }

  const checkForTie = () => !gameBoard.board.includes('');

  const playTurn = (e) => {
    activePlayer.play(e.target.id);
    e.target.removeEventListener('click', playTurn);
    let gameEnd = false;
    if (checkForWin()) {
      triggerWin();
      gameEnd = true;
    } else if (checkForTie()) {
      triggerTie();
      gameEnd = true;
    }
    changeActivePlayer();
    if (!gameEnd) message.textContent = `${activePlayer.name}'s turn.`
  }

  // space event listeners
  const initializeSpaces = () => {
    document.querySelectorAll('.space').forEach(space => {
      space.addEventListener('click', playTurn);
    });
  };
  initializeSpaces();

  // reset

  const resetMatch = () => {
    for (let i in gameBoard.board) {
      gameBoard.board[i] = '';
      let space = document.getElementById(i);
      space.className = 'space';
      if (space.firstChild) space.removeChild(space.firstChild);
    }
    message.textContent = `${activePlayer.name}'s turn.`;
    message.className = 'message' // reset styles
    rematchBtn.className = 'rematch-button'; // reset styles
    newGameBtn.className = 'new-game-button';
    initializeSpaces();
  };

  const rematchBtn = document.querySelector('.rematch-button');
  rematchBtn.addEventListener('click', resetMatch);

  const newGameBtn = document.querySelector('.new-game-button');
  newGameBtn.addEventListener('click', () => {
    location.reload();
  });

  return {};

};
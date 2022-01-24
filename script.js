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

const player1 = Player(prompt('name?'), 'X');
const player2 = Player(prompt('name?'), 'O');

// game object

const game = ((p1, p2) => {

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
    resetBtn.classList.add('visible', `win-${activePlayer.token}`);
  };

  const triggerTie = () => {
    message.textContent = "It's a tie!";
    resetBtn.classList.add('visible');
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

  const reset = () => {
    for (let i in gameBoard.board) {
      gameBoard.board[i] = '';
      let space = document.getElementById(i);
      space.className = 'space';
      if (space.firstChild) space.removeChild(space.firstChild);
    }
    message.textContent = `${activePlayer.name}'s turn.`;
    message.className = 'message' // reset styles
    resetBtn.className = 'reset-button'; // reset styles
    initializeSpaces();
  };

  const resetBtn = document.querySelector('.reset-button');
  resetBtn.addEventListener('click', reset);

  return{checkForTie, checkForWin};

})(player1, player2);
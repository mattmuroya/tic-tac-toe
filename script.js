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
    // space.removeEventListener('click', game.playTurn); // move this to playturn func?
  };
  return {name, token, play};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

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
  };

  const checkForTie = () => !gameBoard.board.includes('');

  const playTurn = (e) => {
    activePlayer.play(e.target.id);
    e.target.removeEventListener('click', playTurn);
    if (checkForWin()) {
      triggerWin();
      message.textContent = `${activePlayer.name} wins!`;
      message.classList.add(`win-${activePlayer.token}`);
    } else if (checkForTie()) {
      message.textContent = "It's a tie!";
    } else {
      changeActivePlayer();
    }
  }

  // space event listeners
  document.querySelectorAll('.space').forEach(space => {
    space.addEventListener('click', playTurn);
  });

  return{checkForWin};

})(player1, player2);
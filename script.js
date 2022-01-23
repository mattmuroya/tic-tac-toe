// draw the grid and assign ids
// add event listener for each space

// |0|1|2|
// |3|4|5|
// |6|7|8|

const gameBoard = (() => {
  // create the board array
  const board = [
    '', '', '',
    '', '', '',
    '', '', '',];
  return{board};
})();

// player factory

const Player = (name, token) => {
  const updateBoard = (spaceId) => {
    gameBoard.board[spaceId] = token;
  };
  return {name, token, updateBoard};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

// game object

const game = ((p1, p2) => {
  let activePlayer = p1;
  const changeActivePlayer = () => activePlayer = activePlayer === p1 ? p2 : p1;
  const playTurn = (e) => {
    activePlayer.updateBoard(e.target.id);
    console.log(gameBoard.board);
    e.target.insertAdjacentHTML('afterbegin', `<p>${activePlayer.token}</p>`);
    e.target.removeEventListener('click', playTurn);
    changeActivePlayer();
  }
  // space event listeners
  document.querySelectorAll('.space').forEach(space => {
    space.addEventListener('click', playTurn);
  });
})(player1, player2);
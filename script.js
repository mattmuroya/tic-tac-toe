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
  
  // draw the board, assign ids, add event listeners
  let grid = document.querySelector('.board');
  for (let i = 0; i < 9; i++) {
      let space = document.createElement('div');
      grid.appendChild(space);
      space.id = i;
      space.className = 'space';
      space.addEventListener('click', (e) => {
        update(e.target.id, game.getActivePlayer().character);
        game.changeActivePlayer();
      })
  }

  const update = (spaceId, playerChar) => {
    board[spaceId] = playerChar;
    document.getElementById(spaceId)
        .insertAdjacentHTML('afterbegin', `<p>${playerChar}</p>`);
  };

  return{board};
})();

// player factory

const Player = (name, character) => {
  const logName = () => {
    console.log(name);
  }
  const logCharacter = () => {
    console.log(character);
  };
  return {name, character, logName, logCharacter};
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

// game object

const game = ((p1, p2) => {
  let activePlayer = p1;
  const getActivePlayer = () => activePlayer;
  const changeActivePlayer = () => activePlayer = activePlayer === p1 ? p2 : p1;
  return {getActivePlayer, changeActivePlayer};
})(player1, player2);
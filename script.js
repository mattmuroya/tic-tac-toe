// draw the grid and assign ids

// |0|1|2|
// |3|4|5|
// |6|7|8|

(function() {
  let board = document.querySelector('.board');
  for (let i = 0; i < 9; i++) {
      let space = document.createElement('div');
      space.id = i;
      space.className = 'space';
      board.appendChild(space);
  }
})();

// game board object 

const gameBoard = (() => {
  const board = [
      '', '', '',
      '', '', '',
      '', '', '',];
  const update = (spaceId, playerChar) => {
    board[spaceId] = playerChar;
    document.getElementById('4')
        .insertAdjacentHTML('afterbegin', `<p>${playerChar}</p>`);
  };
  return{update};
})();

// player factory

const Player = (name, char) => {

};

const Player1 = Player('Player 1', 'X');
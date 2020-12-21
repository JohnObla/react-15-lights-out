import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() };

    this.createBoard = this.createBoard.bind(this);
  }

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.5,
  };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const { nrows, ncols, chanceLightStartsOn } = this.props;
    // const board = [];

    // for (let i = 0; i < ncols; i++) {
    //   for (let j = 0; j < nrows; j++) {
    //     board[i][j] = Math.floor(Math.random()) < chanceLightStartsOn;
    //   }
    // }

    const board = Array.from({ length: ncols }).fill(
      Array.from({ length: nrows })
    );

    const filledBoard = board.map(col =>
      col.map(row => Math.random() < chanceLightStartsOn)
    );

    // TODO: create array-of-arrays of true/false values
    return filledBoard;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    const hasWon = false;
    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    return (
      <div className="Board">
        {this.state.board.map(col => col.map(isLit => <Cell isLit={isLit} />))}
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else
    // TODO
    // make table board
    // TODO
  }
}

export default Board;

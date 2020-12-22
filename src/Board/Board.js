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
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.3,
  };

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    const { nrows, ncols, chanceLightStartsOn } = this.props;

    const board = [];

    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      board.push(row);
    }

    return board;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    const { ncols, nrows } = this.props;
    const board = [...this.state.board];
    const [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    // win when every cell is turned off
    const hasWon = board.every(row => row.every(isLit => !isLit));

    this.setState({ board, hasWon });
  }

  /** Render game board or winning message. */

  render() {
    if (this.state.hasWon) {
      return (
        <div>
          <span className="neon">You</span>
          <span className="flux">Win!</span>
        </div>
      );
    }

    const tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      const row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(
          <Cell
            key={`${y}-${x}`}
            coord={`${y}-${x}`}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe={this.flipCellsAround}
          />
        );
      }
      tblBoard.push(<tr>{row}</tr>);
    }

    return (
      <div>
        <div>
          <span className="neon neon-flux">Lights</span>
          <span className="flux neon-flux">Out</span>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else
  }
}

export default Board;

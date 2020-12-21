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

    const board = Array.from({ length: ncols }).fill({
      coord: null,
      isLit: Array.from({ length: nrows }),
    });

    const filledBoard = board.map((col, colIndex) => {
      return col.isLit.map((row, rowIndex) => {
        return {
          coord: `${colIndex}-${rowIndex}`,
          isLit: Math.random() < chanceLightStartsOn,
        };
      });
    });

    return filledBoard;
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    const { ncols, nrows } = this.props;
    const board = [...this.state.board];
    const [y, x] = coord.split('-').map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x].isLit = !board[y][x].isLit;
      }
    }

    flipCell(y, x);
    flipCell(y + 1, x);
    flipCell(y - 1, x);
    flipCell(y, x + 1);
    flipCell(y, x - 1);

    // win when every cell is turned off
    // TODO: determine is the game has been won

    const hasWon = board.every(col => col.every(cell => !cell.isLit));

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

    return (
      <div>
        <div>
          <span className="neon neon-flux">Lights</span>
          <span className="flux neon-flux">Out</span>
        </div>
        <table className="Board">
          <tbody>
            {this.state.board.map((col, colIndex) => (
              <tr key={colIndex}>
                {col.map(cell => (
                  <Cell
                    key={cell.coord}
                    coord={cell.coord}
                    isLit={cell.isLit}
                    flipCellsAroundMe={this.flipCellsAround}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    // if the game is won, just show a winning msg & render nothing else
    // TODO
  }
}

export default Board;

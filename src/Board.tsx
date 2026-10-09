import './Board.css'
import Square from "./Square";
import type { Coordinates } from './Game';

type BoardProps = {
  blackisNext : boolean
  onPlay: Function
  Squares: Array<Array<string | null>>
  OverTurn: Function
}

function Board({blackisNext, Squares, onPlay, OverTurn} : BoardProps) {

    function SquareClick(index: number) {
      const coordinates: Coordinates = {
        y : Math.floor(index / 8),
        x : index % 8
      }

      const array: Coordinates[] = OverTurn(Squares, blackisNext, coordinates)

      const target = (blackisNext) ? "canBlack" : "canWhite"
      if (Squares[coordinates.y][coordinates.x] != target) return

      if (array.length <= 0) return
      let next = Squares.map((row) => [...row])
      array.forEach((e) => {
        next[e.y][e.x] = (blackisNext) ? "black" : "white"
      })
      next[coordinates.y][coordinates.x] = blackisNext ? "black" : "white"
      onPlay(next);
    }

    return (
        <div>
          <h3>次は{(blackisNext) ? "黒です" : "白です"}</h3>
          <div className='board-row'>
            <Square value={Squares[0][0]} onSquareClick={() => SquareClick(0)}/>
            <Square value={Squares[0][1]} onSquareClick={() => SquareClick(1)}/>
            <Square value={Squares[0][2]} onSquareClick={() => SquareClick(2)}/>
            <Square value={Squares[0][3]} onSquareClick={() => SquareClick(3)}/>
            <Square value={Squares[0][4]} onSquareClick={() => SquareClick(4)}/>
            <Square value={Squares[0][5]} onSquareClick={() => SquareClick(5)}/>
            <Square value={Squares[0][6]} onSquareClick={() => SquareClick(6)}/>
            <Square value={Squares[0][7]} onSquareClick={() => SquareClick(7)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[1][0]} onSquareClick={() => SquareClick(8)}/>
            <Square value={Squares[1][1]} onSquareClick={() => SquareClick(9)}/>
            <Square value={Squares[1][2]} onSquareClick={() => SquareClick(10)}/>
            <Square value={Squares[1][3]} onSquareClick={() => SquareClick(11)}/>
            <Square value={Squares[1][4]} onSquareClick={() => SquareClick(12)}/>
            <Square value={Squares[1][5]} onSquareClick={() => SquareClick(13)}/>
            <Square value={Squares[1][6]} onSquareClick={() => SquareClick(14)}/>
            <Square value={Squares[1][7]} onSquareClick={() => SquareClick(15)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[2][0]} onSquareClick={() => SquareClick(16)}/>
            <Square value={Squares[2][1]} onSquareClick={() => SquareClick(17)}/>
            <Square value={Squares[2][2]} onSquareClick={() => SquareClick(18)}/>
            <Square value={Squares[2][3]} onSquareClick={() => SquareClick(19)}/>
            <Square value={Squares[2][4]} onSquareClick={() => SquareClick(20)}/>
            <Square value={Squares[2][5]} onSquareClick={() => SquareClick(21)}/>
            <Square value={Squares[2][6]} onSquareClick={() => SquareClick(22)}/>
            <Square value={Squares[2][7]} onSquareClick={() => SquareClick(23)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[3][0]} onSquareClick={() => SquareClick(24)}/>
            <Square value={Squares[3][1]} onSquareClick={() => SquareClick(25)}/>
            <Square value={Squares[3][2]} onSquareClick={() => SquareClick(26)}/>
            <Square value={Squares[3][3]} onSquareClick={() => SquareClick(27)}/>
            <Square value={Squares[3][4]} onSquareClick={() => SquareClick(28)}/>
            <Square value={Squares[3][5]} onSquareClick={() => SquareClick(29)}/>
            <Square value={Squares[3][6]} onSquareClick={() => SquareClick(30)}/>
            <Square value={Squares[3][7]} onSquareClick={() => SquareClick(31)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[4][0]} onSquareClick={() => SquareClick(32)}/>
            <Square value={Squares[4][1]} onSquareClick={() => SquareClick(33)}/>
            <Square value={Squares[4][2]} onSquareClick={() => SquareClick(34)}/>
            <Square value={Squares[4][3]} onSquareClick={() => SquareClick(35)}/>
            <Square value={Squares[4][4]} onSquareClick={() => SquareClick(36)}/>
            <Square value={Squares[4][5]} onSquareClick={() => SquareClick(37)}/>
            <Square value={Squares[4][6]} onSquareClick={() => SquareClick(38)}/>
            <Square value={Squares[4][7]} onSquareClick={() => SquareClick(39)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[5][0]} onSquareClick={() => SquareClick(40)}/>
            <Square value={Squares[5][1]} onSquareClick={() => SquareClick(41)}/>
            <Square value={Squares[5][2]} onSquareClick={() => SquareClick(42)}/>
            <Square value={Squares[5][3]} onSquareClick={() => SquareClick(43)}/>
            <Square value={Squares[5][4]} onSquareClick={() => SquareClick(44)}/>
            <Square value={Squares[5][5]} onSquareClick={() => SquareClick(45)}/>
            <Square value={Squares[5][6]} onSquareClick={() => SquareClick(46)}/>
            <Square value={Squares[5][7]} onSquareClick={() => SquareClick(47)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[6][0]} onSquareClick={() => SquareClick(48)}/>
            <Square value={Squares[6][1]} onSquareClick={() => SquareClick(49)}/>
            <Square value={Squares[6][2]} onSquareClick={() => SquareClick(50)}/>
            <Square value={Squares[6][3]} onSquareClick={() => SquareClick(51)}/>
            <Square value={Squares[6][4]} onSquareClick={() => SquareClick(52)}/>
            <Square value={Squares[6][5]} onSquareClick={() => SquareClick(53)}/>
            <Square value={Squares[6][6]} onSquareClick={() => SquareClick(54)}/>
            <Square value={Squares[6][7]} onSquareClick={() => SquareClick(55)}/>
          </div>
          <div className='board-row'>
            <Square value={Squares[7][0]} onSquareClick={() => SquareClick(56)}/>
            <Square value={Squares[7][1]} onSquareClick={() => SquareClick(57)}/>
            <Square value={Squares[7][2]} onSquareClick={() => SquareClick(58)}/>
            <Square value={Squares[7][3]} onSquareClick={() => SquareClick(59)}/>
            <Square value={Squares[7][4]} onSquareClick={() => SquareClick(60)}/>
            <Square value={Squares[7][5]} onSquareClick={() => SquareClick(61)}/>
            <Square value={Squares[7][6]} onSquareClick={() => SquareClick(62)}/>
            <Square value={Squares[7][7]} onSquareClick={() => SquareClick(63)}/>
          </div>
        </div>
    )
}

export default Board
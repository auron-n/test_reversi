import { useState } from 'react'
import Board from './Board';
import './Board.css'

const createInitialBoard = (): (string | null)[][] => {
  let board = Array.from({ length: 8 }, () => Array(8).fill(null));

  board[3][3] = "white";
  board[3][4] = "black";
  board[4][3] = "black";
  board[4][4] = "white";

  return board;
};

export type Coordinates = {
  x: number;
  y: number;
}

function Game() {
  const [currentMove, SetcurrentMove] = useState(0)
  const blackisNext = currentMove % 2 === 0
  const [history, SetHistory] = useState<(string | null)[][][]>([
    CheckCanPlace(createInitialBoard(), !blackisNext)
  ]);
  const [Black, SetBlack] = useState(2)
  const [White, SetWhite] = useState(2)
  const [Winner, SetWinner] = useState('')
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: Array<Array<string | null>>) {
    const nextTurnIsBlack = blackisNext;
    let isBothPath = false

    let checkedSquares = CheckCanPlace(nextSquares, nextTurnIsBlack);

    let canPlaceCount = checkedSquares.flat().filter(cell => cell === "canBlack" || cell === "canWhite").length;

    let nextHistory: (string | null)[][][]

    if (canPlaceCount === 0) {
      //次を飛ばした先を調べる
      let checkedSquaresPassed = CheckCanPlace(nextSquares, !nextTurnIsBlack)
      let canPlaceCountPassed = checkedSquaresPassed.flat().filter(cell => cell === "canBlack" || cell === "canWhite").length;

      if (canPlaceCountPassed === 0) {
        isBothPath = true; //どちらもパス、ゲーム終了
      }

      //二つ分更新
      nextHistory = [...history.slice(0, currentMove + 1), checkedSquares, checkedSquaresPassed];
    } else {
      // パスもなく、普通に更新
      nextHistory = [...history.slice(0, currentMove + 1), checkedSquares]
    }

    SetHistory(nextHistory);
    SetcurrentMove(nextHistory.length - 1);

    let Blacknum = 0;
    let Whitenum = 0;
    checkedSquares.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "black") Blacknum++;
        if (cell === "white") Whitenum++;
      });
    });

    SetBlack(Blacknum)
    SetWhite(Whitenum)

    const isFull = (Blacknum + Whitenum === 64)
    const isWipedOut = (Blacknum === 0 || Whitenum === 0)

    if (isFull || isWipedOut || isBothPath) {
      if (Blacknum > Whitenum) {
        SetWinner("黒の勝ち！");
      } else if (Whitenum > Blacknum) {
        SetWinner("白の勝ち！");
      } else {
        SetWinner("引き分け");
      }
    }
  }

  function CheckCanPlace(Squares: Array<Array<string | null>>, blackisNext: boolean): Array<Array<string | null>>{
    let checkdSquares = Squares.map(row => [...row])
    for (let y = 0; y < Squares.length; y++) {
      for (let x = 0; x < Squares[0].length; x++) {
        if (checkdSquares[y][x] == "black" || checkdSquares[y][x] == "white") continue
        const array: Coordinates[] = GetOverTurn(Squares, !blackisNext, {x: x, y: y})
        if (array.length <= 0) {
          checkdSquares[y][x] = null
        } else {
          checkdSquares[y][x] = (blackisNext) ? 'canWhite' : 'canBlack'
        }
      }
    }
    return checkdSquares
  }

  function GetOverTurn(nowBoard: (string | null)[][], blackisNext: boolean, index: Coordinates): Array<Coordinates> {
      let result = new Array<Coordinates>();
      const target = (blackisNext) ? 'white'  : 'black'
      const finishTarget = (blackisNext) ? 'black'  : 'white'
      for (let changey = -1 ; changey < 2; changey++) {
        for (let changex = -1 ; changex < 2; changex++) {
          if (changey === 0 && changex === 0) continue;
          const candidate: Coordinates[] = [];
          let currentX = index.x;
          let currentY = index.y;
          let checkdone = false

          while(!checkdone) {
            currentX += changex
            currentY += changey
            if (currentX < 0 || currentX >= nowBoard[0].length ||
                currentY < 0 || currentY >= nowBoard.length) {
              break
            }

            const currentCell = nowBoard[currentY][currentX];

            if (currentCell === target) {
              candidate.push({ x: currentX, y: currentY });
            } else if (currentCell === finishTarget) {
              result.push(...candidate);
              checkdone = true
            } else {
              checkdone = true
            }
          }
        }
      }
      return result;
    }

  function ReStart() {
    if (Winner === '') return
    SetHistory([
      CheckCanPlace(createInitialBoard(), !blackisNext)
    ])
    SetBlack(2)
    SetWhite(2)
    SetcurrentMove(0)
    SetWinner('')
  }

  return (
    <>
      <div className='Game'>
        <Board blackisNext={blackisNext} Squares={currentSquares} onPlay={handlePlay} OverTurn={GetOverTurn}/>
        <div className='score-board'>
          <p className='score-item'>黒：{Black}個</p>
          <p className='score-item'>白：{White}個</p>
          <p className='score-item'>勝者：{Winner}</p>
          <button onClick={ReStart}>{(Winner === '') ? 'プレイ中' : '最初から' }</button>
        </div>
      </div>
    </>
  );
}

export default Game
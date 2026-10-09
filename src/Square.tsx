import './Square.css'

type SquareProps = {
  value: String | null;
  onSquareClick: () => void;
};

function Square({value, onSquareClick}: SquareProps) {
  return (
    <>
      <div className='square' onClick={onSquareClick}>
        <div className={`${value}`}></div>
      </div>
    </>
  )
}

export default Square
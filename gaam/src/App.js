import { useState, useCallback } from 'react';
import './App.css';
import { Piece } from './Piece';

function App() {
    const [pieces, setPieces] = useState([{ x: 2, y: 2 }]);

    const handleClick = useCallback((event) => {
        const x = event.clientX;
        const y = event.clientY;
        pieces.push({ x, y });
        setPieces([...pieces]);
    }, [pieces]);

    return (
        <div className="App" onClick={handleClick}>
            {pieces.map((piece) => <Piece x={piece.x} y={piece.y} />)}
            {/* <Piece /> */}
        </div>
    );
}

export default App;

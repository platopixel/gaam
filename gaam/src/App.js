import { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [shake, setShake] = useState(false);
    const imageRef = useRef(null);

    const toggleShake = () => {
        // Force a reflow/repaint
        if (imageRef.current) {
            imageRef.current.style.animation = 'none';
            imageRef.current.offsetWidth; // Trigger reflow/repaint
            imageRef.current.style.animation = null;
        }

        setShake(true);
        setTimeout(() => setShake(false), 500); // Duration of the shake animation
    };

  return (
    <div className="App">
      <header className="App-header">
        <div onClick={toggleShake}>
            <img src={logo} className={`App-logo no-select ${shake ? 'shake-animation': ''}`} ref={imageRef} />
        </div>
      </header>
    </div>
  );
}

export default App;

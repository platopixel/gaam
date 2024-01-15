import './Piece.css';

import { useState, useRef, useEffect, useCallback } from "react";
import logo from './logo.svg';
import { useViewport } from './useViewport';

const X_ACCELERATION = 1.03;
const Y_ACCELERATION = 1.02;
const MAX_VELOCITY = 4;

export const Piece = () => {
    const [shake, setShake] = useState(false);
    const [style, setStyle] = useState({ left: 2, top: 2 });
    const imageRef = useRef(null);
    const requestRef = useRef(null);
    const previousTimeRef = useRef(null);

    const { viewportWidth, viewportHeight } = useViewport();

    const movePiece = useCallback((deltaTime) => {
        const currentLeft = style?.left;
        const currentTop = style?.top;
        if (currentLeft > viewportWidth || currentTop > viewportHeight) {
            setStyle({ left: 2, top: 2 })
        } else {
            if ((currentLeft * X_ACCELERATION) - currentLeft >= MAX_VELOCITY) {
                setStyle({ left: currentLeft + MAX_VELOCITY, top: currentTop * Y_ACCELERATION });
            } else {
                setStyle({ left: currentLeft * X_ACCELERATION, top: currentTop * Y_ACCELERATION });
            }
        }
    }, [style]);
    
    const animate = useCallback((time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;
            movePiece(deltaTime)
          }
          previousTimeRef.current = time;
          requestRef.current = requestAnimationFrame(animate);
    }, [movePiece]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);

    const toggleShake = () => {
        // Force a reflow/repaint
        if (imageRef.current) {
            imageRef.current.style.animation = 'none';
             // Trigger reflow/repaint
             // eslint-disable-next-line no-unused-expressions
            imageRef.current.offsetWidth; // eslint-ignore
            imageRef.current.style.animation = null;
        }

        setShake(true);
        setTimeout(() => setShake(false), 500); // Duration of the shake animation
    };

    return (
        <div className={`Piece`} style={style} onClick={toggleShake}>
            <img src={logo} className={`App-logo no-select ${shake ? 'shake-animation': ''}`} ref={imageRef} />
        </div>
    )
}
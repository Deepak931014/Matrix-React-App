// src/Matrix.js
import React, { useState } from 'react';
import './Matrix.css';

const Matrix = () => {
  const initialMatrix = Array(3).fill().map(() => Array(3).fill('white'));
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickOrder, setClickOrder] = useState([]);

  const handleClick = (row, col) => {
    if (matrix[row][col] === 'white') {
      const newMatrix = matrix.map((r, rowIndex) => 
        r.map((color, colIndex) => 
          rowIndex === row && colIndex === col ? 'green' : color
        )
      );
      setMatrix(newMatrix);
      setClickOrder([...clickOrder, { row, col }]);
      
      // If it's the last box clicked, change all to orange in sequence
      if (clickOrder.length === 8) {
        setTimeout(() => {
          clickOrder.forEach((click, index) => {
            setTimeout(() => {
              setMatrix(prevMatrix => {
                const newMatrix = prevMatrix.map((r, rowIndex) =>
                  r.map((color, colIndex) =>
                    rowIndex === click.row && colIndex === click.col ? 'orange' : color
                  )
                );
                return newMatrix;
              });
            }, index * 300); // Change color in sequence
          });
          setTimeout(() => {
            setMatrix(prevMatrix => {
              const newMatrix = prevMatrix.map((r, rowIndex) =>
                r.map((color, colIndex) =>
                  rowIndex === row && colIndex === col ? 'orange' : color
                )
              );
              return newMatrix;
            });
          }, clickOrder.length * 300);
        }, 500);
      }
    }
  };

  return (
    <div className="matrix">
      {matrix.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((color, colIndex) => (
            <div
              key={colIndex}
              className="box"
              style={{ backgroundColor: color }}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Matrix;

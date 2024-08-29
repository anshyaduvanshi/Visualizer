import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { insertionSort } from './components/insertion';
import { bubbleSort } from './components/bubble';
import { mergeSort } from './components/merge';
import { selectionSort } from './components/selection';

function App() {
    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(35); // Default array size
    const [delay, setDelay] = useState(260);
    const [isSorting, setIsSorting] = useState(false);
    const [sortingAlgorithm, setSortingAlgorithm] = useState('insertion');
    const barsRef = useRef([]);

    useEffect(() => {
        createNewArray(arraySize);
    }, [arraySize]);

    useEffect(() => {
        if (barsRef.current.length) {
            // Set the barsRef to the array elements after render
            barsRef.current = barsRef.current.slice(0, arraySize);
        }
    }, [arraySize]);

    const createNewArray = (size) => {
        const newArray = [];
        for (let i = 0; i < size; i++) {
            newArray.push(Math.floor(Math.random() * 250) + 1);
        }
        setArray(newArray);
    };

    const handleSizeChange = (e) => {
        // Ensure array size is within the range of 1 to 56
        const newSize = Math.max(1, Math.min(Number(e.target.value), 56));
        setArraySize(newSize);
    };

    const handleSpeedChange = (e) => {
        setDelay(320 - Number(e.target.value));
    };

    const handleNewArray = () => {
        if (!isSorting) createNewArray(arraySize);
    };

    const waitforme = (milisec) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('');
            }, milisec);
        });
    };

    const startSorting = async () => {
        setIsSorting(true);

        switch (sortingAlgorithm) {
            case 'insertion':
                await insertionSort(barsRef.current, delay, waitforme);
                break;
            case 'bubble':
                await bubbleSort(barsRef.current, delay, waitforme);
                break;
            case 'merge':
                await mergeSort(barsRef.current, 0, barsRef.current.length - 1, delay, waitforme);
                break;
            case 'selection':
                await selectionSort(barsRef.current, delay, waitforme);
                break;
            default:
                break;
        }

        setIsSorting(false);
    };

    return (
        <div className="App">
            <div className='heading'>Sorting Visualizer</div>
            <div className="control-panel">
                <div className="sidebar">
                    <button onClick={handleNewArray} disabled={isSorting}>New Array</button>
                    <button onClick={startSorting} disabled={isSorting}>Start Sorting</button>
                    <button onClick={() => setSortingAlgorithm('insertion')} disabled={isSorting}>
                        Insertion Sort
                    </button>
                    <button onClick={() => setSortingAlgorithm('bubble')} disabled={isSorting}>
                        Bubble Sort
                    </button>
                    <button onClick={() => setSortingAlgorithm('merge')} disabled={isSorting}>
                        Merge Sort
                    </button>
                    <button onClick={() => setSortingAlgorithm('selection')} disabled={isSorting}>
                        Selection Sort
                    </button>
                    <label htmlFor='arr'>Size</label>
                    <input
                        id="arr"
                        type="range"
                        min="35"
                        max="56"
                        value={arraySize}
                        onChange={handleSizeChange}
                        disabled={isSorting}
                    />
                </div>
                <div className="speed-control">
                    <label htmlFor="speed">Speed:</label>
                    <input
                        id="speed"
                        type="range"
                        min="1"
                        max="300"
                        value={320 - delay}
                        onChange={handleSpeedChange}
                        disabled={isSorting}
                    />
                </div>
            </div>
            <div className="bars-container" id="bars">
                {array.map((value, index) => (
                    <div
                        className="bar"
                        key={index}
                        ref={el => barsRef.current[index] = el}
                        style={{ height: `${value * 2}px` }}
                        data-value={value}
                    >
                        <div className="bar-value">{value}</div>
                    </div>
                ))}
            </div>
            
            <span className='n'>By Ansh Yaduvanshi</span>
        </div>
    );
}

export default App;

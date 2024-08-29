// BubbleSort.js
export const bubbleSort = async (bars, delay, waitforme) => {
    console.log('In bubbleSort()');

    for (let i = 0; i < bars.length - 1; i++) {
        console.log('In ith loop');
        let swapped = false; // Track if any elements were swapped

        for (let j = 0; j < bars.length - i - 1; j++) {
            console.log('In jth loop');
            bars[j].style.background = 'blue';
            bars[j + 1].style.background = 'blue';

            await waitforme(delay);

            // Compare values to determine if a swap is needed
            const value1 = parseInt(bars[j].getAttribute('data-value'));
            const value2 = parseInt(bars[j + 1].getAttribute('data-value'));

            if (value1 > value2) {
                console.log('In if condition');
                // Swap bars
                swap(bars[j], bars[j + 1]);
                swapped = true;
            }

            // Revert colors after comparison
            bars[j].style.background = 'cyan';
            bars[j + 1].style.background = 'cyan';
        }

        // If no elements were swapped, the array is already sorted
        if (!swapped) break;

        // Color the last sorted element green
        bars[bars.length - 1 - i].style.background = 'green';
    }

    // Ensure all bars are marked green
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.background = 'green';
    }
};

// Swap function to exchange heights and data-values
const swap = (el1, el2) => {
    console.log('In swap()');
    let tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    let tempValue = el1.getAttribute('data-value');
    el1.setAttribute('data-value', el2.getAttribute('data-value'));
    el2.setAttribute('data-value', tempValue);

    // Update the displayed value inside the bar to match the new height
    if (el1.querySelector('.bar-value')) {
        el1.querySelector('.bar-value').innerText = el1.getAttribute('data-value');
    }
    if (el2.querySelector('.bar-value')) {
        el2.querySelector('.bar-value').innerText = el2.getAttribute('data-value');
    }
};

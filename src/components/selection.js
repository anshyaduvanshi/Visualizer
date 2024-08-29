// Swap function to exchange heights and values
function swap(el1, el2) {
    console.log('In swap()');
    let tempHeight = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = tempHeight;

    let tempValue = el1.getAttribute('data-value');
    el1.setAttribute('data-value', el2.getAttribute('data-value'));
    el2.setAttribute('data-value', tempValue);

    // Update the displayed value inside the bars to match the new heights
    if (el1.querySelector('.bar-value')) {
        el1.querySelector('.bar-value').innerText = parseInt(el1.style.height) / 2; // Adjust if necessary
    }
    if (el2.querySelector('.bar-value')) {
        el2.querySelector('.bar-value').innerText = parseInt(el2.style.height) / 2; // Adjust if necessary
    }
}

// Selection Sort function
export async function selectionSort(bars, delay, waitforme) {
    console.log('In selectionSort()');

    for (let i = 0; i < bars.length; i++) {
        console.log('In ith loop');
        let min_index = i;
        bars[i].style.background = 'blue'; // Highlight the current position

        for (let j = i + 1; j < bars.length; j++) {
            console.log('In jth loop');
            bars[j].style.background = 'red'; // Highlight the element being compared

            await waitforme(delay);

            // Compare values to find the minimum
            const value1 = parseInt(bars[j].getAttribute('data-value'));
            const value2 = parseInt(bars[min_index].getAttribute('data-value'));

            if (value1 < value2) {
                console.log('New minimum found');
                if (min_index !== i) {
                    bars[min_index].style.background = 'cyan'; // Reset previous min color
                }
                min_index = j; // Update min_index to new minimum
            } else {
                bars[j].style.background = 'cyan'; // Revert color
            }
        }

        // Swap bars if a new minimum was found
        if (min_index !== i) {
            await waitforme(delay);
            swap(bars[min_index], bars[i]); // Swap heights and values
        }

        // Color the sorted element green
        bars[i].style.background = 'green';
    }

    // Ensure the last bar is marked as sorted
    bars[bars.length - 1].style.background = 'green';
}

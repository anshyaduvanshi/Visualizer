// insertion.js
export async function insertionSort(bars, delay, waitforme) {
    console.log('In insertionSort()');

    // Set the first element's color to green, as it's sorted by default
    bars[0].style.background = 'green';

    for (let i = 1; i < bars.length; i++) {
        console.log('In ith loop');
        let j = i - 1;
        let key = bars[i].style.height;
        // Change the color of the current element
        bars[i].style.background = 'blue';

        await waitforme(delay);

        // Shift elements of the sorted segment to find the correct position for the key
        while (j >= 0 && (parseInt(bars[j].style.height) > parseInt(key))) {
            console.log('In while loop');
            // Change color to blue for the element being compared
            bars[j].style.background = 'blue';
            bars[j + 1].style.height = bars[j].style.height;

            // Update the value display inside the bar
            if (bars[j + 1].querySelector('.bar-value')) {
                bars[j + 1].querySelector('.bar-value').innerText = parseInt(bars[j].style.height) / 2; // Adjust as necessary
            }

            j--;

            await waitforme(delay);

            // Re-color the sorted section back to green
            for (let k = i; k >= 0; k--) {
                bars[k].style.background = 'green';
            }
        }
        // Place the key in its correct position
        bars[j + 1].style.height = key;

        // Update the value display inside the bar
        if (bars[j + 1].querySelector('.bar-value')) {
            bars[j + 1].querySelector('.bar-value').innerText = parseInt(key) / 2; // Adjust as necessary
        }

        // Color the current element green as it's now in the sorted section
        bars[i].style.background = 'green';
    }
}

// Swap function to exchange heights
function swap(el1, el2) {
    console.log('In swap()');
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

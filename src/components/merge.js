export async function mergeSort(bars, low, high, delay, waitforme) {
    if (low < high) {
        // Find the middle point
        const mid = Math.floor((low + high) / 2);

        // Sort first and second halves
        await mergeSort(bars, low, mid, delay, waitforme);
        await mergeSort(bars, mid + 1, high, delay, waitforme);

        // Merge the sorted halves
        await merge(bars, low, mid, high, delay, waitforme);
    }
}

async function merge(bars, low, mid, high, delay, waitforme) {
    console.log('In merge()');

    // Calculate the lengths of left and right subarrays
    let n1 = mid - low + 1;
    let n2 = high - mid;

    // Create temporary arrays
    let left = new Array(n1);
    let right = new Array(n2);

    // Copy data to temporary arrays left[] and right[]
    for (let i = 0; i < n1; i++) {
        left[i] = bars[low + i].style.height;
    }
    for (let j = 0; j < n2; j++) {
        right[j] = bars[mid + 1 + j].style.height;
    }

    // Merge the temporary arrays back into bars[low..high]
    let i = 0, j = 0, k = low;

    while (i < n1 && j < n2) {
        // Highlight the bars being compared
        bars[k].style.background = 'blue';
        if (i < n1) bars[low + i].style.background = 'red';
        if (j < n2) bars[mid + 1 + j].style.background = 'red';

        await waitforme(delay);

        if (parseInt(left[i]) <= parseInt(right[j])) {
            bars[k].style.height = left[i];
            if (bars[k].querySelector('.bar-value')) {
                bars[k].querySelector('.bar-value').innerText = parseInt(left[i]) / 2; // Update value display
            }
            i++;
        } else {
            bars[k].style.height = right[j];
            if (bars[k].querySelector('.bar-value')) {
                bars[k].querySelector('.bar-value').innerText = parseInt(right[j]) / 2; // Update value display
            }
            j++;
        }
        k++;

        // Revert colors after comparison and update
        bars[k - 1].style.background = 'cyan';
        if (i < n1) bars[low + i].style.background = 'cyan';
        if (j < n2) bars[mid + 1 + j].style.background = 'cyan';

        await waitforme(delay);
    }

    // Copy the remaining elements of left[], if there are any
    while (i < n1) {
        bars[k].style.height = left[i];
        if (bars[k].querySelector('.bar-value')) {
            bars[k].querySelector('.bar-value').innerText = parseInt(left[i]) / 2; // Update value display
        }
        bars[k].style.background = 'blue'; // Highlight the bar being updated
        i++;
        k++;
        await waitforme(delay);
    }

    // Copy the remaining elements of right[], if there are any
    while (j < n2) {
        bars[k].style.height = right[j];
        if (bars[k].querySelector('.bar-value')) {
            bars[k].querySelector('.bar-value').innerText = parseInt(right[j]) / 2; // Update value display
        }
        bars[k].style.background = 'blue'; // Highlight the bar being updated
        j++;
        k++;
        await waitforme(delay);
    }

    // Revert all bars to sorted state
    for (let m = low; m <= high; m++) {
        bars[m].style.background = 'green';
    }
}

// Utility function to create a delay
export function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }); 
}

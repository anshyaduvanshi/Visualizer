// quick.js
export async function partitionLomuto(bars, l, r, delay, waitforme) {
    console.log('In partitionLomuto()');
    let i = l - 1;
    // Color pivot element
    bars[r].style.background = 'red';
    for (let j = l; j <= r - 1; j++) {
        console.log('In partitionLomuto for j');
        // Color current element
        bars[j].style.background = 'yellow';
        await waitforme(delay);

        if (parseInt(bars[j].style.height) < parseInt(bars[r].style.height)) {
            console.log('In partitionLomuto for j if');
            i++;
            swap(bars[i], bars[j]);
            // Color
            bars[i].style.background = 'orange';
            if (i !== j) bars[j].style.background = 'orange';
            await waitforme(delay);
        } else {
            // Color if not less than pivot
            bars[j].style.background = 'pink';
        }
    }
    i++;
    await waitforme(delay);
    swap(bars[i], bars[r]); // Pivot height one
    console.log(`i = ${i}`, typeof(i));
    // Color
    bars[r].style.background = 'pink';
    bars[i].style.background = 'green';
    await waitforme(delay);

    // Color
    for (let k = 0; k < bars.length; k++) {
        if (bars[k].style.background !== 'green') {
            bars[k].style.background = 'cyan';
        }
    }

    return i;
}

export async function quickSort(bars, l, r, delay, waitforme) {
    console.log('In quickSort()', `l=${l} r=${r}`, typeof(l), typeof(r));
    if (l < r) {
        let pivot_index = await partitionLomuto(bars, l, r, delay, waitforme);
        await quickSort(bars, l, pivot_index - 1, delay, waitforme);
        await quickSort(bars, pivot_index + 1, r, delay, waitforme);
    } else {
        if (l >= 0 && r >= 0 && l < bars.length && r < bars.length) {
            bars[r].style.background = 'green';
            bars[l].style.background = 'green';
        }
    }
}

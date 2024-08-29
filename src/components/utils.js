// utils.js

export function swap(el1, el2) {
    console.log('In swap()');
    
    // Swap the heights
    let temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
    
    // Swap the values inside the bars
    let tempText = el1.querySelector('.bar-value').innerText;
    el1.querySelector('.bar-value').innerText = el2.querySelector('.bar-value').innerText;
    el2.querySelector('.bar-value').innerText = tempText;
}

export function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }); 
}

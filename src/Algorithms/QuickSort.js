export function quickSortAnimations(arr){
    const animations = [];
    quickSort(arr, 0, arr.length, animations);
    return animations;
}
function quickSort(arr, start, end, animations){
    if (start >= end) return;
    let p = partition(arr, start, end, animations);
    quickSort(arr, start, p, animations);
    quickSort(arr, p + 1, end, animations);
}
function partition(arr, start, end, animations){
    let k = Math.floor(Math.random() * (end - start)) + start;

    animations.push([start, arr[k], 2]);
    animations.push([k, arr[start], 2]);
    swap(arr, start, k);

    k = start;
    let pivot = arr[k];
    
    animations.push([start, start, 0]);
    for (let i = start + 1; i < end; i++){
        animations.push([i,i, 0]);
        animations.push([i,i, 1]);
        if (arr[i] < pivot){
            k += 1;
            animations.push([i, arr[k], 2]);
            animations.push([k, arr[i], 2]);
            swap(arr, i, k);
        }
    }
    
    animations.push([start, start, 1]);

    animations.push([start, arr[k], 2]);
    animations.push([k, arr[start], 2]);
    swap(arr, start, k);

    return k;
}
function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

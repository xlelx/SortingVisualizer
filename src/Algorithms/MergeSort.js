export function mergeSortAnimations(arr){
    const animations = [];
    const auxArray = arr.slice();
    mergeSort(arr, 0, arr.length - 1, auxArray, animations);
    return animations;
}
function mergeSort(arr, start, end, auxArray, animations){
    if (start === end) return;
    let mid = Math.floor((end + start) / 2);
    mergeSort(auxArray, start, mid, arr, animations);
    mergeSort(auxArray, mid + 1, end, arr, animations);
    merge(arr, start, mid, end, auxArray, animations);
}
function merge(arr, start, mid, end, auxArray, animations){
    let i = start;
    let j = mid + 1;
    let k = start;
    while(i <= mid && j <= end){
        animations.push([i, j, 0]);
        animations.push([i, j, 1]);

        if (auxArray[i] <= auxArray[j]){
            animations.push([k, auxArray[i], 2]);
            arr[k] = auxArray[i];
            k++;
            i++;
        }
        else{
            animations.push([k, auxArray[j], 2]);
            arr[k] = auxArray[j];
            k++;
            j++;
        }
    }
    while(i<= mid){
        animations.push([i, i, 0]);
        animations.push([i, i, 1]);
        animations.push([k, auxArray[i], 2]);
        arr[k] = auxArray[i];
        k++;
        i++;
    }
    while(j<= end){
        animations.push([j,j, 1]);
        animations.push([j,j, 1]);
        animations.push([k, auxArray[j], 2]);
        arr[k] = auxArray[j];
        k++;
        j++;
    }
}
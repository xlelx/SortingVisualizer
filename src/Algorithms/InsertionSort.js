export function insertionSortAnimations(arr){
    const animations = [];
    for (let i = 1; i < arr.length; i++){
        for (let j = i - 1; j >= 0 && arr[j + 1] < arr[j]; j--){
            animations.push([j + 1, j, 0]);
            animations.push([j + 1, j, 1]);

            animations.push([j, arr[j+1], 2]);
            animations.push([j+1, arr[j], 2]);
            swap(arr, j, j+1);
        }
    }
    return animations;
}
function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
export function selectionSortAnimations(arr){
    const animations = [];
    for (let i = 0; i < arr.length; i++){
        let minIndex = i;
        for (let j = i+1; j< arr.length; j++){
            animations.push([j,j,0]);
            animations.push([j,j,1]);
            if (arr[j] < arr[minIndex]){
                minIndex = j;
            } 
        }
        animations.push([i, arr[minIndex], 2]);
        animations.push([minIndex, arr[i], 2]);
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex]= temp;
    }
    return animations;
}
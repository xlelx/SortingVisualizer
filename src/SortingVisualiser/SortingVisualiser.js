import React from 'react';
import './SortingVisualiser.css';
import { mergeSortAnimations } from './../Algorithms/MergeSort';
import { selectionSortAnimations } from './../Algorithms/SelectionSort';
import { quickSortAnimations } from './../Algorithms/QuickSort';
import { insertionSortAnimations } from './../Algorithms/InsertionSort';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

const PRIMARY_COLOR = '#6d6875';
const SECONDARY_COLOR = '#ffcdb2';
const DEF_ARR_SIZE = 100;
const MAX_BAR_HEIGHT = 400;
const ANIMATION_SPEED = 2;

const MERGESORT = 1;
const SELECTIONSORT = 2;
const QUICKSORT = 3;
const INSERTIONSORT = 4;


class SortingVisualiser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            arrSize: 100,
            sorting: false,
            algo: MERGESORT,
        };
        this.resetArray = this.resetArray.bind(this);
        this.sort = this.sort.bind(this);
        this.setArraySize = this.setArraySize.bind(this);
        this.setAlgo = this.setAlgo.bind(this);
        this.changeSortingState = this.changeSortingState.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }
    setArraySize(size) {
        this.setState({ ...this.state, arrSize: size }, () => this.resetArray());
    }

    resetArray() {
        const arr = [];
        console.log(this.state.arrSize);
        for (let i = 0; i < this.state.arrSize; i++) {
            arr.push(Math.floor(Math.random() * MAX_BAR_HEIGHT) + 5);
        }
        this.setState({ ...this.state, arr });
    }
    setAlgo(value){
        this.setState({...this.state, algo: value});
    }
    changeSortingState(){
        let newSorting = this.state.sorting;
        this.setState({...this.state, sorting: !newSorting});
    }
    sort() {
        if (this.state.sorting) return;
        const algo = this.state.algo;
        let animations = [];
        if (algo === MERGESORT) animations = mergeSortAnimations(this.state.arr);
        else if (algo === SELECTIONSORT) animations = selectionSortAnimations(this.state.arr);
        else if (algo === QUICKSORT) animations = quickSortAnimations(this.state.arr);
        else if (algo === INSERTIONSORT) animations = insertionSortAnimations(this.state.arr);
        
        console.log(animations);
        for (let i = 0; i < animations.length; i++) {
            const arrBars = document.getElementsByClassName('arr-bar');
            const actionType = animations[i][2];
            if (actionType !== 2) {
                const [b1, b2, x] = animations[i];
                const color = actionType === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    arrBars[b1].style.backgroundColor = color;
                    arrBars[b2].style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            }
            else {
                setTimeout(() => {
                    const [b1, height, x] = animations[i];
                    arrBars[b1].style.height = `${height}px`;
                }, i * ANIMATION_SPEED)

            }
        }
    }
      

    render() {
        return (
            <div className='main'>
                <div id="wrapper">
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ToggleButtonGroup  type="radio" name="algos" defaultValue ={1} className="mr-2" toggle = {true} aria-label="Second group">
                            <Button variant="dark" disabled>Sorting Algorithm</Button>
                            <ToggleButton variant="outline-dark" value={1} onClick={() => this.setAlgo(1)}>Merge Sort</ToggleButton>
                            <ToggleButton variant="outline-dark" value={2} onClick={() => this.setAlgo(2)}>Selection Sort</ToggleButton>
                            <ToggleButton variant="outline-dark" value={3} onClick={() => this.setAlgo(3)}>Quick Sort</ToggleButton>
                            <ToggleButton variant="outline-dark" value={4} onClick={() => this.setAlgo(4)}>Insertion Sort</ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButtonGroup type="radio" name="arraySize" defaultValue ={1} className="mr-2" aria-label="First group">
                            <Button variant="dark" disabled>Array Size</Button>
                            <ToggleButton variant="outline-dark" value={1} onClick={() => this.setArraySize(100)}>100</ToggleButton>
                            <ToggleButton variant="outline-dark" value={2} onClick={() => this.setArraySize(150)}>150</ToggleButton>
                            <ToggleButton variant="outline-dark" value={3} onClick={() => this.setArraySize(200)}>200</ToggleButton>
                        </ToggleButtonGroup>
                        <ButtonGroup aria-label="Third group">
                            <Button variant="light" onClick={() => this.sort()}>Sort</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className='arr-container'>
                    {
                        this.state.arr.map((value, i) => (
                            <div
                                className="arr-bar"
                                key={i}
                                style={{
                                    backgroundColor: PRIMARY_COLOR,
                                    height: `${value}px`
                                }}></div>
                        ))
                    }
                </div>
            </div>
        )
    }
}



export default SortingVisualiser;
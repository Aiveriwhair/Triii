/*
    Fully developed by William ISABELLE
    April 2022
*/

class Visualizer{
    constructor(data, speed, canvas){
        this.data = data;
        this.speed = speed;
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvas.getContext("2d");

        this.ctx.canvas.width  = container.offsetWidth;
        this.ctx.canvas.height =  container.offsetHeight;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
    }

    draw(){
        this.ctx.clearRect(0 , 0,this.width, this.height);
        let step = Math.floor(this.width / this.data.length);
        let heightFactor = Math.floor(this.height / Math.max(...this.data));
        let x = 0;
        for(let i = 0; i < this.data.length; i++){
            this.ctx.fillStyle = 'rgba(0, 0, 255, 1)';
            this.ctx.fillRect(x, 0, step-3, this.data[i] * heightFactor);
            x+= step;
        }
    }

    drawIndexColor(index, color){
        let step = Math.floor(this.width / this.data.length);
        let heightFactor = Math.floor(this.height / Math.max(...this.data));
        let x = 0;
        for(let i = 0; i < this.data.length; i++){
            if (i === index){
                this.ctx.fillStyle = color;
                this.ctx.fillRect(x, 0, step-3, this.data[i] * heightFactor);
            }
            x+= step;
        }
    }

    selectionSort(){
        let i = 0;
        let anim = setInterval(() => {
            let min = i;
            for (let j = i + 1; j < this.data.length; j++) {
                if (this.data[j] < this.data[min]) {
                    min = j;
                    this.draw();
                }
                this.drawIndexColor(i, 'rgba(0,255,255,1)');
                this.drawIndexColor(j, 'rgba(255,255,0,1)');
            }
            if (min !== i) {
                [this.data[i], this.data[min]] = [this.data[min], this.data[i]];
            }
            this.draw();
            i++;
            if(i == this.data.length){
                unlockInputs();
                document.querySelector('#anim-btn').disabled = false;
                document.querySelector('#anim-btn').checked = false;
                clearInterval(anim);
            }
        }, this.speed);
    }

    insertionSort(){
        let i = 1;
        let anim = setInterval(() => {
            for(let j = i - 1; j > -1; j--){
                if(this.data[j + 1] < this.data[j]){    
                    [this.data[j+1],this.data[j]] = [this.data[j],this.data[j + 1]];
                    this.draw();
                }
            }
            i++;
            if(i == this.data.length){
                unlockInputs();
                document.querySelector('#anim-btn').disabled = false;
                document.querySelector('#anim-btn').checked = false;
                clearInterval(anim);
            }
        }, this.speed);
    }

    bubbleSort(){
        let i = 1;
        let anim = setInterval(() => {
            for(let j = i - 1; j > -1; j--){
                if(this.data[j + 1] < this.data[j]){
                    [this.data[j+1],this.data[j]] = [this.data[j],this.data[j + 1]];
                }
                this.draw();
            }
            i++;
            if(i == this.data.length){
                unlockInputs();
                document.querySelector('#anim-btn').disabled = false;
                document.querySelector('#anim-btn').checked = false;
                clearInterval(anim);
            }
        }, this.speed);
    }
}

/* GLOBAL FUNCTIONS */
function GenRandomArray(size){
    const data = [];
    for(let i = 0; i < nbVal; i++){
        data.push(Math.floor(Math.random() * 100));
    }
    return data;    
}
function lockInputs(){
    document.querySelector('#speed-value-slider').disabled = true;
    document.querySelector('#generate-button').disabled = true;
}
function unlockInputs(){
    document.querySelector('#generate-button').disabled = false;
    document.querySelector('#speed-value-slider').disabled = false;
    
}
function playAnim(choice){
    if (choice == 'Insertion')
        viz.insertionSort();
    else if (choice == 'Bubble')
        viz.bubbleSort();
    else if (choice == 'Selection')
        viz.selectionSort();
}
function isSorted(data){
    for(let i = 0; i < data.length - 1; i++){
        if(data[i] > data[i + 1])
            return false;
    }
    return true;
}


/* SETUP */
var sortChoice = 'Bubble';
document.querySelector('#btn-bubble').style.color = 'red';
var nbVal = document.querySelector('#speed-value-slider').value;
var speed = 200 - nbVal;
var canv = document.getElementById('canvas');
var container = document.querySelector('.canvas-container');
var data = GenRandomArray(nbVal);
var viz = new Visualizer(data, speed, canv);
viz.draw();


/* EVENTS LISTENERS */
document.querySelector('#speed-value-slider').addEventListener('input', () =>{
    nbVal = document.querySelector('#speed-value-slider').value;
    speed = 200 - nbVal;
    data = GenRandomArray(nbVal); 
    viz = new Visualizer(data, speed, canv);
    viz.draw();
} )


document.querySelector('#generate-button').addEventListener('click', () =>{
    data = GenRandomArray(nbVal); 
    viz = new Visualizer(data, speed, canv);
    viz.draw();   
})

document.querySelector('#anim-btn').addEventListener('change', () =>{
    document.querySelector('#anim-btn').disabled = true;
    lockInputs();
    if(!isSorted(viz.data))
        playAnim(sortChoice);
    else{
        unlockInputs();
        document.querySelector('#anim-btn').disabled = false;
        document.querySelector('#anim-btn').checked = false;
    }
})

window.addEventListener('resize', () =>{
    viz.ctx.clearRect(0,0, viz.ctx.width, viz.ctx.height);
    viz.ctx.canvas.width  = container.offsetWidth;
    viz.ctx.canvas.height =  container.offsetHeight;
    viz.width = viz.ctx.canvas.width;
    viz.height = viz.ctx.canvas.height; 
    viz.draw();
})

document.querySelector('#btn-insertion').addEventListener('click', () => {
    sortChoice = 'Insertion';
    document.querySelector('#btn-insertion').style.color = 'red';
    document.querySelector('#btn-selection').style.color = 'black';
    document.querySelector('#btn-bubble').style.color = 'black';
})

document.querySelector('#btn-selection').addEventListener('click', () => {
    sortChoice = 'Selection';
    document.querySelector('#btn-selection').style.color = 'red';
    document.querySelector('#btn-bubble').style.color = 'black';
    document.querySelector('#btn-insertion').style.color = 'black';
})

document.querySelector('#btn-bubble').addEventListener('click', () => {
    sortChoice = 'Bubble';
    document.querySelector('#btn-bubble').style.color = 'red';
    document.querySelector('#btn-insertion').style.color = 'black';
    document.querySelector('#btn-selection').style.color = 'black';
})













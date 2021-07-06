const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const size = 1000;
const scale = size/100;
const resolution = size / scale;
let cells=[];
let quantity = 0;
let timer;

setup();

function setup(){
    canvas.width = size;
    canvas.height = size;
    ctx.scale(scale, scale);
    ctx.fillStyle = 'black';
    cells = createCells();
}

function createCells(){
    let arr = new Array(resolution);//arr(100)
    for(let x = 0; x < resolution; x++){
        let cols = new Array(resolution);//all cols are false
        for(let y = 0; y < resolution; y++){
            cols[y] = false;
        }
        arr[x] = cols;
    }
    return arr;
}


canvas.onclick = function (event) {
    let x = event.offsetX;
    let y = event.offsetY;
    console.log(x,y);
    x = Math.floor(x/scale); 
    y = Math.floor(y/scale);
    console.log(x, y)
    cells[y][x] = true;
    console.log(cells);
    drawField(); 
}

function drawField(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, resolution, resolution);
    ctx.fillStyle = 'black';
    for(let x = 0; x < resolution; x++){
        for(let y = 0; y < resolution; y++){
            if(cells[y][x]){
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}


function step (){
    let newCells = createCells();
    for (let x = 0; x < resolution; x++){
        for (let y = 0; y < resolution; y++){
            let count = 0;
            if(cells[fpm(x)-1][y] == 1) count++;//up
            if(cells[x][fpp(y)+1] == 1) count++;//reight
            if(cells[fpp(x)+1][y]) count++;//bottom
            if(cells[x][fpm(y)-1] == 1) count++;//left
            if(cells[fpm(x)-1][fpp(y)+1] == 1) count++;
            if(cells[fpp(x)+1][fpp(y)+1] == 1) count++;
            if(cells[fpp(x)+1][fpm(y)-1] == 1) count++;
            if(cells[fpm(x)-1][fpm(y)-1] == 1) count++;

            if (cells[x][y] && count >= 2 && count <= 3) newCells[x][y] = true;
            else if (!cells[x][y] && count === 3) newCells[x][y] = true;
        }
    }

    cells = newCells;
    drawField();
    quantity++;
    document.getElementById('quantity').innerHTML = quantity;
    timer = setTimeout(step, 100);
}

function fpm(i){
    if(i == 0) return resolution ;//100
    else return i;
}

function fpp(i){
    if(i == resolution - 1) return 0;
    else return i;
}

document.getElementById('start').onclick = step;


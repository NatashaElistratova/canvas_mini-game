var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var score = document.getElementById('score');

var repeater;
var squares = [];

canvas.onmousedown = canvasClick;

startButton.addEventListener("click", function (){
		for(var i=0;i<100;i++){
			addSquare();
		};
		repeater = requestAnimationFrame(createItem);
		score.value = 0;
});

stopButton.addEventListener("click", function (){
		cancelAnimationFrame(repeater);
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
		squares = [];
});

function getColor(){
	return '#'+ Math.floor(Math.random()*16777215).toString(16);
};

function getRandomNum(min, max){
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
};

function Square(xPos, yPos, step, color){
	this.xPos = xPos;
	this.yPos = yPos;
	this.step = step;
	this.color = color;	
};

function addSquare() {
	var xPos = getRandomNum(0,620);
	var yPos = getRandomNum(-5000,0);
	var step = getRandomNum(1,4);
	var color = getColor();
    
    var square = new Square(xPos, yPos, step, color);
	squares.push(square);
};

function createItem(){
		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
			
	for(var i=0; i<squares.length; i++){
		var square = squares[i];
		
		ctx.fillRect(square.xPos, square.yPos, 20, 20);
		ctx.fillStyle = square.color;
		square.yPos += square.step; 
		
	};
 	
  repeater = requestAnimationFrame(createItem);
};


function canvasClick(e) {
  var clickX = e.pageX - canvas.offsetLeft;
  var clickY = e.pageY - canvas.offsetTop;

  for(var i in squares){
    var square = squares[i];
	
    if ((clickX > (square.xPos-20)) && (clickX < (square.xPos+20))){
      if ((clickY > (square.yPos-20)) && (clickY < (square.yPos+20))){
		  
		squares.splice(i, 1);
        var a = +score.value;
		a+=1;
		score.value = a;
		
        return;
      };
    };
  };
};

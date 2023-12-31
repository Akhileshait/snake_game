let inputDir = {x:0, y:0};
const foodsound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const music = new Audio('music.mp3');
let speed = 10;
let lastPaintTime = 0;
let snakeArr = [{x:13, y:15}];
let food = {x:10, y:5}
let score=0;
//Game functions
function main(ctime){
      window.requestAnimationFrame(main);
      // console.log(ctime);
      if((ctime - lastPaintTime)/1000<1/speed){
            return;
      }
      lastPaintTime =ctime;
      gameEngine();
      
}


function isCollide(snake){
      for (let i = 1; i < snakeArr.length; i++) {
            if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
                  return true;
            }
      }
            if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
                  return true;
            }
}

function gameEngine(){
      //Updating the Snake Array & food
      
      if(isCollide(snakeArr)){
            gameOver.play();
            inputDir = {x:0, y:0};
            alert("Game Over. Press any key to play again!")
            snakeArr = [{x:13, y:15}];
            // music.play();
            score=0;
      }
      // If food eaten then increment the score
      if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
            snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y})
            let a = 2, b = 16;
            food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
            score++;
                  for (let i = 1; i < snakeArr.length; i++) {
                        if(snake[i].x === food.x && snake[i].y === food.y){
                              food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
                              i=1;
                        }
            }
            
      }
      scor.innerHTML=score;
      //Moving the snake
      
      for(let i=snakeArr.length-2; i>=0; i--){
            snakeArr[i+1] = {...snakeArr[i]};
      }

      snakeArr[0].x+=inputDir.x;
      snakeArr[0].y+=inputDir.y;
      // Display the snake and food
      board.innerHTML = "";
      snakeArr.forEach((e, index)=>{
      snakeElement = document.createElement('div');
      snakeElement.style.gridRowStart = e.y;
      snakeElement.style.gridColumnStart = e.x;
      if(index === 0){
            snakeElement.classList.add('head');
      }else{
            snakeElement.classList.add('snake');
      }
      board.appendChild(snakeElement);
      });

      //Display the food
      foodElement = document.createElement('div');
      foodElement.style.gridRowStart = food.y;
      foodElement.style.gridColumnStart = food.x;
      foodElement.classList.add('food');
      board.appendChild(foodElement);

}





window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
      //Start the game
      moveSound.play();
      switch (e.key){
            case "ArrowUp":
                  if(inputDir.y !== 1){
                        inputDir.y = -1;
                  }
                  inputDir.x = 0;
                  break;
            case "ArrowDown":
                  inputDir.x = 0;
                  if(inputDir.y !== -1){
                        inputDir.y = 1;
                  }
                  break;
            case "ArrowLeft":
                  if(inputDir.x !== 1){
                        inputDir.x = -1;
                  }
                  inputDir.y = 0;
                  break;
            case "ArrowRight":
                  if(inputDir.x !== -1){
                        inputDir.x = 1;
                  }
                  inputDir.y = 0;
                  break;
            default:
                  break;
      }
      
})
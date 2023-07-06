(function(){
    let canvas;
    let context2d;
    let wallSize=10;
    let snake = [];
    let dx = 0;
    let dy = 0;
    let pauseGame = true;
    let food = {x:0,y:0,color:"white"};
    let points = 0;
    let mainObstacle = {x:0,y:0,color:"white"};
    let secondMainObstacle = {x:0,y:0};
    let sideObstacles = [];
    
   
    

    /*function getRandomInt(max){
        //randomowe określenie barwy, pozycji etc.
        return Math.floor(Math.random()* max);
    };
    // pozycja na planszy i kolor
    function drawRectRandomColor(x,y,width, height){
        context2d.fillStyle = `rgb(${getRandomInt(255)},
             ${getRandomInt(255)},${getRandomInt(255)})`;

             context2d.fillRect(x,y,width, height);
    };*/

    function clearCanvas(){

        context2d.fillStyle = "black";
        //fill rect pobierze wartość z fillstyle
        context2d.fillRect(0,0, canvas.width, canvas.height);
    };

    function makeSnake(snakeLenght){
        for(let i = 0;i<snakeLenght;i++){
            // i*wallsize określenie pozycji początkowej snake'a
            let x = canvas.width/2+i*wallSize;
            let y = canvas.height/2;
            snake.push({x:x,y:y});
        }
    };

    function drawSnake(){
        for(i=1;i<snake.length;i++){
            

            context2d.strokeStyle = "green";
            context2d.lineWidth = 5;
            context2d.lineJoin = "bevel";
            context2d.strokeRect(snake[i].x,snake[i].y,wallSize,wallSize);   
        };
        function drawHead(){
            context2d.strokeStyle = "yellow";
            context2d.lineWidth = 5;
            context2d.lineJoin = "bevel";
            context2d.strokeRect(snake[0].x,snake[0].y,wallSize,wallSize);
        };
        drawHead();

    };

    function resetGame(){

        snake = [];
        sideObstacles = [];
        mainObstaclePosition();
        makeSideObstacles();
        makeSnake(3);
        snakeFood();
        pauseGame = true;
        points = "0";

    };

    function moveSnake(dx,dy){

        let headX= snake[0].x+dx;
        let headY= snake[0].y+dy;
        //wrzuca na początek tablicy głowę z przesunięciem węża
        snake.unshift({x:headX,y:headY});
        //podczas ruchu o jednostkę ruchu usuwa ostani"segment węża" z tablicy, przez co widać ruch węża o niezmieny segment
        snake.pop();


    };


    function snakeFood(){

        function randV(min,max){
            return Math.floor((Math.random()*(max-min)+min)/wallSize)*wallSize;
        };

        let colors = ["yellow","blue","green","orange"];

        //zabezpieczenie żeby jedzenie nie pojawiło się w punkcie (0,0)

        food.x = randV(20,canvas.width-20);
        food.y = randV(20,canvas.height-20);
        food.color = colors[Math.floor(Math.random()*colors.length)];

    };

 

    function checkWallsCollisions(){
        snake.forEach(function(el){
            if(el.x>canvas.width||el.x<0||el.y>canvas.height||el.y<0){
                resetGame();
            };
        })
    };



    function drawFood(){
        context2d.fillStyle = food.color;
        context2d.fillRect(food.x,food.y,wallSize,wallSize);
    };

    function checkFoodColisions(){
        if(food.x==snake[0].x&&food.y==snake[0].y){
            //przypisanie ostatniego segmentu węża do całości węża
          snake.push(Object.assign({}, snake[snake.length-1]));
          snakeFood();
          points++;
        }
    };
        //sprawdza kolizje węża ze sobą 
    function checkSnakeColision(){
        for(let i = 1;i<snake.length;i++){
                let a = i;
            if(snake[0].x==snake[a].x&&snake[0].y==snake[a].y){
                resetGame();
            };
        };
    };
// Naliczanie punktów;
    function drawPoints(){
        context2d.font = "20px Arial";
        context2d.fillStyle = "white";
        context2d.fillText("Points: "+points, 10, 20);

    };
// Stworzenie przeszkód
    function mainObstaclePosition(){

        function randX(min,max){
            return Math.floor((Math.random()*(max-min)+min)/wallSize)*wallSize;
        };
        // Początek przeszkody główny punkt, jako punkt odniesienia

        mainObstacle.x = randX(180,370);
        mainObstacle.y = randX(30,220);

        secondMainObstacle.x = randX(30,210);
        secondMainObstacle.y = randX(180,370);
    };

   

    function drawObstacle(){
        context2d.fillStyle = mainObstacle.color;
        context2d.fillRect(mainObstacle.x,mainObstacle.y,wallSize,wallSize);

        context2d.fillStyle = secondMainObstacle.color;
        context2d.fillRect(secondMainObstacle.x,secondMainObstacle.y,wallSize,wallSize);

     

    };
        //Stworzenie przeszkód satelitów
            function makeSideObstacles(){
                if(mainObstacle.x>0&&mainObstacle.x<=200&&mainObstacle.y>0
                    &&mainObstacle.y<=200){
                        let x = mainObstacle.x+10;
                        let y = mainObstacle.y+10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = mainObstacle.x+10;
                        let y1 = mainObstacle.y;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = mainObstacle.x-10;
                        let y2 = mainObstacle.y+0;
                    sideObstacles.push({x:x2,y:y2});
                }else if(mainObstacle.x>=200&&mainObstacle.x<400
                    &&mainObstacle.y>=200&&mainObstacle.y<400){
                        let x = mainObstacle.x-10;
                        let y = mainObstacle.y-10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = mainObstacle.x-10;
                        let y1 = mainObstacle.y;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = mainObstacle.x-10;
                        let y2 = mainObstacle.y+10;
                    sideObstacles.push({x:x2,y:y2});
                }else if(mainObstacle.x>0&&mainObstacle.x<=200&&
                    mainObstacle.y>=200&&mainObstacle.y<400){
                        let x = mainObstacle.x+10;
                        let y = mainObstacle.y-10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = mainObstacle.x;
                        let y1 = mainObstacle.y-10;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = mainObstacle.x;
                        let y2 = mainObstacle.y+10;
                    sideObstacles.push({x:x2,y:y2});
                }else if(mainObstacle.x>=200&&mainObstacle.x<400
                    &&mainObstacle.y>0&&mainObstacle.y<=200){
                        let x = mainObstacle.x-10;
                        let y = mainObstacle.y+10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = mainObstacle.x;
                        let y1 = mainObstacle.y+10;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = mainObstacle.x;
                        let y2 = mainObstacle.y-10;
                    sideObstacles.push({x:x2,y:y2});
                };

                // 2 przeszkoda

                if(secondMainObstacle.x>0&&secondMainObstacle.x<=200&&secondMainObstacle.y>0
                    &&secondMainObstacle.y<=200){
                        let x = secondMainObstacle.x+10;
                        let y = secondMainObstacle.y+10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = secondMainObstacle.x+10;
                        let y1 = secondMainObstacle.y;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = secondMainObstacle.x-10;
                        let y2 = secondMainObstacle.y+0;
                    sideObstacles.push({x:x2,y:y2});
                }else if(secondMainObstacle.x>=200&&secondMainObstacle.x<400
                    &&secondMainObstacle.y>=200&&secondMainObstacle.y<400){
                        let x = secondMainObstacle.x-10;
                        let y = secondMainObstacle.y-10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = secondMainObstacle.x-10;
                        let y1 = secondMainObstacle.y;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = secondMainObstacle.x-10;
                        let y2 = secondMainObstacle.y+10;
                    sideObstacles.push({x:x2,y:y2});
                }else if(secondMainObstacle.x>0&&secondMainObstacle.x<=200&&
                    secondMainObstacle.y>=200&&secondMainObstacle.y<400){
                        let x = secondMainObstacle.x+10;
                        let y = secondMainObstacle.y-10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = secondMainObstacle.x;
                        let y1 = secondMainObstacle.y-10;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = secondMainObstacle.x;
                        let y2 = secondMainObstacle.y+10;
                    sideObstacles.push({x:x2,y:y2});
                }else if(secondMainObstacle.x>=200&&secondMainObstacle.x<400
                    &&secondMainObstacle.y>0&&secondMainObstacle.y<=200){
                        let x = secondMainObstacle.x-10;
                        let y = secondMainObstacle.y+10;
                    sideObstacles.push({x:x,y:y});
                        let x1 = secondMainObstacle.x;
                        let y1 = secondMainObstacle.y+10;
                    sideObstacles.push({x:x1,y:y1});
                        let x2 = secondMainObstacle.x;
                        let y2 = secondMainObstacle.y-10;
                    sideObstacles.push({x:x2,y:y2});
                };
            };

            function drawSideObstacles(){
                sideObstacles.forEach(function(el){;
                    context2d.fillRect(el.x,el.y,wallSize,wallSize);
                })
            };



    function checkObstaclesColision(){
        for(i=0;i<sideObstacles.length;i++){
            let x = sideObstacles[i].x;
            let y = sideObstacles[i].y;
        if(snake[0].x==mainObstacle.x&&snake[0].y==mainObstacle.y){
            resetGame();
        }else if(snake[0].x==secondMainObstacle.x&&snake[0].y==secondMainObstacle.y){
            resetGame();
        }else if(snake[0].x==x&&snake[0].y==y){
            resetGame();
        }}

        if(food.x==mainObstacle.x&&food.y==mainObstacle.y){
            food.x+50;
            food.y+50;
        }else if(food.x==secondMainObstacle.x&&food.y==secondMainObstacle.y){
            food.x+50;
            food.y+50;
        };
    };


   
    function keyDown(e){

        if(pauseGame){
            pauseGame = false;
        }

        switch(e.keyCode){

            case 37://left
            case 65://a
                dy = 0;
                dx = -10;
                break;

            case 39://right
            case 68://d
                dy = 0;
                dx = 10;

                break;
            case 38://up
            case 87://w
                dy = -10;
                dx = 0;
                break;

            case 40://down
            case 83://s
                dy = 10;
                dx = 0;
                break;


        };

    }

    function startApp(){
        canvas = document.getElementById("canvas");
        //dostęp do funkcji 2d
        context2d = canvas.getContext("2d");
        document.addEventListener("keydown",keyDown);

       

       

        resetGame();

        setInterval(function(){

            clearCanvas();
            checkWallsCollisions();
            checkFoodColisions();
            checkSnakeColision();
            checkObstaclesColision();
            if(!pauseGame)moveSnake(dx,dy);
            drawPoints();
            drawSideObstacles();
            drawSnake();
            drawFood();
            drawObstacle();
            
            
            
            
           
        },75);

    }

    window.onload = startApp;

})();
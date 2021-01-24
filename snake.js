let canvas=document.querySelector('canvas');

let width=900;
let height=500;
let score=0;

let apple=new Image();
apple.src='apple.png';
// console.log(apple);

let gameover_sound=new Audio('sound/game_over.mp3');
let score_sound=new Audio('sound/snake.mp3');

canvas.width=width;
canvas.height=height;


let speed=100;
let ctx=canvas.getContext('2d');
let ctx_2=canvas.getContext('2d');
// ctx_2.fillRect(0,0,50,50);
// ctx_2.drawImage(apple.src,0,0);

let unit=20;

ctx.fillStyle='green';

// constructor 
function pos(x,y)
{
    this.x=x;
    this.y=y;
}

let pos_x=Math.floor(Math.random()*700);
let pos_y=Math.floor(Math.random()*550);

pos_x-=pos_x%unit;
pos_y-=pos_y%unit;

let fruit_x,fruit_y;

let snake=[];
for(let i=0;i<=4;i++)
{
    snake.push(new pos(pos_x,pos_y));
    pos_x+=unit;
    // pos_y+=unit;
    // console.log(snake);
}


show();
show_fruit();

// apple.onload=() => ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);

window.addEventListener('keydown',arrow);

let my_req;
let turn='false';
let play=true;

function arrow(event){
    
    // console.log(event.code);
    let key=event.code;
    let num=event.keyCode;
    console.log(num);
    if(play){

        if((key=='KeyW' || num==38) && turn!='down')
        {
            turn='up';
            clearInterval(my_req);
            my_req=setInterval(up,speed);
            // apple.onload=() => { my_req=setInterval(up,speed);}
            // up();
        }
        else if((key=='KeyS' || num==40) && turn!='up')
        {
            turn='down';
            clearInterval(my_req);
            // apple.onload=() => { my_req=setInterval(up,speed);}
            my_req=setInterval(down,speed);
            // down();
        }
        else if((key=='KeyD' || num==39) && turn !='left')
        {
            turn='right';
            clearInterval(my_req);
            // apple.onload=() => { my_req=setInterval(up,speed);}
            my_req=setInterval(right,speed);
            // right();
        }
        else if((key=='KeyA' || num==37) && turn!='right')
        {
            turn='left';
            clearInterval(my_req);
            // apple.onload=() => { my_req=setInterval(up,speed);}
            my_req=setInterval(left,speed);
            // left();
        }
    }

}

function show(){
    
    ctx.fillStyle='green';
    let i=0;
    for(i=0;i<snake.length;i++)
    {
        ctx.fillRect(snake[i].x,snake[i].y,20,20);
        ctx.strokeStyle='cornsilk';
        ctx.strokeRect(snake[i].x,snake[i].y,20,20);
    }
}

function show_fruit()
{
    // apple.onload=() => {

        // ctx.drawImage(apple)
        ctx_2.fillStyle='black';
        fruit_x=Math.floor(Math.random()*700);
        fruit_y=Math.floor(Math.random()*550);
        fruit_x-=fruit_x%unit;
        fruit_y-=fruit_y%unit;
        ctx_2.fillRect(fruit_x,fruit_y,20,20);
        
        // ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);
    //}
}

// apple.onload=() => setInterval(show_fruit,200);

function update_score()
{

    score_sound.play();
    let doc=document.querySelector('#score');
    doc.innerHTML=score;
}

function game_over()
{
    // console.log(snake);
    gameover_sound.play();
    let doc=document.querySelector('#gameover');
    doc.innerHTML='GAME OVER <br> Restart to Play Again';

    let body=document.querySelector('body');
    body.style.backgroundColor='black';

    let message=document.getElementsByTagName("h1");
    // console.log(message);
    for(let i=0;i<message.length;i++)
    message[i].style.color='red';
}

function up()
{
    let last=snake[snake.length-1];
    let tmp=new pos(last.x,last.y-unit);
    check(tmp)
    if((snake[snake.length-1].y-unit)<0)
    {
        // console.log(tmp);
        play=false;
        game_over();
        clearInterval(my_req);
    }
    else
    {
        let first=snake[0];
        snake.shift();
        // let last=snake[snake.length-1];
        snake.push(new pos(last.x,last.y-unit));
        
        last=snake[snake.length-1];
        if(last.x==fruit_x && last.y==fruit_y)
        {
            score+=1;
            snake.unshift(first);
            update_score();

            // apple.onload=() => 
            show_fruit();
            while(check_fruit(fruit_x,fruit_y))
            {
                show_fruit();
            }
            // ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);
        }
        else{
            ctx.clearRect(first.x,first.y,20,20);
            // ctx.strokeStyle=''
            // ctx.strokeRect(first.x,first.y,20,20);
        }
        show();
        
    }
    // console.log('UP');
}

function down()
{
    let last=snake[snake.length-1];
    let tmp=new pos(last.x,last.y+unit);
    check(tmp);
    // last.y+=unit;
    // console.log(snake[snake.length-1]);
    if(snake[snake.length-1].y+unit>=height)
    {
        play=false;
        game_over();
        clearInterval(my_req);
    }
    else
    {
        let first=snake[0];
        snake.shift();
    
        snake.push(new pos(last.x,last.y+unit));
        
        last=snake[snake.length-1];
        if(last.x==fruit_x && last.y==fruit_y)
        {
            score+=1;
            update_score();
            snake.unshift(first);
            // apple.onload=
            show_fruit();
            while(check_fruit(fruit_x,fruit_y))
            {
                show_fruit();
            }
            // apple.onload=() => ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);
        }
        else{
            ctx.clearRect(first.x,first.y,20,20);
        }
        show();
    }

    // console.log('DOWN');
}

function right()
{
    let last=snake[snake.length-1];
    let tmp=new pos(last.x+unit,last.y);
    check(tmp);
    // last.x+=unit;
    if(snake[snake.length-1].x+unit>=width)
    {
        play=false;
        game_over();
        clearInterval(my_req);
    }
    else
    {
        // console.log('RIGHT');
        let first=snake[0];
        snake.shift();
        
        snake.push(new pos(last.x+unit,last.y));
        last=snake[snake.length-1];
        if(last.x==fruit_x && last.y==fruit_y)
        {
            score+=1;
            update_score();
            snake.unshift(first);
            // apple.onload=
            show_fruit();
            while(check_fruit(fruit_x,fruit_y))
            {
                show_fruit();
            }
            // apple.onload=() => ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);
        }
        else{
            ctx.clearRect(first.x,first.y,20,20);
        }
        show();
    }
}

function left()
{
    let last=snake[snake.length-1];
    let tmp=new pos(last.x-unit,last.y);
    check(tmp);
    // last.x-=unit;
    if((snake[snake.length-1].x-unit)<0)
    {
        play=false;
        game_over();
        clearInterval(my_req);
    }
    else
    {
        let first=snake[0];
        snake.shift();
    
        snake.push(new pos(last.x-unit,last.y));
        
        last=snake[snake.length-1];
        if(last.x==fruit_x && last.y==fruit_y)
        {
            score+=1;
            update_score();
            snake.unshift(first);
            // apple.onload=
            show_fruit();
            while(check_fruit(fruit_x,fruit_y))
            {
                show_fruit();
            }
            // apple.onload=() => ctx_2.drawImage(apple,fruit_x,fruit_y,20,20);
        }
        else{
            ctx.clearRect(first.x,first.y,20,20);
        }

        show();
    }
    // console.log('LEFT');
}

function check_fruit(m,n)
{
    for(let i=0;i<snake.length;i++)
    {
        if(snake[i].x==m && snake[i].y==n)
        {
            return true;
        }
    }
    return false;
}

function check(node){
    let flag=0;
    for(let i=0;i<snake.length;i++)
    {
        if(snake[i].x==node.x && snake[i].y==node.y)
        {

            flag=1;
            break;
        }
    }
    if(flag)
    {
        play=false;
        game_over();
        clearInterval(my_req);
    }
}

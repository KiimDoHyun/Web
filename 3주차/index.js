/*
var i=0; //function scope
let j=1; //block scope var 보단 let 사용 추천
const h=2;

console.log(i, j, h);

i=10;
j=20;
//h=30;

console.log(i, j, h); //const 는 상수라서 변경이불가능 하기 때문에 h 때문에 오류발생

var i =10;
var ten = "10";

if(i === ten) {
    console.log("동일함\n");
}
else {
    console.log("다름");
}

*/


let button = document.querySelector("#btn");

const d = document.querySelector("#div");

let date = new Date();

function clickBtn(msg) {
    let newDiv = document.createElement("div");

    
    //생성, 스타일 변경등은 부착하기 전에
    newDiv.innerHTML = new Date().getSeconds() + '초';
    
    newDiv.style.fontSize = "100px";

    let interval = setInterval(() => {
        let hour = new Date().getHours();
        let resultHour = hour < 10 ? '0' + hour : hour;
        let min = new Date().getMinutes();
        let resultMin = min<10 ? '0' + min :  min;
        let sec = new Date().getSeconds();
        let resultSec = sec<10 ? '0' + sec : sec;
        let result = resultHour + '시' + resultMin + '분' + resultSec + '초';

        newDiv.innerHTML = result;

     }, 1000);

    //부착은 마지막에
    d.appendChild(newDiv);

    //let interval = setInterval(() => {newDiv.innerHTML = new Date().getSeconds() }, 1000);

    //clearInterval(interval);

    //console.log(`${date.getSeconds()}` + '초');

}

//main 의 기능.
function init(){
    //button 객체를 가져와서 클릭 했을때의 이벤트를 추가함

    //함수가 짧으면 => 형식으로 아래처럼 짧게 작성가능
    //button.addEventListener("click", ()=>{console.log("click")});

    //매개변수 전달 
    button.addEventListener("click", () => clickBtn("ooo"));
    
    //함수호출
    //button.addEventListener("click", clickBtn());

    //console.log(date.getSeconds());
    //setInterval(()=>{console.log(new Date().getSeconds()) }, 1000 );
    //setInterval(()=>{console.log(new Date().getSeconds()) }, 1000 );
}

//매개변수의 전달?
init();

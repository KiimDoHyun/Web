/*c
onst e = require("express");

const ul = document.createElement('ul');

document.body.appendChild(ul);

let arr = ["li1","li2","li3","li4","li5","li6","li7","li8","li9","li10",];

function conLog(e) {
    console.log(e.target.innerHTML);
}

function A() {
    arr.forEach(element => {
        let newLi = document.createElement('li');
        newLi.innerHTML = element;

        newLi.addEventListener('click', conLog);

        ul.appendChild(newLi);
    });
}

A();
*/

// 빨간 상자 잡고 끌었을때 위치 변하고 자표 변하고

// e.clientX -> 내 x 좌표
// e.clientY -> 내 y 좌표

let x;
let y;
let newDiv = document.getElementById("div");

function on(e) {
    e.target.addEventListener('mousemove', move)
    x = e.clientX;
    y = e.clientY;
    //newDiv.style.top = "100px";

    console.log("처음 위치 " + x + "," + y);
}

function move(e) {
    e.target.innerHTML = e.clientX +"," + e.clientY;

    newDiv.style.top = e.clientY - y + "px";
    newDiv.style.left = e.clientX - x + "px";

    console.log("현재 위치 " + e.clientX + "," + e.clientY);

    e.target.addEventListener('mouseup', end)
}

function end(e) {
    e.target.removeEventListener('mousemove', move)
}

div.addEventListener('mousedown', on);
//시계
const deg = 6;

const hr = document.getElementById("hr")
const mn = document.getElementById("mn");
const sc = document.getElementById("sc");
const ct = document.getElementById("clockText");

//리스트
const pending = document.getElementById('pending');
const finished = document.getElementById('finished');

//로그인
const loginform = document.getElementById('loginform');
const main = document.getElementById('main');
const idInput = document.getElementById('id');
const intel = document.getElementById('intel');
let id;

//버튼
const btAdd = document.getElementById('add');
const pendingDel = document.getElementById('pendingDel');
const finishedDel = document.getElementById('finishedDel');
const clear = document.getElementById('clear');
const pendingMove = document.getElementById('pendingMove');
const finishedMove = document.getElementById('finishedMove');
const login = document.getElementById('login');
const goMain = document.getElementById('goMain');
const goBack = document.getElementById('goBack');

//리스트
//여기에 저장하고, 불러오고
//값
let p = [];
let f = [];

//리스트 그 자체
let liPending = [];
let liFinished = [];

let arrP = JSON.parse(localStorage.getItem("p"));
let arrF = JSON.parse(localStorage.getItem("f"));

//각 버튼 기능 추가
btAdd.onclick = add;
pendingDel.onclick = delP;
finishedDel.onclick = delF;
clear.onclick = clr;
pendingMove.onclick = moveP;
finishedMove.onclick = moveF;
login.onclick = logIn;
goMain.onclick = Main;
goBack.onclick = back;

//시간 
setInterval(() => {
    //아날로그 시계
    let day = new Date();
    let hh = day.getHours() * 30;
    let mm = day.getMinutes() * deg;
    let ss = day.getSeconds() * deg;
    
    hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
    mn.style.transform = `rotateZ(${mm}deg)`;
    sc.style.transform = `rotateZ(${ss}deg)`;
    
    //텍스트
    let hour = new Date().getHours();
    let resultHour = hour < 10 ? '0' + hour : hour;
    let min = new Date().getMinutes();
    let resultMin = min<10 ? '0' + min :  min;
    let sec = new Date().getSeconds();
    let resultSec = sec<10 ? '0' + sec : sec;
    let result = resultHour + '`' + resultMin + '`' + resultSec;
    
    ct.innerHTML = result;
})

//로그인
function logIn() {
    if(!localStorage.getItem("id")) {
        loginform.style.display = "flex";
        main.style.display = "none";
    }
    else {
        login.textContent = "login"
        alert(id + "님 로그아웃 되셨습니다.");
        localStorage.removeItem("id");
        intel.textContent = "Guest 님 환영합니다.";
    }
}

function Main() {
    let value = document.getElementById('id').value;
    if(value === "") {
        alert("닉네임을 입력하세요");
        return;
    }

    else {
        id = value;
        alert(id + "님 환영합니다.");
        localStorage.setItem("id",JSON.stringify(id));
        loginform.style.display = "none";
        main.style.display = "inline";
        login.textContent = "logout"
        intel.textContent = id + "님 환영합니다.";
        document.getElementById('id').value = "";
    }
}

function back() {
    loginform.style.display = "none";
    main.style.display = "inline";
}

//리스트
function show() {
    p.forEach(element => {
        let newLi = document.createElement('li');
        liPending.push(newLi);
        let value = element;
        newLi.innerHTML = value;
        pending.appendChild(newLi);
    });

    f.forEach(element => {
        let newLi = document.createElement('li');
        liFinished.push(newLi);
        let value = element;
        newLi.innerHTML = value;
        finished.appendChild(newLi);
    })
}

//버튼

//추가
function add(){
    console.log("Pending 추가")
    let newLi = document.createElement('li');
    liPending.push(newLi);
    console.log(liPending);
    //입력값 가져오기
    let value = document.getElementById('input').value;

    //Add 눌리면 값 비우기
    document.getElementById('input').value = "";

    //값이 있을때만 추가
    if(value === ""){
        alert("입력값이 없습니다.");
        return;
    }
    else {
        p.push(value);
        localStorage.setItem("p",JSON.stringify(p));
        newLi.innerHTML = value;
    }

    pending.appendChild(newLi);

    console.log(p.length);
}

//삭제
function delP(){
    if(p.length - 1 < 0) {
        alert('더이상 삭제 할수 없습니다.');
        return;
    }
    else {
        pending.removeChild(liPending[p.length - 1]);
        liPending.pop();
        p.pop();
        localStorage.setItem("p",JSON.stringify(p));
    }
}

function delF(){
    if(f.length - 1 < 0) {
        alert('더이상 삭제 할수 없습니다.');
        return;
    }
    else {
        finished.removeChild(liFinished[f.length - 1]);
        liFinished.pop();
        f.pop();
        localStorage.setItem("f",JSON.stringify(f));
    }
}

//이동
function moveP() {
    if(p.length - 1 < 0) {
        alert('더이상 넘길수 없습니다.');
        return;
    }

    else {
        f.push(p[p.length-1]);
        localStorage.setItem("f",JSON.stringify(f));
        delP();

        let newLi = document.createElement('li');
        liFinished.push(newLi);
        newLi.innerHTML = f[f.length-1];
        finished.appendChild(newLi);
    }
}

function moveF() {
    if(f.length -1 < 0) {
        alert('더이상 넘길수 없습니다.');
        return;
    }

    else {
        p.push(f[f.length-1]);
        localStorage.setItem("p",JSON.stringify(p));
        delF();
    
        let newLi = document.createElement('li');
        liPending.push(newLi);
        newLi.innerHTML = p[p.length-1];
        pending.appendChild(newLi);
    }
}

//초기화
function clr() {
    liPending.forEach(element => {
        pending.removeChild(element);
    });

    liFinished.forEach(element => {
        finished.removeChild(element);
    });

    liPending = [];
    liFinished = [];
    p = [];
    f = [];

    localStorage.removeItem("p");
    localStorage.removeItem("f");
    localStorage.removeItem("id");

    alert("초기화");
    init();

    show();
}

//로컬 스토리지에서 가져오기.
function init() {
    if(!localStorage.getItem("p") && !localStorage.getItem("f") ) {
        localStorage.setItem("p",JSON.stringify(p));
        localStorage.setItem("f",JSON.stringify(f));
    }

    else {
    p = JSON.parse(localStorage.getItem("p"));
    f = JSON.parse(localStorage.getItem("f"));

    if(!localStorage.getItem("id")) {
        intel.textContent = "Guest 님 환영합니다.";
    }
    else {
        id = JSON.parse(localStorage.getItem("id"));
        login.textContent = "logout"
        intel.textContent = id + "님 환영합니다.";
    }
    show();
    }
}

init();
//이동
let moveMonth = 0;
let moveYear = 0;

//현재 년도
let year = "";

//현재 달
let month = "";

//현재 달의 시작 요일
let monthFirstDay = "";

//현재 달의 마지막 요일, 날짜
let monthLastDay = "";
let monthLastDate = "";

//현재 요일
let day = "";

//텍스트
let dayList = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");

//현재 날짜
let date = "";

//현재 년도 + 달(달력 상단에 띄울 정보)
let ymInfo = "";

//날짜 객체
let d = new Date();

//html 에서 가져올 태그
//왼쪽
let buttonLeft = document.querySelector("#btnLeft");

//오른쪽
let buttonRight = document.querySelector("#btnRight");

//달력 테이블
let calenderTable = document.querySelector(".tableBody");

let showDay = document.querySelector(".showDay");
let showDate = document.querySelector(".showDate");

//시계
let clock = document.querySelector(".clock");

//달력 내용 추가
let newRow="";
let newCell="";

//눌렀을때 색변화
let cur = "";
let bef = "";

//오른쪽
function clickRight(){
    d = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate());
    getDate();
    makeCalnder();
}

//왼쪽
function clickLeft(){
    d = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
    getDate();
    makeCalnder();
}

//날짜 입력(색, 아이디 부여)
function draw(j,num) {

    //나중에 눌러서 요일찾을때 아이디로 찾게 아이디를 요일로 줌
    newCell.setAttribute("id",dayList[j]);
    if(j===0){
        newCell.innerHTML = "<font color=tomato>" + num++;
    }
    else if(j===6) {
        newCell.innerHTML = "<font color=skyblue>" + num++;
    }
    else {
        newCell.innerHTML = num++;
    }
}

//달력 그리는 함수
function makeCalnder() {

    //지우기
    while(calenderTable.rows.length) {
        calenderTable.deleteRow(calenderTable.rows.length-1)
    }

    //변수 초기화
    let num = 1;

    //그리기
    for(let i=0; i<6; i++) {
        newRow = calenderTable.insertRow();

        for(let j=0; j<7; j++){
            newCell = newRow.insertCell();

            //첫주
            if(i===0){
                if(j < monthFirstDay) {
                    newCell.innerHTML = "";
                }
                else{
                    draw(j,num++);
                }
            }

            //해당 달의 일수 만큼 날짜를 채우고 나머지는 빈칸으로
            else {
                if(num <= monthLastDate) {
                    draw(j,num++);
                }
                else {
                    newCell.innerHTML = "";
                }
            }
        }
    }
}

//날짜 정보를 가져올 함수
function getDate() {

    year = d.getFullYear() + moveYear;
    month = d.getMonth() + moveMonth + 1;
    day = d.getDay();
    date = d.getDate();

    day = dayList[day];
    showDay.textContent = day;
    showDate.textContent = date;

    ymInfo = year + "년 " + month + "월";

    //월말, 월초
    first = new Date(d.getFullYear(), d.getMonth(), 1);
    last = new Date(d.getFullYear(), d.getMonth()+1, 0);

    monthFirstDay = first.getDay();
    monthLastDay = last.getDay();
    monthLastDate = last.getDate();

    //달력의 년도,월 정보 갱신
    document.getElementById("calendarInfo").innerHTML = ymInfo;
}

//달력 눌렀을때 해당 날짜 표시
//같은데 또 누르면 원래대로
//cur 랑 bef 로 현재, 이전 누른값 비교해서 색 변경
function showInfo(e) {
    cur = e.target;
    let dNum = Number(cur.textContent);
    if(dNum != 0){
        showDay.textContent = e.target.id;
        showDate.textContent = dNum;

        //처음 누른 경우
        if(bef === ""){
            cur.style.backgroundColor = "tomato";
            bef = cur;
        }

        //두번째 이상
        else {
            if(cur === bef) {
                cur.style.backgroundColor = "white"
                bef = ""
            }
            else {
                cur.style.backgroundColor = "tomato";
                bef.style.backgroundColor = "white";
                bef = cur;
            }
        }
    }
}

function init() {
    let newDiv = document.createElement("div");
    let interval = setInterval(() => {
        let hour = new Date().getHours();
        let resultHour = hour < 10 ? '0' + hour : hour;
        let min = new Date().getMinutes();
        let resultMin = min<10 ? '0' + min :  min;
        let sec = new Date().getSeconds();
        let resultSec = sec<10 ? '0' + sec : sec;
        let result = resultHour + '시 ' + resultMin + '분 ' + resultSec + '초';
        newDiv.innerHTML = result;
    }, 1000);
    clock.appendChild(newDiv);

    getDate();
    makeCalnder();
    buttonLeft.addEventListener("click", clickLeft);
    buttonRight.addEventListener("click", clickRight);
    calenderTable.addEventListener("click", showInfo);
}

init();
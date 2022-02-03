let calendar = document.querySelector("#calendar");
let body = calendar.querySelector(".body");
let prev = calendar.querySelector(".prev");
let next = calendar.querySelector(".next");
let info = calendar.querySelector(".info");

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

draw(body, year, month);

next.addEventListener("click", showNextMonth);
prev.addEventListener("click", showPrevMonth);

function showNextMonth() {
  month += 1;
  if (month > 11) {
    month = 0;
    year += 1;
  }
  draw(body, year, month);
}
function showPrevMonth() {
  month -= 1;
  if (month < 0) {
    month = 11;
    year -= 1;
  }
  draw(body, year, month);
}

function range(count) {
  const numbers = [];
  for (let i = 1; i <= count; i += 1) {
    numbers.push(i);
  }
  return numbers;
}

function getLastDayMonth(year, month) {
  let date = new Date(year, month + 1, 0).getDate();
  return range(date);
}

function getFirstWeekDay(year, month) {
  let date = new Date(year, month, 1);

  return date.getDay();
}
function getLastWeekDay(year, month) {
  let date = new Date(year, month + 1, 0);

  return date.getDay();
}

function normalize(arr, left, right) {
  if (right !== 0) {
    right = 7 - right;
  }
  if (left !== 0) {
    left -= 1;
  } else {
    left = 6;
  }

  for (let i = 0; i < left; i += 1) {
    arr.unshift("");
  }
  for (let i = 0; i < right; i += 1) {
    arr.push("");
  }
  return arr;
}

function chunk(arr, n) {
  let weekIndx = 0;
  let newArr = [];
  let helper = [];
  for (let i = 0; i < arr.length; i += 1) {
    helper.push(arr[i]);
    weekIndx += 1;
    if (weekIndx === n) {
      newArr.push(helper);
      helper = [];
      weekIndx = 0;
    }
  }
  return newArr;
}

function createTable(parent, arr) {
  parent.innerHTML = "";
  let trCollection = [];

  for (let i = 0; i < arr.length; i += 1) {
    const tr = document.createElement("tr");
    for (let j = 0; j < arr[i].length; j += 1) {
      let td = document.createElement("td");
      td.textContent = arr[i][j];
      tr.append(td);
    }
    trCollection.push(tr);
  }
  parent.append(...trCollection);
}
function draw(body, year, month) {
  let arr = getLastDayMonth(year, month);
  let firstWeekDay = getFirstWeekDay(year, month);
  let lastWeekDay = getLastWeekDay(year, month);

  let numbers = normalize(arr, firstWeekDay, lastWeekDay);
  numbers = chunk(numbers, 7);
  createTable(body, numbers);
  info.textContent = getCurrentDate();
}

function getCurrentDate() {
  var monthArr = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  return `${monthArr[month]} ${year}`;
}

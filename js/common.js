const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

// search요소 누르면 input요소가 focus 되도록
searchEl.addEventListener('click',function () {
  searchInputEl.focus();
});

// input요소가 focus 되어있을때, 
// search요소의 클래스 네임에 focused 추가,
// input요소에 placeholder로 통합검색 문구 추가
searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder','통합검색');
});

// input요소가 blur 되어있을때, 
// search요소의 클래스 네임에 focused 제거,
// input요소에 placeholder로 통합검색 문구 제거
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder','');
});


// FOOTTER에서 올해의 년도 표기하기
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); // 2023
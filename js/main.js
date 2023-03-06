// 1)우측 배지를, scroll 내리면 숨기고, 올리면 보이게 하기
// 2)상단 이동하는 to-top 버튼을, scroll 내리면 보이고, 올리면 숨기기
// lodash에서 제공하는 throttle이라는 기능 사용해서
// 사용자가 화면을 스크롤 할때 실행되는 함수의 개수를 최대한 적게 실행하도록 하기
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// window = 우리의 프로젝트 화면
window.addEventListener('scroll', _.throttle(function () {
  if (window.scrollY > 500) {
    // 배지 숨기기!
    // gsap.to(요소, 지속시간, 옵션); 지속시간은 초단위
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기!
    gsap.to('#to-top', .2, {
      x: 0
    });
  } else {
    // 배지 보이기!
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
// _.throttle(함수, 시간) 시간은 1000=1초

// to-top 버튼을 누르면 상단으로 이동하게 하기
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


// VISUAL section에 음료 하나씩 보이게 하기
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index+1) * .7, // 0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});


// NOTICE section에 notice-line에 공지사항 swiper
// new Swiper(선택자,옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true,
});

// NOTICE section에 promotion에 swiper
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', //기본값
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, // 1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

// AWARDS section에 swiper
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


// 스타벅스 프로모션 옆 아이콘 클릭하면, promotion 영역 전체를 수직으로 닫거나 열도록.
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 유튜브 section에 floating 아이콘 둥둥 떠다니는 애니메이션 적용
function floatingObject(selector, delay, size) {
  // gsap(요소, 지속시간, 옵션);
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5), // 애니메이션 동작 시간 
    { // 옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0,delay)
    }
  );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// ScrollMagic 라이브러리로 원하는 section이 화면에 보여지면 애니메이션 처리
const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 // 뷰포트의 0.8 지점에 걸리면 감시되었다고 판단
    }) 
    .setClassToggle(spyEl, 'show') // (어떤 클래스를 toggle할 그 요소, toggle할 그 클래스 이름)
    .addTo(new ScrollMagic.Controller());
});
// Scene 메서드: ScrollMagic이라는 js라이브러리를 통해서, 특정한 요소를 감시하는 옵션을 지정
// setClasstoggle 메서드: html의 클래스 속성을 무엇인가로 지정. 넣었다뺐다 제어해주는 역할.
// addTo메서드: ScrollMagic이라는 js라이브러리가 필요한 Controller라는 개념의 내용을 추가하기 위해 사용
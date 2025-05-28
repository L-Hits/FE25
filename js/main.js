// 텍스트 작성과 삭제 즉시 실행 함수 - 타이핑 애니메이션 구현
(function () {
  // 텍스트가 표시될 DOM 요소 선택
  const spanEl = document.querySelector("main h2 span");
  // 순환하며 표시될 텍스트 배열
  const txtArr = [
    "Web Publisher",
    "Front-End Developer",
    "Web UI Designer",
    "UX Designer",
    "Back-End Developer",
  ];
  // 현재 표시할 텍스트의 인덱스
  let index = 0;
  // 현재 표시할 텍스트를 한 글자씩 배열로 변환
  let currentTxt = txtArr[index].split("");

  // 텍스트를 한 글자씩 화면에 추가하는 함수
  function writeTxt() {
    // 배열의 첫 번째 글자를 제거하고 화면에 추가
    spanEl.textContent += currentTxt.shift();
    // 표시할 글자가 남아있으면 랜덤한 시간 간격으로 다음 글자 표시
    if (currentTxt.length !== 0) {
      setTimeout(writeTxt, Math.floor(Math.random() * 100)); // 0~100ms 사이 랜덤 간격
    } else {
      // 모든 글자를 표시했으면 현재 표시된 텍스트를 배열로 변환 후 삭제 시작 준비
      currentTxt = spanEl.textContent.split("");
      setTimeout(deleteTxt, 3000); // 3초 후 텍스트 삭제 시작
    }
  }

  // 텍스트를 한 글자씩 화면에서 제거하는 함수
  function deleteTxt() {
    // 배열의 마지막 글자를 제거
    currentTxt.pop();
    // 남은 글자들을 화면에 표시
    spanEl.textContent = currentTxt.join("");
    // 제거할 글자가 남아있으면 랜덤한 시간 간격으로 다음 글자 제거
    if (currentTxt.length !== 0) {
      setTimeout(deleteTxt, Math.floor(Math.random() * 100)); // 0~100ms 사이 랜덤 간격
    } else {
      // 모든 글자가 제거됐으면 다음 텍스트로 넘어감
      index = (index + 1) % txtArr.length; // 배열 순환을 위한 인덱스 계산
      currentTxt = txtArr[index].split(""); // 다음 텍스트를 한 글자씩 배열로 변환
      console.log(currentTxt); // 디버깅용 로그
      writeTxt(); // 다음 텍스트 작성 시작
    }
  }

  // 초기 텍스트 작성 시작
  writeTxt();
})();

// 스크롤 시 헤더 배경색 변경 기능
const headerEl = document.querySelector("header");
// 스크롤 이벤트 발생 시 성능 최적화를 위해 requestAnimationFrame 사용
window.addEventListener("scroll", function () {
  requestAnimationFrame(scrollCheck); // 브라우저 렌더링에 최적화된 애니메이션 프레임에 함수 실행 예약
});

// 스크롤 위치에 따라 헤더 스타일 변경하는 함수
function scrollCheck() {
  // 크로스 브라우저 호환성을 위한 스크롤 위치 확인 (pageYOffset은 scrollY의 별칭)
  let browerScrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  // 스크롤이 발생했으면 헤더에 active 클래스 추가
  if (browerScrollY > 0) {
    headerEl.classList.add("active");
  } else {
    // 스크롤이 맨 위에 있으면 active 클래스 제거
    headerEl.classList.remove("active");
  }
}

/* 애니메이션 스크롤 이동 기능 */
const animationMove = function (selector) {
  // ① selector 매개변수로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // ② 현재 웹 브라우저의 스크롤 정보(y 값)
  const browserScrollY = window.pageYOffset;
  // ③ 이동할 대상의 위치(y 값) = 요소의 상대적 위치 + 현재 스크롤 위치
  const targetScorllY = targetEl.getBoundingClientRect().top + browserScrollY;
  // ④ 스크롤 이동 - smooth 옵션으로 부드러운 이동 효과
  window.scrollTo({ top: targetScorllY, behavior: "smooth" });
};

// 스크롤 이벤트 연결하기 - 애니메이션 스크롤 속성이 있는 모든 요소에 이벤트 리스너 등록
const scollMoveEl = document.querySelectorAll("[data-animation-scroll='true']");
// 각 요소에 클릭 이벤트 리스너 등록
for (let i = 0; i < scollMoveEl.length; i++) {
  scollMoveEl[i].addEventListener("click", function (e) {
    // data-target 속성에 지정된 선택자 값 가져오기
    const target = this.dataset.target;
    // 해당 선택자로 스크롤 이동 함수 호출
    animationMove(target);
  });
}

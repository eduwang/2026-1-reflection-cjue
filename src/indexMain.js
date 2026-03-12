// src/indexMain.js
import { auth, provider } from "./firebaseConfig";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// ✅ 관리자 권한 UID 설정 (환경변수에서 읽어오기)
const allowedAdmins = (import.meta.env.VITE_ALLOWED_ADMIN_UIDS || "")
  .split(",")
  .map(uid => uid.trim())
  .filter(uid => uid.length > 0);

document.addEventListener("DOMContentLoaded", () => {
  const userInfo = document.getElementById("user-info");
  const logoutBtn = document.getElementById("logout-btn");
  const loginContainer = document.getElementById("login-container");
  const navButtons = document.getElementById("nav-buttons");

  onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.textContent = `👋 ${user.displayName}님`;
    logoutBtn.style.display = "inline-block";
    loginContainer.style.display = "none";

    // ✅ 기본 페이지 버튼 설정
    navButtons.style.display = "flex";
    // const page1Btn = `<a href="/page1.html" class="nav-button">🧩 활동 1: Lesson Play 작성하기</a>`;
    // const page2Btn = `<a href="/page2.html" class="nav-button">🧠 활동 2: Lesson Play 작성하고 GPT 피드백 받기</a>`;
    // const pageLPBtn = `<a href="/pageLessonPlay.html" class="nav-button">🧩 Lesson Play 시작하기</a>`;
    const pageLPEBtn = `<a href="/pageLessonPlayEnhanced.html" class="nav-button">🧩 Lesson Play Enhanced 시작하기</a>`;
    const adminBtn = `<a href="/admin.html" class="nav-button" style="background-color: darkgrey; color: black;">관리자 페이지</a>`;

    // ✅ 버튼 그룹 구성: 관리자면 관리자 버튼도 추가
    navButtons.innerHTML = allowedAdmins.includes(user.uid)
      ? pageLPEBtn + adminBtn
      : pageLPEBtn;
  } else {
    userInfo.textContent = "🔐 로그인되지 않음";
    logoutBtn.style.display = "none";
    navButtons.style.display = "none";

    loginContainer.innerHTML = `
      <button id="login-btn" class="nav-button">🔐 Google 로그인</button>
    `;

    document.getElementById("login-btn").addEventListener("click", () => {
      signInWithPopup(auth, provider).catch((error) => {
        alert("로그인 실패: " + error.message);
      });
    });
  }
});


  logoutBtn.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃 되었습니다.");
        location.reload();
      })
      .catch((error) => {
        alert("로그아웃 실패: " + error.message);
      });
  });
});

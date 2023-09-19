// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGo9aPb92fMqIzSwfgzDcSCZj0G1clmsc",
  authDomain: "album-6d914.firebaseapp.com",
  projectId: "album-6d914",
  storageBucket: "album-6d914.appspot.com",
  messagingSenderId: "391931630805",
  appId: "1:391931630805:web:cac08bab0ca4b958ce7e5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// fetch 현재 서울 온도
const url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let getTemp = data.temp;
    $(".temp").text(getTemp);
  });

// 영화 기록 토글
$("#togglebtn").click(async function () {
  $("#postingform").toggle();
});

// 영화 기록하기 버튼
$("#savebtn").click(async function () {
  // Input value 가져오기
  let image = $("#image").val();
  let title = $("#title").val();
  let star = $("#star").val();
  let comment = $("#comment").val();

  // 가져온 value firestore에 저장하기
  let doc = { image: image, title, title, star: star, comment: comment };
  await addDoc(collection(db, "movie"), doc);

  // 저장하고 폼 리셋 시키기
  window.location.reload();
});

// 기록된 영화 카드에 넣기

let docs = await getDocs(collection(db, "movie"));
docs.forEach((doc) => {
  let row = doc.data();
  let image = row["image"];
  let title = row["title"];
  let star = row["star"];
  let comment = row["comment"];

  let temp_html = `
        <div class="col">
          <div class="card">
            <img src="${image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${star}</p>
              <p class="card-text">${comment}</p>
            </div>
          </div>
        </div>`;

  $("#cards").append(temp_html);
});

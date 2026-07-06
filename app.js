<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCk_ZLd3-XzDPCSUl0DCKDXK9CDvZP6KFY",
    authDomain: "cineworld-official.firebaseapp.com",
    projectId: "cineworld-official",
    storageBucket: "cineworld-official.firebasestorage.app",
    messagingSenderId: "887937479959",
    appId: "1:887937479959:web:3ea2610218dc1898627352",
    measurementId: "G-KCBWLT0CLF"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

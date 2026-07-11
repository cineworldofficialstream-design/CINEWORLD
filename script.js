import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. ඔයාගේ Firebase Config විස්තර මෙතනට ඇතුළත් කරන්න
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Firebase ඉනිට් කිරීම
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// HTML එකේ තියෙන කොටස් Code එකට සම්බන්ධ කරගැනීම
const authContainer = document.getElementById('auth-container');
const mainContent = document.getElementById('main-content');
const googleBtn = document.getElementById('google-btn');
const userProfile = document.getElementById('user-profile');

// 2. පරිශීලකයා දැනටමත් ලොග් වෙලාද නැද්ද කියලා නිරන්තරයෙන් පරීක්ෂා කිරීම (Auth State Listener)
onAuthStateChanged(auth, (user) => {
    if (user) {
        // පරිශීලකයා ලොග් වී ඇත්නම්: Login Card එක සඟවා Main Content එක පෙන්වන්න
        authContainer.style.display = 'none';
        mainContent.style.display = 'block';

        // User Profile එක ඇතුළට ෆොටෝ එක, නම සහ Logout බටන් එක එකතු කිරීම
        userProfile.innerHTML = `
            <img src="${user.photoURL}" alt="${user.displayName}">
            <span>${user.displayName}</span>
            <button id="logout-btn" class="btn btn-logout">Logout</button>
        `;

        // Logout බටන් එක වැඩ කරන විදිහ හැදීම
        document.getElementById('logout-btn').addEventListener('click', () => {
            signOut(auth);
        });

    } else {
        // පරිශීලකයා ලොග් වී නැත්නම්: Main Content සඟවා Login Card එක පෙන්වන්න
        authContainer.style.display = 'block';
        mainContent.style.display = 'none';
        userProfile.innerHTML = ''; // Profile විස්තර අයින් කරන්න
    }
});

// 3. Google බටන් එක ක්ලික් කරපු ගමන් Pop-up එක ඕපන් කිරීම
googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("සාර්ථකව ලොග් වුණා!", result.user);
        })
        .catch((error) => {
            console.error("ලොග් වීමේ දෝෂයක්:", error.message);
            alert("ලොග් වීමට නොහැකි වුණා. නැවත උත්සාහ කරන්න.");
        });
});

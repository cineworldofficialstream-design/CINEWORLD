import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    TwitterAuthProvider, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ඔයාගේ සැබෑ Firebase Config එක
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
const auth = getAuth(app);

// Providers සකස් කිරීම
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

// HTML Elements ලබාගැනීම
const authContainer = document.getElementById('auth-container');
const mainContent = document.getElementById('main-content');
const userProfile = document.getElementById('user-profile');

// බටන් Elements
const googleBtn = document.getElementById('google-btn');
const facebookBtn = document.getElementById('facebook-btn');
const twitterBtn = document.getElementById('twitter-btn');

// පොදු ලොගින් ෆන්ක්ෂන් එකක්
const login = (provider) => {
    signInWithPopup(auth, provider).catch((error) => {
        console.error("Login Error: ", error.message);
        alert("ලොග් වීමට නොහැකි වුණා: " + error.message);
    });
};

// Event Listeners (බටන් ක්ලික්ස්)
googleBtn.addEventListener('click', () => login(googlegoogleProvider));
facebookBtn.addEventListener('click', () => login(facebookProvider));
twitterBtn.addEventListener('click', () => login(twitterProvider));

// පරිශීලකයා ලොග් වී ඇත්දැයි නිරන්තරයෙන් පරීක්ෂා කිරීම
onAuthStateChanged(auth, (user) => {
    if (user) {
        // පරිශීලකයා ලොග් වී ඇත්නම් සැබෑ සයිට් එක පෙන්වන්න
        authContainer.style.display = 'none';
        mainContent.style.display = 'block';
        
        // ප්‍රොෆයිල් විස්තර සහ Logout බටන් එක හැදීම
        userProfile.innerHTML = `
            <img src="${user.photoURL || 'https://via.placeholder.com/40'}" alt="Profile">
            <span>${user.displayName || 'User'}</span>
            <button id="logout-btn" class="btn btn-logout">Log Out</button>
        `;
        
        // Logout බටන් එක ක්‍රියාත්මක කිරීම
        document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));
    } else {
        // ලොග් අවුට් වී ඇත්නම් ලොගින් පේජ් එක විතරක් පෙන්වන්න
        authContainer.style.display = 'block';
        mainContent.style.display = 'none';
        userProfile.innerHTML = '';
    }
});

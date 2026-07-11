import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. Firebase Config විස්තර (ඔයාගේ Firebase Console එකෙන් ගන්න)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// TMDB API සැකසුම් (චිත්‍රපට ඔටෝ ලෝඩ් වෙන්න)
// ⚠️ TMDB එකෙන් ඔයාට ලැබෙන API Key එක මේ 'YOUR_TMDB_API_KEY' වෙනුවට දාන්න.
const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// HTML Element සම්බන්ධ කරගැනීම
const authContainer = document.getElementById('auth-container');
const mainContent = document.getElementById('main-content');
const googleBtn = document.getElementById('google-btn');
const userProfile = document.getElementById('user-profile');

// 2. Firebase Auth Listener (ලොග් වෙලාද නැද්ද පරීක්ෂාව)
onAuthStateChanged(auth, (user) => {
    if (user) {
        authContainer.style.display = 'none';
        mainContent.style.display = 'block';
        document.body.style.alignItems = 'initial'; // Layout එක හරියට තියාගන්න

        userProfile.innerHTML = `
            <img src="${user.photoURL}" alt="profile">
            <span>${user.displayName}</span>
            <button id="logout-btn" class="btn btn-logout">Logout</button>
        `;

        document.getElementById('logout-btn').addEventListener('click', () => signOut(auth));

        // ලොග් වූ පසු ෆිල්ම්ස් ටික ඔටෝ ලෝඩ් කරන්න ගන්නවා
        fetchMovies(); 
    } else {
        authContainer.style.display = 'block';
        mainContent.style.display = 'none';
        document.body.style.alignItems = 'center'; 
    }
});

// Google Login ක්‍රියාවලිය
googleBtn.addEventListener('click', () => {
    signInWithPopup(auth, provider).catch(err => alert("Error: " + err.message));
});

// 3. 🎬 API එකෙන් ෆිල්ම්ස් ඔටෝමැටිකව ඇදලා ගන්නා ශ්‍රිතය (Fetch Function)
function fetchMovies() {
    // Trending ෆිල්ම්ස් ලෝඩ් කිරීම
    fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setupHeroBanner(data.results[0]); // පළවෙනි ෆිල්ම් එක Banner එකට ගන්නවා
            displayMovies(data.results, 'trending-row');
        });

    // Top Rated ෆිල්ම්ස් ලෝඩ් කිරීම
    fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`)
        .then(res => res.json())
        .then(data => displayMovies(data.results, 'top-rated-row'));
}

// Hero Banner එක සකස් කිරීම
function setupHeroBanner(movie) {
    const banner = document.getElementById('hero-banner');
    banner.style.backgroundImage = `url('${IMG_URL + movie.backdrop_path}')`;
    document.getElementById('hero-title').innerText = movie.title || movie.name;
    document.getElementById('hero-description').innerText = movie.overview.substring(0, 150) + "...";
}

// චිත්‍රපට පෝස්ටර් HTML එකට එකතු කිරීම
function displayMovies(movies, rowId) {
    const row = document.getElementById(rowId);
    row.innerHTML = ""; // කලින් තිබ්බ ඒවා අයින් කරන්න

    movies.forEach(movie => {
        if(movie.poster_path) {
            const img = document.createElement('img');
            img.src = IMG_URL + movie.poster_path;
            img.alt = movie.title;
            img.classList.add('movie-poster');
            
            // ක්ලික් කරපු ගමන් ෆිල්ම් එකේ නම පේන්න හැදීම (පසුව ප්ලේයර් එකක් දාන්න පුළුවන්)
            img.addEventListener('click', () => alert("Playing: " + movie.title));
            
            row.appendChild(img);
        }
    });
}

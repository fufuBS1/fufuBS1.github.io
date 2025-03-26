import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Config Firebase (remplace par tes vraies infos)
const firebaseConfig = {
    apiKey: "AIzaSyC78QDQMCbJa3yCW3Z5FmTo8EnNd72gXjY",
    authDomain: "palamod-renew.firebaseapp.com",
    databaseURL: "https://palamod-renew-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "palamod-renew",
    storageBucket: "palamod-renew.firebasestorage.app",
    messagingSenderId: "882699902887",
    appId: "1:882699902887:web:6acd9a08ddeec8ce2f2082"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const counterRef = ref(db, "followers");

// Vérifier si l'user a déjà follow
let hasFollowed = localStorage.getItem("hasFollowed") === "true";
const followBtn = document.getElementById("followbtn");
const counter = document.getElementById("compteur");

// Mettre à jour le texte du bouton
function updateButton() {
    followBtn.textContent = hasFollowed ? "Se désabonner" : "Suivre";
}

// Charger le compteur
get(counterRef).then((snapshot) => {
    if (snapshot.exists()) {
        counter.textContent = snapshot.val();
    }
});

// Gérer le bouton follow/unfollow
followBtn.addEventListener("click", () => {
    get(counterRef).then((snapshot) => {
        let count = snapshot.exists() ? snapshot.val() : 0;

        if (hasFollowed) {
            set(counterRef, count - 1);
            localStorage.setItem("hasFollowed", "false");
            hasFollowed = false;
        } else {
            set(counterRef, count + 1);
            localStorage.setItem("hasFollowed", "true");
            hasFollowed = true;
        }

        counter.textContent = hasFollowed ? count + 1 : count - 1;
        updateButton();
    });
});

// Initialiser le bouton
updateButton();
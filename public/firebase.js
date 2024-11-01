import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
 apiKey: "AIzaSyCVYIbXqXRZV7phRvSbdS84z2K7A59bi-Q",
  authDomain: "ecomus-ecommerce-website.firebaseapp.com",
  projectId: "ecomus-ecommerce-website",
  storageBucket: "ecomus-ecommerce-website.firebasestorage.app",
  messagingSenderId: "178263824101",
  appId: "1:178263824101:web:683660e016f5c6805f260c",
  measurementId: "G-HDNN9EZ0KM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export{app, auth , signInWithEmailAndPassword}
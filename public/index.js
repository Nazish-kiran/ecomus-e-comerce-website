import {
  app,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  provider,
  signInWithPopup
} from "./firebase.js";

// DOM Elements
let loginBtn = document.querySelector(".fa-user");

// Check session storage to show the correct modal
if (sessionStorage.getItem("isLoggedIn") === "true") {
  showLogoutModal();
} else {
  loginBtn.addEventListener("click", showSignInModal);
}

// Function to display the sign-in modal
function showSignInModal() {
  Swal.fire({
    html: `<div class = "sign-in">
              <div class="signin-top d-flex justify-content-between" style="font-size:30px; color:black;">
                   <h3 class="mb-5 text-start" style="font-size:28px; color:black;">Sign In </h3>
                   <i class="fa-solid fa-xmark cursor-pointer" id="close-modal"></i>
              </div>
              <input type="email" id="swal-input1" class="swal2-input login-email mb-4 small" placeholder="Email *">
              <input type="password" id="swal-input2" class="swal2-input login-pass mb-5 small" placeholder="Password *">
              <a href="#" class="signin-btn-link small">Forgot Your password?</a>
           </div>`,
    focusConfirm: false,
    showDenyButton: true,
    confirmButtonText: "Sign in",
    denyButtonText: `Log in With Google`,
    customClass: {
      popup: "custom-width-swal",
    },
    preConfirm: () => {
      const email = Swal.getPopup().querySelector("#swal-input1").value;
      const password = Swal.getPopup().querySelector("#swal-input2").value;
      if (!email || !password) {
        Swal.showValidationMessage(`Please enter both email and password`);
      }
      return { email: email, password: password };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const { email, password } = result.value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created:", userCredential);
          sessionStorage.setItem("isLoggedIn", "true");
          showLogoutModal();  // Switch to logout modal after login
        })
        .catch((error) => {
          console.error("Error creating user:", error.message);
          Swal.fire("Error", error.message, "error");
        });
    }
    else if (result.isDenied) {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("User signed in with Google:", user);
      sessionStorage.setItem("isLoggedIn", "true");
      showLogoutModal(); // Switch to logout modal after successful login
    })
    .catch((error) => {
      console.error("Error during Google Sign-In:", error.message);
      Swal.fire("Error", "Failed to sign in with Google. Please try again.", "error")
        .then(() => showSignInModal()); // Reopen the modal on error
    });
}
  });
  document.addEventListener("click", (event) => {
    if (event.target.id === "close-modal") {
      Swal.close();
    }
  });
}

// Function to display the logout modal
function showLogoutModal() {
  loginBtn.removeEventListener("click", showSignInModal); // Remove previous listener
  loginBtn.addEventListener("click", () => {
    Swal.fire({
      html: `<div class = "sign-in">
               <div class="signin-top d-flex justify-content-between" style="font-size:30px; color:black;">
                  <h3 class="mb-5 text-start" style="font-size:28px; color:black;">Log Out </h3>
                  <i class="fa-solid fa-xmark cursor-pointer" id="close-modal"></i>
               </div>
            </div>`,
      focusConfirm: false,
      confirmButtonText: "Log out",
      customClass: {
        popup: "custom-width-swal",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const currentUser = auth.currentUser;
        if (currentUser) {
          deleteUser(currentUser)
            .then(() => {
              console.log("User deleted");
              sessionStorage.setItem("isLoggedIn", "false");
              loginBtn.addEventListener("click", showSignInModal); // Restore sign-in modal listener
            })
            .catch((error) => {
              console.error("Error deleting user:", error.message);
            });
        } else {
          console.log("No user is currently authenticated");
        }
      }
    });
  });
}

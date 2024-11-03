import { app, auth, signInWithEmailAndPassword } from "./firebase.js";

let loginBtn = document.querySelector(".fa-user");
let cross = document.querySelector("fa-xmark");

loginBtn.addEventListener("click", () => {
  Swal.fire({
    html: `<div class = "sign-in">
              <div class="signin-top d-flex justify-content-between" style="font-size:30px; color:black;">
                   <h3 class="mb-5 text-start" style="font-size:28px; color:black;">Log In </h3>
                   <i class="fa-solid fa-xmark cursor-pointer" id="close-modal"></i>
              </div>
              <input type="email" id="swal-input1" class="swal2-input login-email mb-4 small" placeholder="Email *">
              <input type="password" id="swal-input2" class="swal2-input login-pass mb-5 small" placeholder="Password *">
              <a href="#" class="signin-btn-link small">Forgot Your password?</a>
           </div>`,
    focusConfirm: false,
    showDenyButton: true,
    confirmButtonText: "Log in",
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
      signInWithEmailAndPassword(
        auth,
        result.value.email,
        result.value.password
      )
        .then((userCredential) => {
          Swal.fire("Success!", "You are logged in!", "success");
        })
        .catch((error) => {
          Swal.fire("Error!", error.message);
        });
    }
  });
  document.addEventListener("click", (event) => {
    if (event.target.id === 'close-modal') {
      Swal.close(); 
    }
  });
});


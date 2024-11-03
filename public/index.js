import {
  app,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  deleteUser,
  user,
} from "./firebase.js";

let loginBtn = document.querySelector(".fa-user");
let CrossBtn = document.querySelector(".fa-xmark");


loginBtn.addEventListener("click", () => {
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
    if (result.value) {
      const { email, password } = result.value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created:", userCredential);
          var flag = true;
          if (flag == true) {
            loginBtn.addEventListener("click", () => {
              console.log(777);
              Swal.fire({
                html: `
              <div class = "sign-in">
                <div class="signin-top d-flex justify-content-between" style="font-size:30px; color:black;">
                   <h3 class="mb-5 text-start" style="font-size:28px; color:black;">Log Out </h3>
                   <i class="fa-solid fa-xmark cursor-pointer" id="close-modal"></i>
                </div>
             </div>
              `,
                focusConfirm: false,
                confirmButtonText: "log out",
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
          else{
            console.log(777777);
            
          }
        })
        .catch((error) => {
          console.error("Error creating user:", error.message);
          Swal.fire("Error", error.message, "error");
        });
    }
  });
});

CrossBtn.addEventListener("click",()=>{
  Swal
})

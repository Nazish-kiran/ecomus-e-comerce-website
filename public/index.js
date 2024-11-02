import{app,auth,signInWithEmailAndPassword} from "./firebase.js"
import Swal from 'sweetalert2';

var loginBtn = document.querySelector(".fa-user"); 

loginBtn.addEventListener("click", () => {
    Swal.fire({
        title: 'Log in',
        html:
            `<input type="email" id="swal-input1" class="swal2-input" placeholder="Email *">
             <input type="password" id="swal-input2" class="swal2-input" placeholder="Password *">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Log in',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('#swal-input1').value;
            const password = Swal.getPopup().querySelector('#swal-input2').value;
            if (!email || !password) {
                Swal.showValidationMessage(`Please enter both email and password`);
            }
            return { email: email, password: password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Call your login function here with result.value.email and result.value.password
            signInWithEmailAndPassword(auth, result.value.email, result.value.password)
                .then((userCredential) => {
                    // Signed in successfully
                    Swal.fire('Success!', 'You are logged in!', 'success');
                })
                .catch((error) => {
                    Swal.fire('Error!', error.message, 'error');
                });
        }
    });
});

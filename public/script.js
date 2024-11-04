let container = document.getElementById('container')

toggle = () => {
	container.classList.toggle('sign-in')
	container.classList.toggle('sign-up')
}

setTimeout(() => {
	container.classList.add('sign-in')
}, 200)




// Define the form validation function outside the event listener
function formvalidation(e) {
    e.preventDefault();

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("Confirm").value;

    if (username === "" || email === "" || password === "" || confirm === "") {
        // alert("Please complete all fields.");
        Swal.fire({
                        icon: 'warning',
                        title: 'Incomplete Fields',
                        text: 'Please complete all fields.'
                    });
        return false; // Prevent submission
    } else if (password !== confirm) {
        // alert("Passwords do not match.");
        Swal.fire({
                        icon: 'error',
                        title: 'Password Mismatch',
                        text: 'Passwords do not match.'
                    });
        return false; // Prevent submission
    }

    // If all checks pass, allow the form to submit
    // alert("Form submission successful!");
    Swal.fire({
                icon: 'success',
                title: 'Form Submitted!',
                text: 'Form submission successful!'
            })
    e.currentTarget.submit()
    return true;
}

// Add the event listener to the form
document.getElementById("form").addEventListener("submit", formvalidation);


// function formsignin(e) {
//     e.preventDefault();

//     const username = document.getElementById('signInUsername').value;
//     const password = document.getElementById('signInPassword').value;

//     if (!username || !password) {
//         Swal.fire({
//             icon: 'warning',
//             title: 'Incomplete Fields',
//             text: 'Please complete all fields.'
//         });
//         return false;
//     }

//     e.target.submit(); // Submit the form programmatically
//     return true;
// }

// // Add event listener to the sign-in form
// document.getElementById("signInForm").addEventListener("submit", formsignin)








document.addEventListener('DOMContentLoaded', () => {
    
    const showError = (inputElement, errorElement, message) => {
        errorElement.textContent = message;
        inputElement.classList.add('input-error');
    };
    const clearError = (inputElement, errorElement) => {
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const loginForm = document.getElementById('loginForm');
    // const loginEmailCheck = document.getElementById('loginEmail');
      function checkTheUser(loginEmailCheck, passwordCheck) {

    const storedUsers = JSON.parse(
        localStorage.getItem('registerUsers')
    ) || [];

    if (storedUsers.length === 0) {
        alert('No registered user found. Please sign up first.');
        return;
    }

    const user = storedUsers.find(
        (user) =>
            user.email === loginEmailCheck &&
            user.password === passwordCheck
    );

    if (user) {

        localStorage.setItem('isLoggedIn', 'true');

        localStorage.setItem(
            'currentUser',
            JSON.stringify(user)
        );

        window.location.href = '../home.html';

    } else {

        alert('Your mentioned credentials are wrong');

    }
}
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const email = document.getElementById('loginEmail');
            const emailError = document.getElementById('loginEmailError');
            const password = document.getElementById('loginPassword');
            const passwordError = document.getElementById('loginPasswordError');

            if (email.value.trim() === '') {
                showError(email, emailError, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, emailError, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email, emailError);
            }

           
            if (password.value.trim() === '') {
                showError(password, passwordError, 'Password is required.');
                isValid = false;
            } else {
                clearError(password, passwordError);
            }

    
            if (isValid) {
        checkTheUser(
            email.value.trim(),
            password.value
        );
    }
        });
    }


    const signupForm = document.getElementById('signupForm');
     const emailStore = document.getElementById('signupEmail');
//     function storeTheUser(emailAddress, passwordStore) {

//     const userData = {
//         email: emailAddress,
//         password: passwordStore
//     };

//     const existingUsers = JSON.parse(
//         localStorage.getItem('registerUsers')
//     ) || [];
//     existingUsers.push(userData);

//     localStorage.setItem(
//         'registerUsers',
//         JSON.stringify(existingUsers)
//     );
// }

    if (signupForm) {
       signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            let isValid = true;
            console.log("Entered to the sumit form");
            

            const name = document.getElementById('signupName');
            const nameError = document.getElementById('signupNameError');
            const email = document.getElementById('signupEmail');
            const emailError = document.getElementById('signupEmailError');
            const password = document.getElementById('signupPassword');
            const passwordError = document.getElementById('signupPasswordError');
            const confirmPassword = document.getElementById('signupConfirmPassword');
            const confirmPasswordError = document.getElementById('signupConfirmPasswordError');

    
            if (name.value.trim() === '') {
                showError(name, nameError, 'Name is required.');
                isValid = false;
            } else {
                clearError(name, nameError);
            }


            if (email.value.trim() === '') {
                showError(email, emailError, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, emailError, 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(email, emailError);
            }
            if (password.value.trim() === '') {
                showError(password, passwordError, 'Password is required.');
                isValid = false;
            } else if (password.value.length < 6) {
                showError(password, passwordError, 'Password must be at least 6 characters.');
                isValid = false;
            } else {
                clearError(password, passwordError);
            }

            if (confirmPassword.value.trim() === '') {
                showError(confirmPassword, confirmPasswordError, 'Please confirm your password.');
                isValid = false;
            } else if (confirmPassword.value !== password.value) {
                showError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
                isValid = false;
            } else {
                clearError(confirmPassword, confirmPasswordError);
            }

            if (isValid) {

    const userData = {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };

    try {

        const response = await fetch('/register', {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert('Registration successful!');

        window.location.href = '../index.html';

    } catch (error) {

        console.error(error);

        alert('Unable to connect to server.');
    }
}
        });
    }
});



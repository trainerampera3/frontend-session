let loginForm = document.getElementById("loginForm");
let signupButton = document.getElementById("signupButton");
signupButton.addEventListener("click", function() {

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    let loginError = document.getElementById("loginError");
    if (username === "") {
        loginError.textContent = "Enter username";
        return;
    }
    if (password === "") {
        loginError.textContent = "Enter password";
        return;
    }
    loginError.textContent = "";
    window.location.href = "signup.html";
});

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    let loginError = document.getElementById("loginError");
    if (username === "") {
        loginError.textContent = "Username is required";
        return;
    }
    if (password === "") {
        loginError.textContent = "Password is required";
        return;
    }
    let storedUser = localStorage.getItem("user");
    if (storedUser === null) {
        loginError.textContent = "Please sign up first";
        return;
    }
    let user = JSON.parse(storedUser);
    if (username === user.username && password === user.password) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        loginError.textContent = "Invalid username or password";
    }

});


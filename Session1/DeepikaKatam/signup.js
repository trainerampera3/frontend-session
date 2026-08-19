let signupForm = document.getElementById("signupForm");
let clearButton = document.getElementById("clearButton");
let cancelButton = document.getElementById("cancelButton");
signupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let errorMessage = document.getElementById("errorMessage");
    if (name === "") {
        errorMessage.textContent = "Name is required";
        return;
    }
    if (username === "") {
        errorMessage.textContent = "Username is required";
        return;
    }
    if (email === "") {
        errorMessage.textContent = "Email is required";
        return;
    }
    if (password === "") {
        errorMessage.textContent = "Password is required";
        return;
    }
    if (confirmPassword === "") {
        errorMessage.textContent = "Confirm password is required";
        return;
    }
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match";
        return;
    }
    let user = {
        name: name,
        username: username,
        email: email,
        password: password
    };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful!");
    window.location.href = "main.html";
});
clearButton.addEventListener("click", function() {
    signupForm.reset();
    document.getElementById("errorMessage").textContent = "";

});
cancelButton.addEventListener("click", function() {
    window.location.href = "main.html";
});
function signup() {

    let name = document.getElementById("name").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) ||[] ;

    if (name == "" || username == "" || email == "" || password == "" || confirmPassword == "") {

        alert("Please fill all fields");

    }
    else if (users.some(user => user.username == username)) {
        alert("Username already exists");
    }
    else if (password != confirmPassword ) {

        alert("Passwords do not match");
    }
    else {
        users.push({name :name , username:username, email:email, password:password});

        localStorage.setItem("users",JSON.stringify(users));

        alert("Signup successful");

        location.href = "logIn.html";
    }
}



function login() {

    let userName = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPassword").value;

    // Get all registered users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check empty fields
    if (userName == "" || password == "") {

        alert("Please fill all the details");
    }

    else {

        
        let savedUser = users.find(user => user.username == userName);

        if (savedUser === undefined) {

            alert("Invalid Username");
        }

        else if (savedUser.password != password) {

            alert("Invalid Password");
        }

        else {

            
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("loggedInUser", savedUser.username);
            sessionStorage.setItem("loggedInName", savedUser.name);

            alert("Sign In successful, Will be directed to dashboard.");

            window.location.href = "./dashboard.html";
        }
    }
}
 
// Check whether the user is logged in
function checkLogin()
{
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
 
    if(isLoggedIn !== "true")
    {
        alert("Please Sign In first.");
 
        window.location.href = "./logIn.html";
    }
}
 
 
// Logout function
function logout()
{
    // Remove only login session
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    sessionStorage.removeItem("loggedInName");
 
    alert("You have been logged out.");
 
    window.location.href = "./logIn.html";
}
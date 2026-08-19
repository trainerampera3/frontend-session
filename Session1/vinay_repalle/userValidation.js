// Here we will check the user details of sign up and sign in forms.

// Validate the user details and check the conditions
// and store them in localStorage.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


function signUp()
{
    let name = document.getElementById("regName").value.trim();
    let userName = document.getElementById("regUserName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;
    let confirmPassword = document.getElementById("regConfirmPassword").value;

    // Get all registered users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];


    if(name == "" || userName == "" || email == "" || password == "" || confirmPassword == "")
    {
        alert("Please fill all the details");
    }
    else if(userName.length <= 5)
    {
        alert("Username should be greater than 5 characters.");
    }
    else if(users.some(user => user.userName == userName))
    {
        alert("Username already exists. Please choose another username.");
    }
    else if(!emailPattern.test(email))
    {
        alert("Please enter a valid email address.");
    }
    else if(password != confirmPassword)
    {
        alert("Passwords and confirm password are not the same. Make sure you enter them correctly.");
    }
    else
    {
        // Create new user
        users.push({
            name: name,
            userName: userName,
            email: email,
            password: password
        });

        // Store updated users array in localStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Sign Up successful. Goto Sign In.");

        window.location.href = "./signIn.html";
    }
}


// Validate the username and password for Sign In page.

function signIn()
{
    let userName = document.getElementById("typeUsername").value.trim();
    let password = document.getElementById("typePassword").value;

    // Get all registered users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];


    if(userName == "" || password == "")
    {
        alert("Please fill all the details");
    }
    else
    {
        // Find the user with the entered username
        let savedUser = users.find(user => user.userName == userName);

        if(savedUser == undefined)
        {
            alert("Invalid Username");
        }
        else if(savedUser.password != password)
        {
            alert("Invalid Password");
        }
        else
        {
            // Store login information in sessionStorage
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("loggedInUser", savedUser.userName);
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

        window.location.href = "./signIn.html";
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

    window.location.href = "./signIn.html";
}

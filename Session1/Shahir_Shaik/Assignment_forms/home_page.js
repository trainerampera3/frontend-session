const userdetails = localStorage.getItem('userdetail');

if (userdetails) {
    const user = document.getElementsByClassName('username')[0];

    const userData = JSON.parse(userdetails);
    console.log(userData.username)
    user.innerText = `Welcome ${userData.username}!`;
} 
else {
    console.log("User Data Not Found!");
}
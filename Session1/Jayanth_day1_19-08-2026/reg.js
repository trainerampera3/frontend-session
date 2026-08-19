// const db = require('./db.js')
let form = document.getElementById('form');
form.addEventListener('submit', 
function formValidation(e){
    e.preventDefault();
    let isValid = true;
let name = document.getElementById('name').value.trim()
let username = document.getElementById('username').value.trim()
let email = document.getElementById('email').value.trim()
let pass = document.getElementById('password').value
let cpass = document.getElementById('cpassword').value


let nameEr = document.getElementById('name-er');
let unameEr = document.getElementById('uname-er');
let mailEr = document.getElementById('mail-er');
let passEr = document.getElementById('pass-er');
let cpassEr = document.getElementById('cpass-er');

let users = JSON.parse(localStorage.getItem('users')) || []

let usernameExists = users.some(
    user => user.username.toLowerCase() === username.toLowerCase()
);


// let usernameExists = checkUsername(username);


console.log(usernameExists)

let mailexists = users.some(
    user => user.email.toLowerCase() === email.toLowerCase()
)

// let mailexists = checkMail(email);


nameEr.textContent = '';
unameEr.textContent = '';
mailEr.textContent = '';
passEr.textContent = '';
cpassEr.textContent=""

if (pass !== cpass){
    cpassEr.innerHTML='password mismatch'
isValid = false;
}
if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[&*$#@])[A-Za-z\d&*$#@]{8,}$/.test(pass)){
    isValid=false
    passEr.innerHTML = 'password format mustbe 8, 1 capital, 1 small, 1 digit, 1 spec char'
}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    isValid=false
    mailEr.innerHTML = 'proper mail must be given'
}
if(name === "" || /\d/.test(name)){
    nameEr.innerHTML = 'Please enter proper name '
    isValid = false;
}
if(mailexists){
    mailEr.innerHTML= 'Email already exists';
    isValid = false;
}
if(usernameExists){
    unameEr.innerHTML = 'Username already exists';
    isValid=false;
}
if(isValid){

    // adduser(name, username, email, pass)
    users.push({
        username, 
        name,
        pass,
        email
    });
    localStorage.setItem('users', JSON.stringify(users))
    alert('Form submitted successfully');
    window.location.href = './login_in.html'
}
else{
    return false;
}
})

let btn1 = document.getElementById('reset') ;
let btn2 = document.getElementById('cancel');
function eraseError()  {
    let nameEr = document.getElementById('name-er');
    let unameEr = document.getElementById('uname-er');
    let mailEr = document.getElementById('mail-er');
    let passEr = document.getElementById('pass-er');
    let cpassEr = document.getElementById('cpass-er');

    nameEr.textContent = '';
    unameEr.textContent = '';
    mailEr.textContent = '';
    passEr.textContent = '';
    cpassEr.textContent= '';
}

btn1.addEventListener('click', eraseError)
btn2.addEventListener('click', () =>{
    eraseError();
    window.location.href='./login_in.html'
})

// async function adduser(name, username, email, password){
//     const result = await db.query(
//         'INSERT into Users (Name,username, email,password) values ($1,$2,$3,$4) RETURNING *',[name,username, email, password]
//     );
//     console.log(result.row[0]);
// }

// async function checkUsername(username) {
//     const result = await db.query('SELECT EXITS (select 1 fro Users where username = $1)', [username])

//     return result.rows[0].exists;
// }

// async function checkMail(mail) {
//     const result = await db.query('SELECT EXISTS(select 1 from Users where email = $1',[mail]);

//     return result.rows[0].exists;
// }


function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validateForm(nameValue, usernameValue, emailValue, passwordValue, confirmPassValue) {

    let emailcheck = null;
    let passcheck = null;
    let namecheck = null;
    let usernamecheck = null;

    if (nameValue.length > 5) {
        namecheck = 1;
    }
    else{
        alert('Name length should be greater than 5')
    }

    if (usernameValue.length > 5) {
        usernamecheck = 1;
    }
    else{
        alert('User Name length should be greater than 5')
    }

    if (validateEmail(emailValue)) {
        emailcheck = 1;
    }
    else{
        alert('Enter correct email')
    }

    if (passwordValue === confirmPassValue) {
        passcheck = 1;
    }
    else{
        alert('Passwords should match')
    }

    return emailcheck === 1 &&
           passcheck === 1 &&
           namecheck === 1 &&
           usernamecheck === 1;
}
function check(nameValue, usernameValue) {
    let users = JSON.parse(localStorage.getItem("registerusers")) || [];

    if (users.length > 0) {
        for (let user of users) {
            if (user.username === usernameValue || user.name === nameValue) {
                alert('User Name or Name already exists!');
                return false;
            }
        }

        return true;
    }

    return true;
}
document.getElementsByTagName('form')[0].addEventListener('submit', (event) => {

    event.preventDefault();

    const nameInput = document.getElementById('ename');
    const usernameInput = document.getElementById('eusername');
    const emailInput = document.getElementById('eemail');
    const passwordInput = document.getElementById('epassword');
    const confirmPassInput = document.getElementById('econ_pass');

    const nameValue = nameInput.value.trim();
    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    const confirmPassValue = confirmPassInput.value.trim();

    if (validateForm(nameValue,usernameValue,emailValue,passwordValue,confirmPassValue) && check(nameValue,usernameValue)) {

        const userdata = {
            name: nameValue,
            username: usernameValue,
            password: passwordValue,
            email:emailValue
        };


        let users = JSON.parse(localStorage.getItem("registerusers")) || [];

        users.push(userdata);

        localStorage.setItem('registerusers', JSON.stringify(users));

        window.location.href = 'login_page.html';

        console.log("Done!");
    }
  
});



let clear_button=document.getElementsByClassName('clear')[0]
clear_button.addEventListener('click',()=>{
    const nameInput = document.getElementById('ename');
    const usernameInput = document.getElementById('eusername');
    const emailInput = document.getElementById('eemail');
    const passwordInput = document.getElementById('epassword');
    const confirmPassInput = document.getElementById('econ_pass');

    nameInput.value=''
    usernameInput.value=''
    emailInput.value=''
    passwordInput.value=''
    confirmPassInput.value=''


})
let back_buton=document.getElementsByClassName('back')[0]
back_buton.addEventListener('click',()=>{
    window.location.href='login_page.html'
})
document.getElementsByTagName('form')[0].addEventListener('submit',(event)=>{
    event.preventDefault()
    const username=document.getElementById('eusername').value.trim()
    const password=document.getElementById('epassword').value.trim()
    if(username==='' || password===''){

        alert("enter the data!")

    }
else{
    const storedData = localStorage.getItem('registerusers');
if (storedData) {
    let found=false
   
    const users = JSON.parse(storedData)
    for(let i in users){
        if(users[i].username===username && users[i].password===password){
            window.location.href='home_page.html'
            
            let userdetails={
                username:username
            }
            found=true
            localStorage.setItem('userdetail',JSON.stringify(userdetails))
            break
        }
        }
    if(!found){
        alert("User Details are not found.Please check your entered data!!")
    
    }
    

}
else{
    alert("Data Not Found in Local Storage!")
}
    }

})
const signup=document.getElementsByClassName('signup')[0]
signup.addEventListener('click',()=>{
    window.location.href='sigup_page.html'
})




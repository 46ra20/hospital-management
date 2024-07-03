const handleLogin=(e)=>{
    if(localStorage.getItem("token") !=true && localStorage.getItem("user_id")!=true){
    e.preventDefault();
    const username = getValue('username')
    const password = getValue('password')

    const info={
        username,
        password
    }

    fetch('https://testing-8az5.onrender.com/patient/login/',{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(info)
    })
    .then(r=>r.json())
    .then(d=>{
        console.log(d)
        localStorage.setItem("token",d.token)
        localStorage.setItem("user_id",d.user_id)
        // if(d.user_id && d.token){
        //     window.location.href="index.html"
        // }
    })}
    else{
        window.location.href="index.html"

    }
}


const handleRegistration=(e)=>{
    e.preventDefault();
    const username = getValue('username')
    const email = getValue('email')
    const password = getValue('password')
    const confirm_password = getValue('confirmPassword')

    const info = {
        username,
        email,
        password,
        confirm_password
    }
    console.log(info)

    if(password==confirm_password){
        fetch("https://testing-8az5.onrender.com/patient/register/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(info)
        })
        .then(r=>r.json())
        .then(data=>{
            
            console.log(data)
            window.location.href='index.html'
        })

    }
    else{
        alert("Password didn't match")
    }
    console.log(username,email,password,confirm_password)
}

const getValue = (id)=>{
    const value = document.getElementById(id).value;
    console.log(value)
    return value

}
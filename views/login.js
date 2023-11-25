async function loginUser(event){

    event.preventDefault();

    const email = event.target.mail.value;
    const password = event.target.password.value;

    const user = {

        email,
        password
    }

    try{

        const response = await axios.post("http://localhost:3000/user/login",user);


        document.getElementById('mail').value = "";
        document.getElementById('password').value = "";

        localStorage.setItem('token',response.data.token);
        
        alert(response.data.message);


        
    }
    catch(err) {
        console.log(err.response.data);
        alert(err.response.data.message); // to error out message.
    }
}
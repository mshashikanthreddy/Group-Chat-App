async function registerUser(event) {

    event.preventDefault();

    const name = event.target.username.value ;
    const email = event.target.email.value ;
    const phoneNumber = event.target.phonenumber.value;
    const password = event.target.password.value ;

    const user = {

        name ,
        email ,
        phoneNumber,
        password
    } 
        try{
             const response = await axios.post("http://localhost:3000/user/signup",user); 
  
                 alert(response.data.message);  
                 window.location.href = "../views/login.html";
            }
        catch(err){
            alert(err.response.data.message);
        }
}
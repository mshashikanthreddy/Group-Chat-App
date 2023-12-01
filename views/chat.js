 function sendmsg(event) {

    event.preventDefault();

    const msg = event.target.msg.value;

    const userDetails = {

        msg
    }

    try {

        const token = localStorage.getItem('token');
        const response =  axios.post("http://localhost:3000/user/sendmsg",userDetails, {
            headers : { Authorization : token}
        })
        if(response.status === 200)
        {
            alert(response.data.message);
        }
    }
    catch(err) {
        console.log(err);
    }
}


window.addEventListener('DOMContentLoaded' , async() => {

    
    try {
        const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token)
    console.log(decodeToken);
    }
    catch(err) {
        console.log(err);
    }
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


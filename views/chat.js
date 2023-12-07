 const msgarea = document.getElementById('tsmg');

 const token = localStorage.getItem('token');

 function sendmsg(event) {

    event.preventDefault();

    const msg = event.target.msg.value;

    const userDetails = {

        msg
    }

    try {

        const response =  axios.post("http://localhost:3000/user/sendmsg",userDetails, {
            headers : { Authorization : token}
        })
        if(response.status === 200)
        {
            alert(response.data.message);
        }
        setInterval(() => {
            location.reload();
          }, 1000);
    }
    catch(err) {
        console.log(err);
    }
}


window.addEventListener('DOMContentLoaded' , async() => {

    
    try {
    const decodeToken = parseJwt(token)
    console.log(decodeToken);
    const response = await axios.get("http://localhost:3000/user/getmsg", {
        headers: { Authorization: token },
      });
      const details = response.data;
      console.log("while getting messages on domcontentload", details);
      const chatList = document.getElementById("chats");
      chatList.innerHTML = "";
      if (Array.isArray(details)) {
        details.forEach((element) => {
          showafterDomContentload(element);
        });
      } else {
        console.log("response.data.message is not an array");
      }
  
    } catch (err) {
      console.log("error  while getting messages", err);
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

function showafterDomContentload(element) {
    const chatList = document.getElementById("chats");
    const chatItem = document.createElement("li");
    chatItem.textContent = `${element.username}:${element.msg}`;
    chatList.appendChild(chatItem);
  }


      
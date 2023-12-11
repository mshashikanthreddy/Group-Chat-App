 const msgarea = document.getElementById('tsmg');

 const token = localStorage.getItem('token');

 async function sendmsg(event) {

    event.preventDefault();

    const msg = event.target.msg.value;

    const userDetails = {

        msg
    }

    try {

        const response =  await axios.post("http://localhost:3000/user/sendmsg",userDetails, {
            headers : { Authorization : token}
        })
        if(response.status === 200)
        {
            alert("message sent successfully");
        }
        console.log(response.data.msg);
        showAfterDomContentLoad(response.data);
        // setInterval(() => {
        //     location.reload();
        //   }, 1000);
        document.getElementById('tmsg').value = "";
    }
    catch(err) {
        console.log(err);
    }
}


window.addEventListener('DOMContentLoaded' , async() => {

    
    try {
    const decodeToken = parseJwt(token)
    console.log(decodeToken);

    let lastmsgid ;
    if(!lastmsgid)
    {
      lastmsgid = -1;
    }
    
    const response = await axios.get(`http://localhost:3000/user/getmsg?lastmsgid=${lastmsgid}`, {
        headers: { Authorization: token },
      });
      const details = response.data;

      console.log(details);
    
      const chatList = document.getElementById("chats");
      chatList.innerHTML = "";

      lastmsgid = details[details.length - 1].msgId ;
      localStorage.setItem('lastmsgid',lastmsgid);

      console.log(lastmsgid);


      if(details.length > 0) 
      {
        let existingmsgs = JSON.parse(localStorage.getItem("messages"));
        if(!existingmsgs)
        {
          existingmsgs = [];
        }

        const newMessage = [...existingmsgs,...details];

        while (newMessage.length > 10) {
          newMessage.shift();
        }

        localStorage.setItem("message", JSON.stringify(newMessage));
      }
      const messages = JSON.parse(localStorage.getItem("message"));
      messages.forEach((element) => {
        showAfterDomContentLoad(element);
      });
  
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

function showAfterDomContentLoad(element) {
    const chatList = document.getElementById("chats");
    const chatItem = document.createElement("li");
    chatItem.textContent = `${element.username}:${element.msg}`;
    chatList.appendChild(chatItem);
  }




      
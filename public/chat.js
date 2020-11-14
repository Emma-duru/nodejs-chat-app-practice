const socket = io();

const chatBtn = document.querySelector("#chat-send");
const chatInput = document.querySelector("#chat-input");
const chatList = document.querySelector(".chat-list");

chatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = chatInput.value;
  socket.emit("send_chat", msg);
  chatInput.value = "";
});


socket.on("send_chat", (data) => {
  chatList.innerHTML += `
        <p class="chat-item" style="background-color:${data.color}">${data.msg}</p>
    `;
  chatList.scrollTop = chatList.scrollHeight;
});

const socket = io();

const chatBtn = document.querySelector("#chat-send");
const chatInput = document.querySelector("#chat-input");
const chatList = document.querySelector(".chat-list");
const nameBtn = document.querySelector("#name-send");
const nameInput = document.querySelector("#name-input");
const username = document.querySelector(".username");

chatBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const msg = chatInput.value;
  socket.emit("send_chat", msg);
  chatInput.value = "";
});

nameBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  socket.emit("change_name", name);
  nameInput.value = "";
});

socket.on("send_chat", (data) => {
  chatList.innerHTML += `
        <p class="chat-item" style="background-color:${data.color}">${data.msg}</p>
    `;
  chatList.scrollTop = chatList.scrollHeight;
});

socket.on("change_name", (name) => {
  username.innerHTML = name;
});

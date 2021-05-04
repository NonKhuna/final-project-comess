async function createRoom() {
  const room = await Post("/room");
  setRoomId(room.id);
  setHost(true);
  location.replace("login.html");
}

async function joinRoom() {
  var inputPin = document.getElementById("inputPin").value;
  if(!inputPin) {
    alert("Please enter game pin first!");
    return;
  }
  const room = await Get(`/room/${inputPin}`);
  if (!room) {
    alert("Room Not Found!");
    return;
  }
  setRoomId(inputPin);
  location.replace("login.html");
}

async function enterRoom() {
  var inputName = document.getElementById("inputName").value;
  if (!inputName) {
    alert("Enter your name first.");
    return;
  }
  var data = {
    name: inputName,
  };
  const user = await Post(`/room/${getRoomId()}`, data);
  if (user) {
    setUserName(inputName);
    setUserToken(user.id);
    location.replace(`room.html?id=${getRoomId()}`);
  }
}

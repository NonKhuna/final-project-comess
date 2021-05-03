function setGameState(s) {
  localStorage.setItem("state", s);
}

function getGameState() {
  return localStorage.getItem("state");
}

function setNProb(n) {
  localStorage.setItem("nProb", n);
}

function getNProb() {
  return localStorage.getItem("nProb");
}
function setAnswer(ans) {
  localStorage.setItem("answer", ans);
}

function getAnswer() {
  return localStorage.getItem("answer");
}

function setUserName(n) {
  localStorage.setItem("name", n);
}

function getUserName() {
  return localStorage.getItem("name");
}

function setUserToken(token) {
  localStorage.setItem("token", token);
}

function getUserToken() {
  return localStorage.getItem("token") | undefined;
}

function setRoomId(id) {
  localStorage.setItem("roomId", id);
}
function getRoomId() {
  return localStorage.getItem("roomId") | undefined;
}

function setHost(isHost) {
  localStorage.setItem("isHost",isHost);
}

function getHost() {
  return localStorage.getItem("isHost");
}
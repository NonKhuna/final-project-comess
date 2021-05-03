var displayChoice = false;
$(async function () {
  const room = await Get(`/room/${getRoomId()}`);
  if (room.state == "pre") {
    if(getHost()) {
      showButtonStart();
    }else showWaitScreen("Wait for game start.");
  } else if (room.state == "start") {
    if (getGameState() == "inGame") {
      loadChoices();
      displayChoice = true;
    }
  } else if (room.state == "end") {
    $(".btn-ans").addClass("disabled");
    loadRightAns();
  }
  $("#name").text(getUserName());
  $("#title-pin").text(`Jig-Saw ! #${getRoomId()}`);
});

var socket = io(API_HOST, {
  query: {
    userId: getUserToken(),
    roomId: getRoomId(),
  },
});

socket.on("process", (msg) => {
  console.log(msg);
  msg = JSON.parse(msg);
  const command = msg[0];
  const timeLeft = msg[1];
  const nProb = msg[2];
  $("#round").text(`Round ${nProb + 1}`);
  switch (command) {
    case "prepare":
      setGameState("pre");
      showWaitScreen(timeLeft);
      break;
    case "start":
      setGameState("inGame");
      if (!displayChoice) {
        loadChoices();
        displayChoice = true;
      }
      $("#wait-screen").addClass("d-none");
      $("#timeLeft").text(`Time Left : ${timeLeft}`);
      break;
    case "result":
      setGameState("result");
      setTimeout(() => window.location.reload(), 2800);
      break;
  }
});

socket.on("loadImg", (msg) => {
  const n = msg[0];
  const id = msg[1];
  drawImgToCanvasByN(n, id);
});

socket.on("loadScoreBoard", () => {
  window.location.replace(`score.html?id=${getRoomId()}`);
});

socket.on("loadAnswer", (id) => {
  $(".btn-ans").addClass("disabled");
  drawImgFullImg(id);
  loadRightAns();
});

function showWaitScreen(s) {
  $("#wait-screen").removeClass("d-none");
  $("#wait").text(`${s}`);
}

function showButtonStart() {
  $("#btn-start").removeClass("d-none");
}

async function loadChoices() {
  const room = await Get(`/room/${getRoomId()}`);
  const problem = await Get(`/problem/${room.problems[room.nProblem]}`);
  for (var e in problem.choices) {
    $("#choices").append(
      `<button id="btn-${e}"type="button" class="btn-ans btn btn-light btn-lg" value="${problem.choices[e]}" onClick="onAnswer(this)">${problem.choices[e]}</button>`
    );
  }
}

async function loadRightAns() {
  const room = await Get(`/room/${getRoomId()}`);
  const problem = await Get(`/problem/${room.problems[room.nProblem]}/ans`);
  const idx = problem.choices.findIndex((e) => e == problem.answer);
  console.log(idx);
  $(`#btn-${idx}`).removeClass("btn-light");
  $(`#btn-${idx}`).removeClass("btn-secondary");
  $(`#btn-${idx}`).addClass("btn-success");
}

function drawImgToCanvasByN(n, id) {
  const stepX = Math.floor(856 / 6);
  const stepY = Math.floor(500 / 6);
  const row = Math.floor((n - 1) / 6);
  const col = Math.floor((n - 1) % 6);
  var i = document.getElementById("layer1");
  var ig = i.getContext("2d");
  var background = new Image();
  background.src = `${API_HOST}/pic/${id}/${n}.jpg`;
  background.onload = function () {
    ig.drawImage(background, col * stepX, row * stepY);
  };
}
function drawImgFullImg(id) {
  var i = document.getElementById("layer1");
  var ig = i.getContext("2d");
  var background = new Image();
  background.src = `${API_HOST}/pic/${id}/full.jpg`;
  background.onload = function () {
    ig.drawImage(background, 0, 0);
  };
}

async function onAnswer(e) {
  const room = await Get(`/room/${getRoomId()}`);
  await Post(`/problem/${room.problems[room.nProblem]}`, {
    ans: e.value,
    roomId: getRoomId(),
  });
  e.classList.remove("btn-light");
  e.classList.add("btn-secondary");
  $(".btn-ans").addClass("disabled");
}

async function onStart() {
  await Get(`/room/${getRoomId()}/start`)
  window.location.reload();
}
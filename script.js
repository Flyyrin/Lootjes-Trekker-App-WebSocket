$(document).ready(function () {
  $("#controls").hide();
  $("#result").hide();
  const socket = io.connect("http://localhost:5000");

  function addMessage(message) {
    $("#messages").append(
      `<div class="alert alert-primary border-0" role="alert">${message}</div>`
    );
  }

  function addSuccess(message) {
    $("#messages").append(
      `<div class="alert alert-success border-0" role="alert">${message}</div>`
    );
  }

  function addError(message) {
    $("#messages").append(
      `<div class="alert alert-danger border-0" role="alert">${message}</div>`
    );
  }

  $("#join-btn").on("click", function () {
    const name = $("#nameInput").val();
    const gifts = $("#giftInput").val();

    if (name && gifts) {
      socket.emit("join", { name: name, gifts: gifts });
      $("#form").hide();
      $("#controls").show();
    } else {
      addError("Voer jouw naam en cadeauvoorkeur(en) in!");
    }
  });

  $("#shuffle-btn").on("click", function () {
    socket.emit("shuffle");
  });

  $("#clear-btn").on("click", function () {
    socket.emit("clear");
  });

  socket.on("update", function (data) {
    addMessage(data.message);
  });

  socket.on("success", function (data) {
    addSuccess(data.message);
  });

  socket.on("error", function (data) {
    addError(data.message);
  });

  socket.on("assignment", function (data) {
    $("#result-name").text(data.name);
    $("#result-gifts").text(data.gifts);
    $("#controls").hide();
    $("#messages").hide();
    $("#result").show();
  });

  socket.on("clear", function () {
    $("#messages").empty();
    $("#controls").hide();
    $("#result").hide();
    $("#form").show();
  });
});

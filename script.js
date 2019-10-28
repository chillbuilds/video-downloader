var inputURL = "";
var resp = "";

function ajaxCall() {
  inputURL = $("#urlInput").val();
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://getvideo.p.rapidapi.com/?url=" + inputURL,
    method: "GET",
    headers: {
      "x-rapidapi-host": "Getvideo.p.rapidapi.com",
      "x-rapidapi-key": "50c3507768mshd3e33ce09a430eap1fae7ajsnab00c9f6c026",
      "content-type": "application/x-www-form-urlencoded"
    }
  };
  $.ajax(settings).then(function(response) {
    console.log(response);
    resp = response;
    $("#title").text(resp.title);
    $("#uploader").text(resp.uploader);
    $("#thumb").attr("src", resp.thumbnail);
    $("#audio").text("Audio");
    $("#video").text("Video");
    for (i = 0; i < resp.streams.length; i++) {
      if (
        resp.streams[i].has_audio &&
        resp.streams[i].has_video &&
        resp.streams[i].extension !== "webm"
      ) {
        var x = $("<a>");
        x.addClass("URL");
        x.attr("href", resp.streams[i].url);
        x.attr("download", resp.title);
        x.html(resp.streams[i].format_note + "  " + resp.streams[i].extension);
        $("#video").append(x);
      }
    }
    for (i = 0; i < resp.streams.length; i++) {
      if (resp.streams[i].has_audio && resp.streams[i].has_video == false) {
        var x = $("<a>");
        x.addClass("URL");
        x.attr("href", resp.streams[i].url);
        x.html(resp.streams[i].extension);
        $("#audio").append(x);
      }
    }
    $("#urlInput").val("");
  });
}

$(document).on("keyup", function(event) {
  var k = event.which;
  if (k === 13) {
    ajaxCall();
  }
});

$("#search").on("click", ajaxCall);
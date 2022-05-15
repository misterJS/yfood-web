$(document).ready(function () {
  $('.speaker_card').click(function () {
    $('#myModalSpeaker').css("opacity", 1);
  });
  $('button.close').click(function () {
    $('#myModalSpeaker').css("opacity", 0);
  });
});
$(function(){

$(".go").click(function(){
  var id   = $(this).parent().attr("qwe");
  var type = $(this).attr("type");
  var msg  = $(this).text();

  var obj = {
    "id"  : id,
    "type": type,
    "msg" : msg
  };

  $.post("test", obj);
});

$(".stop").click(function(){
  $.post("stop");
});

});

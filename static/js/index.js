$(function(){

$(".submit").click(function(){
  var id  = $(this).parent().attr("id");
  var top = $($(".top", $(this).parent())[0]).val();
  var bot = $($(".bot", $(this).parent())[0]).val();

  console.log(top);

  $.post("test", {
    "id" : id,
    "top": top,
    "bot": bot
  });
});

$(".stop").click(function(){
  $.post("stop");
});

});

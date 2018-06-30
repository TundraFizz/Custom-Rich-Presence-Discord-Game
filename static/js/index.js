$(function(){

$(".select-top").click(function(){
  var id  = $(this).parent().parent().attr("page");
  var top = $(this).text();
  var bot = null;
  console.log("===========================");
  console.log(id);
  console.log(top);
  console.log(bot);

  $.post("test", {
    "id" : id,
    "top": top
    // "bot": bot
  });
});

$(".select-bot").click(function(){
  var id  = $(this).parent().parent().attr("page");
  var top = null;
  var bot = $(this).text();
  console.log("===========================");
  console.log(id);
  console.log(top);
  console.log(bot);

  $.post("test", {
    "id" : id,
    // "top": top,
    "bot": bot
  });
});

// $(".submit").click(function(){
//   var id  = $(this).parent().attr("id");
//   var top = $($(".top", $(this).parent())[0]).val();
//   var bot = $($(".bot", $(this).parent())[0]).val();

//   $.post("test", {
//     "id" : id,
//     "top": top,
//     "bot": bot
//   });
// });

$(".stop").click(function(){
  $.post("stop");
});

$(".game").click(function(){
  var id = $(this).attr("id");

  $(".page").css("display", "none");
  $(`[page=${id}]`).css("display", "block");
});

});

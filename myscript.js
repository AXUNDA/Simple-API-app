$("p").click(function(){
  $("p").text("new text");
})
$("input").eq(0).keypress(function(event){
  if (event.which===13) {
    $("p").css("color","orange");

  }
})

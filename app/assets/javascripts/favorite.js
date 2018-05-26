function cambiar_clase_corazon(a) {
  var className = a.getAttribute("class");
  if(className=="corazon_no_apretado") {
    a.className = "corazon_apretado";
  }
  else{
    a.className = "corazon_no_apretado";
  }
  
}


function fav(user_id, post_id){
	console.log("user_id:", user_id)
	console.log("post_id:", post_id)
	console.log("/fav/%s/%s", user_id, post_id)
	$.ajax({
        url: "/fav/" + user_id + "/" + post_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
            	console.log('Exito')
                // $("#postulate_text").html("Ya estas postulando para ser moderador de este foro!");
                // $("#action_postulate").html("Dejar de postular");
                // $("#action_postulate").removeAttr('onclick');
                $("#dar_favorito").attr("onclick", "unfav(" + data.info + ", " + user_id + ", " + post_id + ")");
            }
        }
    });
    window.event.stopPropagation();
}

function unfav(id, user_id, forum_id){
    console.log("/unfav/%s", id)
    $.ajax({
        url: "/unfav/" + id,
        type:"DELETE",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
                $("#dar_favorito").attr("onclick", "fav(" + user_id + ", " + forum_id + ")")
            }
        }
    });
    window.event.stopPropagation();
}
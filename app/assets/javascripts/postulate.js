function postulate(user_id, forum_id){
	console.log("/postulate/%s/%s", user_id, forum_id)
	$.ajax({
        url: "/postulate/" + user_id + "/" + forum_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $("#postulate_text").html("Ya estas postulando para ser moderador de este foro!");
                $("#action_postulate").html("Dejar de postular (hacer)");
                $("#action_postulate").removeAttr('onclick');
                $("#action_postulate").attr('disabled', 'disabled');
            }
        }
    });
}

function unpostulate(id, user_id, forum_id){
    console.log("/unpostulate/%s", id)
    $.ajax({
        url: "/unpostulate/" + id,
        type:"DELETE",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
                $("#delete_button_" + user_id + "_" + forum_id).html("Rechazado");
                $("#delete_button_" + user_id + "_" + forum_id).removeAttr('onclick');
                $("#delete_button_" + user_id + "_" + forum_id).attr('disabled', 'disabled');
                $("#accept_button_" + user_id + "_" + forum_id).html("");
                $("#accept_button_" + user_id + "_" + forum_id).removeAttr('onclick');
                $("#accept_button_" + user_id + "_" + forum_id).attr('disabled', 'disabled');
            }
        }
    });
}
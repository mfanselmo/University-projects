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
                $("#action_postulate").html("Dejar de postular");
                // $("#action_postulate").removeAttr('onclick');
                $("#action_postulate").attr("onclick", "unpostulate(" + data.info + ", " + user_id + ", " + forum_id + ")");
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
                $("#postulate_text").html("Podrias ser moderador de este foro!");
                $("#action_postulate").html("Postular");
                $("#action_postulate").attr("onclick", "postulate(" + user_id + ", " + forum_id + ")")
            }
        }
    });
}

function postulate_admin(user_id){
    console.log("/ad_postulate/%s/%s", user_id)
    $.ajax({
        url: "/ad_postulate/" + user_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
                text = "Ya estas postulando para ser administrador!";
                $("#administrate").replaceWith($('<p>' + text + '</p>'));
                $("#administrate").removeAttr('onclick');
                $("#administrate").toggleClass('text-capitalize')
            }
        }
    });
}
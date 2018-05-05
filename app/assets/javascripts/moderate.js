function moderate(user_id, forum_id){
	console.log("/moderate/%s/%s", user_id, forum_id)
	$.ajax({
        url: "/moderate/" + user_id + "/" + forum_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $("#accept_button_" + user_id + "_" + forum_id).html("Aceptado");
                $("#accept_button_" + user_id + "_" + forum_id).removeAttr('onclick');
                $("#accept_button_" + user_id + "_" + forum_id).attr('disabled', 'disabled');
                $("#delete_button_" + user_id + "_" + forum_id).html("");
                $("#delete_button_" + user_id + "_" + forum_id).removeAttr('onclick');
                $("#delete_button_" + user_id + "_" + forum_id).attr('disabled', 'disabled');
            }
        }
    });
}

function unmoderate(id, user_id, forum_id){
    console.log("/unmoderate/%s", id)
    $.ajax({
        url: "/unmoderate/" + id,
        type:"DELETE",
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.result){
                console.log(data);
                $("#action_postulate").html("Postular");
                $("#postulate_text").html("Podrías ser moderador de este foro!");
                $("#action_postulate").attr("onclick", "postulate(" + user_id + ", " + forum_id + ")")
            }
        }
    });
}
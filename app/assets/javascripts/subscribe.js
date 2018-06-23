function subs(user_id, forum_id){
	console.log("sus",user_id, forum_id)
	console.log("/subscribe/%s/%s", user_id, forum_id)
	$.ajax({
        url: "/subscribe/" + user_id + "/" + forum_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $("#subs_button_" + forum_id).html("Desuscribirse");
                $("#subs_button_" + forum_id).attr("onclick", "unsubs(" + data.info.id + ")");
                $("#subs_count").html(data.info.count)
            }
        }
    });
}

function unsubs(subs_id){
	console.log("des", subs_id)
	console.log("/unsubscribe/%s", subs_id)
	$.ajax({
        url: "/unsubscribe/" + subs_id,
        type:"DELETE",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $("#subs_button_" + data.info.forum_id).html("Suscribirse");
                $("#subs_button_" + data.info.forum_id).attr("onclick", "subs(" + 
                	data.result.user_id + ", " + data.result.forum_id + ")");
                $("#subs_count").html(data.info.count)
                // $("#count").removeAttr('onclick');
                // $("#count").attr('disabled', 'disabled');
            }
        }
    });
}
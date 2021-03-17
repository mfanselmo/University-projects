function change_unread(notification_id){
    console.log("/unread/" + notification_id)
    $.ajax({
        url: "/unread/" + notification_id,
        type:"POST",
        dataType:"json",
        success: function(data){
            console.log(data);
            if(data.result){
            	console.log(data);
            }
        }
    });
    window.event.stopPropagation();
}

function delete_notify(notification_id){
    $.ajax({
        url: "/del_notify/" + notification_id,
        type:"DELETE",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
            }
        }
    });
    location.reload();
    return false
}

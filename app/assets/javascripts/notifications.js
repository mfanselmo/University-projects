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
}
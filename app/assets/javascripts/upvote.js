function like(id){
    $.ajax({
        url:"/like/" + id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $("#likes-vote-" + id).html(data.count.votes.like);
                $("#dislikes-vote-" + id).html(data.count.votes.dislike);
                $("#points-vote-" + id).html(data.count.points);
                // $("#count").removeAttr('onclick');
                // $("#count").attr('disabled', 'disabled');
            }
        }
    });
}
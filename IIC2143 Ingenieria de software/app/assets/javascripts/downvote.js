function dislike(id){
    $.ajax({
        url:"/dislike/" + id,
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
    
    window.event.stopPropagation();
}

function cdislike(id){
    $.ajax({
        url:"/c-dislike/" + id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
                $("#c-likes-vote-" + id).html(data.count.votes.like);
                $("#c-dislikes-vote-" + id).html(data.count.votes.dislike);
                $("#c-points-vote-" + id).html(data.count.points);
                // $("#count").removeAttr('onclick');
                // $("#count").attr('disabled', 'disabled');
            }
        }
    });
}
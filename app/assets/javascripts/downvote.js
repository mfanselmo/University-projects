function dislike(id){
    $.ajax({
        url:"/dislike/" + id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
                console.log(data);
                $(".votes-like-count").html(data.count.votes.like);
                $(".votes-dislike-count").html(data.count.votes.dislike);
                $(".post-points").html(data.count.points);
                // $("#count").removeAttr('onclick');
                // $("#count").attr('disabled', 'disabled');
            }
        }
    });
}
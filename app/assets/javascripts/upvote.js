function like(id){
    $.ajax({
        url:"/like/" + id,
        type:"POST",
        dataType:"json",
        success: function(data){
            if(data.result){
            	console.log(data);
                $(".votes-like-count").html(data.count.like);
                $(".votes-dislike-count").html(data.count.dislike);
                // $("#count").removeAttr('onclick');
                // $("#count").attr('disabled', 'disabled');
            }
        }
    });
}
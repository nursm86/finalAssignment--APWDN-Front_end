$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');

    $("#addpost").click(function(){
        addPost();
    });

    var addPost = function(){
        $.ajax({
            url:"http://localhost:57613/api/post",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userId : id,
                postDescription : $("#description").val(),
                image : $("#image").val(),
                postDate: Date($.now())
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    window.location.href = "../post/index.html";
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    var loadPosts = function(){
        $.ajax({
            url:"http://localhost:57613/api/post",
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                        var str='';
                        var likeflag = false;
                        for (var i = 0; i < data.length; i++) {
                            likeflag = false;
                            str +='<div class="card-product col-md-4">';
                            data[i].likes.forEach(element => {
                                if(element.userId == id){
                                    likeflag = true;
                                }
                            });
                            if(data[i].image == "" || data[i].image == null){
                                str +='<b class="add-to-cart">'+data[i].user.name+'</b></br>';
                                str +='<br class="text">'+data[i].postDescription+'</>';
                                str += '<div class="add-to-cart"><span ><b>'+data[i].likes.length+'likes</b><b><i class="fa fa-hand-o-right"></i>'+data[i].comments.length+'comments</b></span></div>';
                                if(likeflag){
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/like.html?id='+data[i].postId+'&method=unlike">UnLike</a></span></div>';
                                }
                                else{
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/like.html?id='+data[i].postId+'&method=like">Like</a></span></div>';
                                }
                                str += '<div class="add-to-cart"><a class="btn btn-success" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/post.html?id='+data[i].postId+'">View the post</a></span></div>';
                                if(data[i].user.userId == id){
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/editPost.html?id='+data[i].postId+'">Edit</a></span></div>';
                                }
                            }
                            else{
                                str +='<b class="add-to-cart">'+data[i].user.name+'</b></br>';
                                str += '<img class="card-image" src="'+data[i].image+'"></img>';
                                str +='<b class="text">'+data[i].postDescription+'</b>';
                                str += '<div class="add-to-cart"><span ><b>'+data[i].likes.length+'likes</b><b><i class="fa fa-hand-o-right"></i>'+data[i].comments.length+'comments</b></span></div>';
                                if(likeflag){
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/like.html?id='+data[i].postId+'&method=unlike">UnLike</a></span></div>';
                                }
                                else{
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/like.html?id='+data[i].postId+'&method=like">Like</a></span></div>';
                                }
                                str += '<div class="add-to-cart"><a class="btn btn-success" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/post.html?id='+data[i].postId+'">View the post</a></span></div>';
                                if(data[i].user.userId == id){
                                    str += '<div class="add-to-cart"><a class="btn btn-warning" style="width:185px;font-family:consolas;margin-top:5px;" href="../post/editPost.html?id='+data[i].postId+'">Edit</a></span></div>';
                                }
                            }
                            str +='</div>';
                        }
                        
                        $('#post').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadPosts();
});
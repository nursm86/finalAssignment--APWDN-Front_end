$(document).ready(function(){
    var uname = Cookies.get('uname');
    var pass = Cookies.get('pass');
    var id = Cookies.get('id');
    function getParams() {
        var idx = document.URL.indexOf('?');
        var params = new Array();
        if (idx != -1) {
            var pairs = document.URL.substring(idx + 1, document.URL.length).split('&');
            for (var i = 0; i < pairs.length; i++) {
                nameVal = pairs[i].split('=');
                params[nameVal[0]] = nameVal[1];
            }
        }
        return params;
    }
    params = getParams();
    var postId = unescape(params.id);

    var addComment = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId+"/comments",
            method:"POST",
            header:"Content-Type:application/json",
            data:{
                userId: id,
                comment1 : $('#comment').val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==201)
                {
                    loadPostInfo();
                    $('#comment').val("");
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    var loadPostInfo = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId,
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
                    if(data.image !=""){
                        str +='<img class="item-image" src="'+data.image+'"></img>';
                    }
                    str +='<h2><b class="text">'+data.postDescription+'</b></h2>';
                    for(var i=0;i<data.comments.length;i++){
                        str += '<h5 class="add-to-cart" style="margin-top: 10%; margin-bottom: 0%;">'+data.comments[i].user.name+'</h5>';
                        str += '<h4 class="text">'+data.comments[i].comment1+'</h4>';
                        str += '<a class="add-to-cart" href="#">edit  </a><a href="#">delete</a>';
                    }
                    $('#postInfo').html(str);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadPostInfo();
    $("#addcmnt").click(function(){
       addComment(); 
    });
});
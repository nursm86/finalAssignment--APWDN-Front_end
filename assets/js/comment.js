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
    var postId = unescape(params.pid);
    var cmntId = unescape(params.cid);

    $("#editcmnt").click(function(){
        editComment();
    });

    $("#deletecmnt").click(function(){
        deleteComment();
    });

    var editComment = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId+"/comments/"+cmntId,
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                userId : id,
                comment1 : $("#editcomment").val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    window.location.href = "../post/Post.html?id="+postId;
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    var deleteComment = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId+"/comments/"+cmntId,
            method:"DELETE",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==204)
                {
                    window.location.href = "../post/Post.html?id="+postId;
                }
                else
                {
                    $("#smsg").html("Something Went Wrong!!!");
                }
            }
        });
    };

    var loadComment = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId+"/comments/"+cmntId,
            method:"GET",
            header:"Content-Type:application/json",
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
                {
                    var data=xmlhttp.responseJSON;
                    $('#editcomment').val(data.comment1);
                    if(id != data.userId){
                        $('#editcmnt').hide();
                    }
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadComment();
});
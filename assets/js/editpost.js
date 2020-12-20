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


    $("#editpost").click(function(){
        editPost();
    });

    var editPost = function(){
        $.ajax({
            url:"http://localhost:57613/api/post/"+postId,
            method:"PUT",
            header:"Content-Type:application/json",
            data:{
                userId : id,
                postDescription : $("#description").val(),
                image : $("#image").val()
            },
            headers: {
                "Authorization": "Basic " + btoa(uname+ ":" + pass)
            },
            complete:function(xmlhttp,status){
                if(xmlhttp.status==200)
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
                    $('#description').val(data.postDescription);
                    $('#image').val(data.image);
                }
                else
                {
                    alert("Something Went Wrong");
                }
            }
        });
    };
    loadPostInfo();
});
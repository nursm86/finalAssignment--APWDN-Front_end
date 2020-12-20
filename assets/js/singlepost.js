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
    var postId = unescape(params["id"]);


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
                    str +='<b class="text">'+data.postDescription+'</b>';
                    str +='<input type="text" placeholder="Type your Comments here" style="width:185px;font-family:consolas;margin-top:5px;" class="form-control">';
                    str +='<div class="add-to-cart"><a class="btn btn-success" style="width:185px;font-family:consolas;margin-top:5px;">Comment</a></span></div>';

                    for(var i=0;i<data.comments.length;i++){
                        str += '<h4 class="add-to-cart" style="margin-top: 10%; margin-bottom: 0%;">'+data.comments[i].user.name+'</h4>';
                        str += '<h3 class="text">'+data.comments[i].comment1+'</h3>';
                        str += '<a class="add-to-cart" href="#">edit  </a><a>delete</a>';
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
});
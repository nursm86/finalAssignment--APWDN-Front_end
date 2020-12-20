$(document).ready(function(){

$("#userName").focus(function(){
	$("#msg").html("");
});

$("#password").focus(function(){
	$("#msg").html("");
});

$("#login").click(function(){
		Validate();
});

var Validate = function(){
	$.ajax({
		url:"http://localhost:57613/api/user/login",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			userName:$("#userName").val(),
			password:$("#password").val()
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==202)
			{
				Cookies.set("uname",$("#userName").val());
				//var cookieVal = Cookies.get('uname');
				Cookies.set("pass",$("#password").val());
				window.location.href = "../Post/index.html";
			}
			else
			{
				$("#msg").html("Wrong User Name or password!!");
			}
		}
	});
};


$("#signup").click(function(){
	SignUp();
});

var SignUp = function(){
	$.ajax({
		url:"http://localhost:57613/api/user",
		method:"POST",
		header:"Content-Type:application/json",
		data:{
			userName:$("#uname").val(),
			password:$("#pass").val(),
			Name:$("#name").val()
		},
		complete:function(xmlhttp,status){
			if(xmlhttp.status==201)
			{
				alert("Account Created Successfully now you can login");
				window.location.href = "../login/Login&Signup.html";
			}
			else
			{
				$("#smsg").html("Something Went Wrong!!!");
			}
		}
	});
};


$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  $(target).fadeIn(600);
  
});
});
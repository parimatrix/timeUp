$(function() {
    $('#started').click(function () {
        console.log("started");
        var username = $('#newuser').val();
        var mypass = $('#newuserpass').val();
$.get('/passwordcheck?name='+username+'&secondtier='+mypass , function (result) {
    if(result === "galat user")
    {
        console.log("galat user");
        $('#invalid').css({"z-index" : "1000" , "opacity": "1"});
        setTimeout(function () { $('#invalid').css({"z-index" : "1000" , "opacity": "0"}); } , 2000);
    }
    else
    {
        window.location = './home.html';
        localStorage.setItem("current_user" , JSON.stringify(username));

        $.get('/setuser?name='+$('#newuser').val() , function() {
            console.log("username updated");
        });

        $.get('/pointexists?name='+$('#newuser').val()+'&second='+mypass, function (data) {
            console.log(data);
        });
    }
});
  /*      localStorage.setItem("current_user" , JSON.stringify(username));

        $.get('/setuser?name='+$('#newuser').val() , function() {
            console.log("username updated");
        });

        $.get('/pointexists?name='+$('#newuser').val(), function (data) {
           console.log(data);
        });*/
    })
});
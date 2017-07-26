var point_user;
function senduser(data,cb)
{
    point_user = JSON.parse(localStorage.getItem("current_user"));
    console.log(point_user + 'user sent');
    cb();
}
function please() {
$(function () {
    console.log(point_user);
    $.get('/getpoints?name='+point_user, function(data) {
        $('#n2').html('');
        $('#n2').append(data[0].points);
        $('#n1').html('');
        $('#n1').append(data[0].thisweek);
        console.log(data);
    });
})
}
$(function () {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
        }
        return "";
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function checkCookie() {
        var lightbox = getCookie("lightbox");
        var todocookie = getCookie("todocookie");
        if (lightbox === "") { // Cookie not set
            $.get('/weekly' , function () {
                console.log('week updated');
            })
            setCookie("lightbox", "seen", 7);
        }
        if(todocookie === "") {

            setCookie("todocookie","seen",1);
        }
    }
    checkCookie();
});
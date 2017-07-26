/**
 * Created by ParikanshAndAtikant on 10/07/2017.
 */
var boards = [];
var user = '';
var notification_id;
$(function () {
    var user = JSON.parse(localStorage.getItem("current_user"));
    $.get('/getcodechef',function (data) {
        $('#floatingCirclesG').css("display","none");
       $('#codechef p').html('');
        $('#codechef p').append(data);
        var x = $('#codechef p a').attr("href");
        $('#codechef p a').attr("href",'https://www.codechef.com/problems/school' + x);
    });

   /* $.get('/giveuser', function (data) {
        user = data;
        senduser(user,please);
        $('#gg').append('  ' + data);
        
    });
    */
    function giveuser()
    {
        senduser(user,please);
        $('#gg').append('  ' + user);
    }
    giveuser();

    function renderboards() {
        var i = 0;

        /*
         var obj = {
         "name" : ,
         "message" : ,
         "link" : ,
         "ctr" : ,
         }
         */
        $.get('/boardshow', function (result) {
            boards = result;
            $('#innerpeerboard').html('');
            for (i = 0; i < boards.length; i++) {
                console.log("rendering boards");
                if (boards[i].link === "")
                    $('#innerpeerboard').append(
                        '<div class="board"> <p class = "heading">' + boards[i].name + '</p> <p class = "message">' + boards[i].message + 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p> <p class = "links">Link : ' + boards[i].link + '</p> <p id = "likes' + i + '" class="likes"><i onclick="upme(this)" id = "up' + i + '" class="fa fa-plus upvote" aria-hidden="true"></i>&nbsp;&nbsp;' + boards[i].ctr + '</p> </div>');
                else
                    $('#innerpeerboard').append(
                        '<div class="board"> <p class = "heading">' + boards[i].name + '</p> <p class = "message">' + boards[i].message + 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.</p> <p class = "links">Link : ' + boards[i].link + '</p> <b><p onclick = "notifyme(this)" id="claim' + i + '" style="cursor : pointer; display : inline; color: #E64032;font-size : 20px">Claim points !</p></b><p id = "likes' + i + '" class="likes"><i onclick="upme(this)" id = "up' + i + '" class="fa fa-plus upvote" aria-hidden="true"></i>&nbsp;&nbsp;' + boards[i].ctr + '</p> </div>');
            }
        });
    }

    function rendernotifications() {
        $.get('/shownotifications', function (data) {
            var i = 0;
            $('#notifications').html('');
            for (i = 0; i < data.length; i++) {
                console.log(data[i].touser + ' and ' + user);
                if (data[i].touser === user)
                    if(data[i].content.indexOf("claimed") !== -1)
                     $('#notifications').append('<li class="noteli" id = "notif' + data[i].id + '"><a href="' + data[i].link + '">' + data[i].fromuser + ' ' + data[i].content +' </a><button class="notebutton" id="nb'+data[i].id+'" onclick = "notebutton(this)">Rate Now</button></li>');
                    else
                        $('#notifications').append('<li class="noteli" id = "notif' + data[i].id + '"><a href="' + data[i].link + '">' + data[i].fromuser + ' ' + data[i].content +' </a><button style = "display: none" class="notebutton" id="nb'+data[i].id+'" onclick = "notebutton(this)">Rate Now</button></li>');
                //$('#notifications').append(''<a href = ""'<li>' + data[i].fromuser + ' ' + data[i].content + ' on <a href = "' + data[i].link +'">this</a></li>');}
            }
            ;
        });
    }

    rendernotifications();
    renderboards();
    $('#closerating').click(function () {
        $('#closerating').css({"display":"none","opacity":"0"});
        $('#ratingbox').css("left", "-40%");
        $('#overlay').css("opacity" , "0");
        $('#overlay').css("z-index" , "-1000");
    });
    $('#final_board').click(function () {
        $.get('/mynewboard?user='+user+'&mes=' + $('#mymessage').val() + '&link=' + $('#mylink').val(), function () {
            console.log("board created from client");
            renderboards();
        });
        $('#boardcreator').css("margin-left", "100%");
    });
    $('#main_create').click(function () {
        $('#boardcreator').css("margin-left", "0px");
    });

});
function notebutton(obj) {
    notification_id = obj.id.replace("nb",'');
    console.log(obj.class);
    console.log("notebutton");
    $('#ratingbox').css("left", "40%");
    $('#overlay').css("opacity" , "1");
    $('#closerating').css({"display":"block","opacity":"1","z-index":"5000"});
    $('#overlay').css("z-index" , "1000");
}
function upme(obj) {
    var user = JSON.parse(localStorage.getItem("current_user"));
    if($('#'+ obj.id).parent().siblings('.heading').text() !== user) {
        console.log("ipvote pe" + $('#'+ obj.id).parent().siblings('.heading').text() +'aur' +user );
    var x = obj.id;
    console.log(obj);
    console.log(x);
    x = x.substring('up'.length);
    console.log(x);
    x = parseInt(x);
    console.log(x);
    $.get('/upvoteme?id='+x+'&user='+user, function(data) {
        data = data.substring('a'.length);
        data = parseInt(data);
       $('#likes'+x).html('<i id = "up'+x+'" class="fa fa-plus upvote" aria-hidden="true"></i>&nbsp;&nbsp;'+data+' ')
        //$('#'+obj.id).css("display", "none");
    });

}}
function notifyme(obj) {
    $('#invalid').css({"z-index" : "1000" , "opacity": "1"});
    setTimeout(function () { $('#invalid').css({"z-index" : "1000" , "opacity": "0"}); } , 2000);
    console.log(obj.id);
    var user = JSON.parse(localStorage.getItem("current_user"));
    console.log($('#'+ obj.id).parent().siblings('.heading').text());
    if($('#'+ obj.id).parent().siblings('.heading').text() !== user)
    {$.get('/notification?from=' + $('#'+ obj.id).parent().siblings('.heading').text() + '&link=' +$('#'+ obj.id).parent().siblings('.links').text().replace("Link : ", '')+'&user='+user  , function () {
            console.log("notification added");
            //rendernotifications();
    });}
}
function sendrating(obj)
{
    $('#ratingbox').css("left", "-40%");
    $('#overlay').css("opacity" , "0");
    $('#overlay').css("z-index" , "-1000");
    console.log("sending rating");
    var rating = $('#rateinput').val();
    var id = notification_id;
    console.log('note_id='+notification_id);
    $.get('/sendrating?rating='+rating+'&id='+id, function () {
        console.log("notification added");
    })
}
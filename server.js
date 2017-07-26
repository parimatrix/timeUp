/**
 * Created by ParikanshAndAtikant on 10/07/2017.
 */
var express = require('express');
var fs = require('fs');
var app = express();
var todolist = [];
var boards = [];
var users = [];
var current_user = "parikansh";
var sql = require('./db');
var request = require('request');
var cheerio = require('cheerio');

app.get('/getcodechef' , function (req,res) {
console.log("chheerio");
    var final = '';
var url = 'https://www.codechef.com/problems/school';
request(url,function (err,ress,html) {
    console.log("cheerio");
  if(!err)
  {
      console.log("in cheerio");
      var $ = cheerio.load(html);
      $('.problemname a').first().filter(function () {
          var data = $(this);
          final = data.toString();
      });
      res.send(final);
  }
})
});
app.use('/' , express.static('public_static'));
/*
app.get('/getcodechef' , function (req,res) {
    var final = '';
    casper.start('https://www.codechef.com/problems/school' , function () {
        var message = "Welcome to";
        //this.capture('./output/test.png');
        var title = this.evaluate(function (message) {
            var title = document.querySelector(".problemname a").getAttribute("href").toString();
            return message + "  " + title;
        },message);
        final = title;
    });
    casper.then(function () {
        this.exit();
    });
    res.send(final);
});
*/


/*      CHANGED
app.get('/giveuser', function (req,res) {
   res.send(current_user);
});


*/

app.get('/pointexists' ,function (req,res) {
   var query = 'SELECT * from users WHERE username="'+req.query.name+'"';
    sql.notification(query,function (data) {
        if(data.length !== 0)
         res.send('old user');
        else {
            var myquery = 'INSERT INTO users(username,points,password,thisweek) VALUES("'+req.query.name+'",0,"'+req.query.second+'",0)';
            sql.notification(myquery, function (data) {
                res.send("new user")
            })
        }
    });
});
app.get('/setuser' , function (req,res) {
   current_user = req.query.name;
    fs.readFile('users.txt', function (err, data) {
        if (err) throw err;
        var i = 0,flag = 0;
        users = JSON.parse(data);
        for(i=0;i<users.length;i++)
        {
            if(users[i].name === current_user)
            {
                flag = 1;
            }
        }
        if(flag===0)
        {
            users.push({
                name : current_user,
                points : 0
            })
        }
        fs.writeFile('users.txt' , JSON.stringify(users), function (err) {
            if(err) throw err;
            console.log("saved user in file");
            //console.log(current_user);
            res.send('');
        });
    });


});
app.get('/todo' , function (req,res) {
   var obj = {
       "username" : req.query.user ,
       "task1" : req.query.task1,
       "task2" : req.query.task2,
       "task3" : req.query.task3,
       "done1" : 0,
       "done2" : 0,
       "done3" : 0,
       "locked" :0
   };
   todolist.push(obj);
    fs.writeFile('todo.txt' , JSON.stringify(todolist), function (err) {
        if(err) throw err;
        console.log("saved todo in file");
        res.send('');
    });

});

app.get('/todoshow' , function (req,res) {
   var i = 0,flag=0,x=0;
   current_user = req.query.user;
    fs.readFile('todo.txt', function (err, data) {
        if (err) throw err;
        todolist = JSON.parse(data);
        /*console.log("updated from text file");
        console.log("todolist array sent");
        res.send(todolist);*/
        for(i=0;i<todolist.length;i++)
        {
            if(todolist[i].username === current_user)
            {
                flag = 1;
                x = i;
                //res.send(todolist[i]);
            }
        }
        if(flag === 0)
         res.send('');
        else
         res.send(todolist[x]);
    });
});
app.get('/setlocked',function (req,res) {
    fs.readFile('todo.txt', function (err, data) {
        if (err) throw err;
        todolist = JSON.parse(data);
        current_user = req.query.user;
        /*console.log("updated from text file");
         console.log("todolist array sent");
         res.send(todolist);*/
        for(i=0;i<todolist.length;i++) {
            if (todolist[i].username === current_user) {
                todolist[i].locked = 1;
            }
        }
        fs.writeFile('todo.txt' , JSON.stringify(todolist), function (err) {
            if(err) throw err;
            console.log("saved locked in file");
            res.send('');
        });
    });
});
app.get('/todoclick',function (req,res) {
    var i = 0;
    fs.readFile('todo.txt', function (err, data) {
        if (err) throw err;
        todolist = JSON.parse(data);
        current_user = req.query.user;
        /*console.log("updated from text file");
         console.log("todolist array sent");
         res.send(todolist);*/
        for(i=0;i<todolist.length;i++) {
            if (todolist[i].username === current_user) {
                var x = req.query.num;
                if(x == "done1")
                 todolist[i].done1 = 1;
                if(x == "done2")
                    todolist[i].done2 = 1;
                if(x == "done3")
                    todolist[i].done3 = 1;
            }
        }
        fs.writeFile('todo.txt' , JSON.stringify(todolist), function (err) {
            if(err) throw err;
            console.log("saved todo in file");
            res.send('');
        });
    });
});

app.get('/boardshow' , function (req,res) {
    var i = 0,flag=0;
    fs.readFile('boards.txt' , function (err,data) {
       if(err) throw err;
       boards = JSON.parse(data);
       res.send(boards);
    });
});

app.get('/mynewboard' , function (req,res) {
   current_user =  req.query.user;
    var obj = {
      "name" : current_user,
      "message" : req.query.mes,
      "link" : req.query.link,
      "ctr" : 1
   };
   boards.unshift(obj);
    fs.writeFile('boards.txt' , JSON.stringify(boards), function (err) {
        if(err) throw err;
        console.log("saved board in file");
        res.send('');
    });

});
app.get('/upvoteme',function (req,res) {
    var y = 0;
    fs.readFile('boards.txt' , function (err,data) {
        if(err) throw err;
        boards = JSON.parse(data);
        console.log(req.query.id);
        boards[req.query.id].ctr++;
        current_user = req.query.user;
        console.log(boards[req.query.id].name + ' ko upvote mila from ' + current_user);
        var query = 'UPDATE users SET points = points + 5, thisweek = thisweek + 5 WHERE username = "'+boards[req.query.id].name + '"';
        sql.notification(query,function (data) {
           console.log('point increased');
        });
        y = boards[req.query.id].ctr;
        fs.writeFile('boards.txt' , JSON.stringify(boards), function (err) {
            if(err) throw err;
            console.log("saved board after upvote in file");
            res.send('a'+y);
        });

    });
});

app.get('/notification' , function (req,res) {
    current_user = req.query.user;
    var query = 'INSERT INTO notifications(fromuser,touser,content,link) VALUES ("' +current_user + '","' + req.query.from + '","has claimed points for his edit.","' + req.query.link + '")';
    sql.notification(query,function (data) {
        res.send(data);
    });
});
app.get('/shownotifications', function (req,res) {
   var query = 'SELECT * FROM notifications';
   sql.notification(query,function (data) {
      res.send(data);
   });
});
app.get('/sendrating' , function (req,res) {
    var query = 'SELECT * FROM notifications WHERE id='+req.query.id;
    sql.notification(query,function (data) {
       var switchto = data[0].fromuser;
       var switchfrom = data[0].touser;
       var link = data[0].link;
       var content = "gave you "+ req.query.rating + " points for edit.";
       var myquery = 'INSERT INTO notifications(fromuser,touser,content,link) VALUES("' + switchfrom + '","' + switchto +'","' + content + '","'+link+'")';
       sql.notification(myquery,function (data) {
          console.log("hello");
       });
       myquery = 'UPDATE users SET points = points + (10*'+req.query.rating+'), thisweek = thisweek + (10*'+req.query.rating+')WHERE username = "'+switchto + '"';
        sql.notification(myquery,function (data) {
            res.send('');
        });
    });
});
app.get('/getpoints' , function (req,res) {
var query = 'SELECT * FROM users where username="'+req.query.name+'"';
sql.notification(query,function (data) {
   res.send(data);
});
});

app.get('/getleaderboard' , function (req,res) {
    var query = 'SELECT * FROM users';
    sql.notification(query, function (data) {
        var mydata = data;
        mydata.sort(function (a, b) {
            return parseInt(b.points) - parseInt(a.points);
        });
        res.send(mydata);
    });
});
app.get('/weekly' , function (req,res) {
    var query = 'UPDATE users SET thisweek = 0';
    sql.notification(query,function () {
        console.log("weekly chal gaya");
        res.send('');
    });

});
app.get('/passwordcheck',function (req,res) {
   var query = 'SELECT * FROM users where username="'+req.query.name+'"';
   sql.notification(query,function (data) {
       if(data.length == 0)
       {
           console.log("yeh naya banda hai");
           res.send("naya banda");
       }
       else {
           if(data[0].password == req.query.secondtier) {
               res.send("sahi user");
           }
           else {
               res.send("galat user");
           }
       }
   })
});
app.listen(4000 , function () {
    console.log("Server is running on 4000");
});

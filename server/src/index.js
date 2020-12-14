
const express = require('express');
var port = 3000;
const cors = require('cors');         // express의 cors모듈 로드
const nodemailer = require('nodemailer');
//const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const sql = require('mysql');

const sqlssh = require('mysql-ssh');
const tunnel = require('tunnel-ssh');
const fs = require('fs');
const Sequelize = require('sequelize');
const ppk = fs.readFileSync('D:/dev/vue_project/ppkey/ssh_id.ppk', 'utf-8');

const config = require('./DBConfig');
const app = express();
//passport.use()

let tempAuthNum = '';



// express의 cors 미들웨어를 통한 cross origin 허용 설정
app.use(cors());
app.use(express.json())                                     // 이 코드가 있어야지 body값을 가져올 수 있음.



// host     : '13.209.70.57',
// user     : 'ubuntu',
// password : 'Zocm6GlxWQPS',
// database : 'movie_work'


const sequelize = new Sequelize('DBname', 'userName', 'password', {
    host: '13.209.70.57',
    port: 3306,
    dialect: "mysql",
  });


var sshConfig = {
      username:'ubuntu',
      host:'13.209.70.57',
      port:22,
      dstHost:'localhost',
      dstPort:3306,
      localHost:'localhost',
      localPort: 3307,
      privateKey: ppk
}

// initiate tunnel
// tunnel(sshConfig, (error, server) => {
//     if(error) {
//       console.error(error);
//     } else {
//       console.log('server:', server);
//       sequelize
//           .authenticate()
//           .then((db) => {
//               console.log('CONNECTION ESTABLISHED! ', db);
//           })
//           .catch((err) => {
//               console.error('UNABLE TO ESTABLISH CONNECTION: ', err);
//           })
//     }
//   })



// aws ec2  디비 연결 안됨.
// Error: connect ETIMEDOUT => 테스트 해보니, host주소가 틀릴 때 나옴,,,

// var connection = sql.createConnection({
//     host     : 'ec2-13-209-70-57.ap-northeast-2.compute.amazonaws.com',
//     //port     :  3307,
//     user     : 'root',
//     password : 'Zocm6GlxWQPS',
//     database : 'android_work'
//   });

  

// All configured authentication methods failed 에러로 안됨,
// sqlssh.connect(
//     {
//         host: '13.209.70.57',
//         user: 'ubuntu',
//         privateKey: fs.readFileSync('D:/dev/vue_project/ppkey/ssh_id.ppk', 'utf-8')
//     },
//     {
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'Zocm6GlxWQPS',
//         database: 'movie_work'
//     }
// ).then(client => {
//     client.query('SELECT * FROM user', function (err, res, fields) {
//         if (err) throw err
//         console.log('res : ' + res);
//     })
// }).catch(err => {
//     console.log('err : ', err)
// })









// 일본 dtpia디비는 됨....
// var connection = sql.createConnection({
//   host     : '211.206.227.168',
//   user     : 'jpdtpia',
//   password : '!dtpiajp',
//   database : 'dtpia'
// });



// 일본 dtpia디비는 됨....
// var connection = sql.createConnection({
//   host     : '211.206.227.168',
//   user     : 'jpdtpia',
//   password : '!dtpiajp',
//   database : 'dtpia'
// });

// aws ec2 안됨.. ip주소가 이상 ?
// aws ec2인스턴스에서 mysql port를 개방안하고, bind-address: 127.0.0.1 이어서 오류
var connection = sql.createConnection({
    host     : '13.209.70.57',
    user     : 'root',
    password : 'Zocm6GlxWQPS',
    database : 'movie_work'
  });



connection.connect(function (err){
    if(err){
        console.log('connect_err : ' + err.stack)
        return;
    }

    console.log('connected as id : ', connection.threadId);
});


/*
connection.query('SELECT * FROM user', function (err, res, fields) {
    if (err){
        console.log('err : ', err)
    }
    console.log('result : ' + JSON.stringify(res));
    connection.end();
    
});
*/


/*
connection.query('SELECT * FROM jos_dtpia_area', function (err, res, fields) {
    if (err){
        console.log('err : ', err)
    }
    //console.log('result : ' + JSON.stringify(res));

    for(var key in res){
        console.log('attributes: ' + key, ', value: ' + JSON.stringify(res[key]))
    }
    
});
*/


app.post('/emailAuth', (req, res) => {
    console.log('emailAuth')

    let authNum = Math.random().toString().substr(2,6);
    console.log('authNum : ', authNum)

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        secire: false,
        auth: {
            user: 'kdgosu53@gmail.com',
            pass: 'aokbukuvkrceyvvw',
        }
    });
    
    var mailOptions = {
        from: 'kdgosu53@gmail.com',
        to: 'kdgosu53@naver.com',            // 나중에 회원가입 시 적은 회원 이메일을 적어야 됨.
        subject: '본인인증 확인',
        html: `<p> 회원가입을 위한 인증번호 입니다.</p>
                <p>아래의 인증 번호를 입력하여 인증을 완료해주세요.</p>
                <h2> ${authNum} </h2>`
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);

          tempAuthNum = authNum;

          console.log('tempAuthNum : ', tempAuthNum)

          res.json({
              authNum : authNum
          })
        }
      });
})

app.post('/emailAuthConFirm', (req, res) => {
    console.log('emailAuthConFirm')

    console.log('emailAuthConFirm_req11 : ', req.body)
    console.log('emailAuthConFirm_req22 : ', req.body.authNum)
    console.log('tempAuthNum : ', tempAuthNum)
    let client_authNum = req.body.authNum;

    // 클라이언트에서 보내온 인증번호와 이메일로 보낸 인증번호 확인
    if(client_authNum === tempAuthNum){
        console.log('true')
        res.json({
            result: 'ok'
        })
    }else{
        res.json({
            result: 'false'
        })
    }
})

var client_id = 'YOUR_CLIENT_ID';
var client_secret = 'YOUR_CLIENT_SECRET';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("YOUR_CALLBACK_URL");
var api_url = "";


// 네이버 로그인
app.get('/naverlogin', function (req, res) {
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
     res.end("<a href='"+ api_url + "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>");
   });







// 회원가입 시 함수
app.post('/joinProcess', function(req, res){
    console.log('=========== joinProcess ===========');
    console.log('res : ', req.body)

    var id = req.body.id;
    var email = req.body.email;
    var name = req.body.name;
    var passwd = req.body.phone;
    var phone = req.body.phone;
    var birth = req.body.birth;
    var platform_type = req.body.platform_type;

    try{

        connection.query(`INSERT INTO USER(id, email, name, passwd, phone, birth, create_date, platform_type)
                    VALUE('${id}','${email}','${name}','${passwd}','${phone}','${birth}',NOW(),'${platform_type}')`, function (err, result, fields) {
            if (err){
                console.log('err : ', err)
            }

            console.log('result : ' + JSON.stringify(result));
            connection.end();

            res.status(201).json({
                result : 'ok',
            });
        });

     
            
     } catch (err) {
        // ... error checks
        console.log('err is ', err)
     }



});


// 유저 확인 (임시)
app.post('/userCheck', function (req, res) {
    console.log('=========== userCheck ===========');
    console.log('res : ', req.body)

    var id = req.body.id;

    connection.query(`SELECT * FROM user WHERE id = '${id}'`, function (err, res, fields) {
    if (err){
        console.log('err : ', err)
    }
    console.log('result : ' + JSON.stringify(res));
    connection.end();
    
});


});

   





// localhost:3000 포트 사용
// 배포시 실서버 주소로 ?
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
 })







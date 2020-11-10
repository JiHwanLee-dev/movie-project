
const express = require('express');
const app = express();
var port = 4000;  
const cors = require('cors');         // express의 cors모듈 로드
const nodemailer = require('nodemailer');

let tempAuthNum = '';



// express의 cors 미들웨어를 통한 cross origin 허용 설정
app.use(cors());
app.use(express.json())                                     // 이 코드가 있어야지 body값을 가져올 수 있음.


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




// localhost:4000 포트 사용
// 배포시 실서버 주소로 ?
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
 })







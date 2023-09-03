const GameUserRegister = require('../models/GameUserRegister')
const Razorpay = require('razorpay');
const Notification = require('../models/notification');
const { mongoose } = require('mongoose');

const nodemailer = require('nodemailer');


module.exports.registerGameController = async (req, res) => {
    try{
        const { teamLeader, player2, player3, player4, orderId } = req.body;

        var instance = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
        });

        const amountInfo = await instance.orders.fetch(orderId);

        if(amountInfo.amount_due === 0){

            const gamerRegistered = await GameUserRegister.create({
                TeamLeader : teamLeader,
                Player2 : player2,
                Player3 : player3, 
                Player4 : player4, 
                orderId : orderId,
            });

            // sending email :-> 
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'princekr.it.21@gmail.com',
                  pass: 'oyyisqqoqgpxjehj'
                }
            });
              
            const mailOptions = {
                from: 'princekr.it.21@gmail.com',
                to: teamLeader.collegeEmail,
                cc: [player2.collegeEmail, player3.collegeEmail, player4.collegeEmail],
                subject: 'Successful Registeration to EsportsAkhada Event',
                html: 
                `<h1>Congratulations, Team ${teamLeader.teamname}!</h1>

                <p>You're now officially part of the gaming revolution! 🚀</p>

                <p>Welcome to EsportsAkhada Gaming Event, where the virtual world comes to life with excitement, adrenaline, and unforgettable moments. Get ready to embark on an epic journey, filled with challenges, camaraderie, and the thrill of victory.</p>

                <p>Your passion for gaming has ignited a spark, and we can't wait to see you in action. Whether you're a seasoned pro or a rookie ready to conquer, this event is your stage to shine.</p>
        
                <p>Get your controllers ready, because you're about to experience heart-pounding battles, mind-bending puzzles, and the joy of gaming like never before. It's time to level up your skills and make your mark in the gaming universe!</p>
        
                <p>Remember, it's not just about winning; it's about the journey, the friendships you'll forge, and the memories you'll create. You're now part of a community that shares your passion for gaming, and together, we'll make this event legendary.</p>
        
                <p>Stay tuned for updates, schedules, and all the details you'll need to make the most of this gaming extravaganza. The countdown has begun, and we can't wait to see you at the event!</p>
        
                <p>Game on, ${teamLeader.teamname}! Your adventure starts now, and we believe in you. Let's make history together. 🏆</p>
        
                <p>Best Regards,<br>EsportsAkhada</p>`
            };
              
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Email sent:', info.response);
                }
            });

            return res.status(200).json({
                id : `${gamerRegistered._id}`,
                isPaid : true,
            })

        }else{
            return res.status(200).json({
                isPaid : false,
            })
        }
        
    }catch(e){
        console.log(error);
    }
}

module.exports.paymentHandler = async (req, res) => {
    try{

        var instance = new Razorpay({
            key_id: process.env.key_id,
            key_secret: process.env.key_secret,
          });

          const orderResult = await instance.orders.create({
            amount: 100*100,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
              key1: "value3",
              key2: "value2"
            }
          })

          console.log(orderResult);
          res.send(orderResult);

    }catch(e){
        console.log("error in payment >> ", e);
        res.send(e);
    }
}

module.exports.notificationHandler = async (req, res) => {
    try{
        const notificationId = req.params.id;

        console.log("notificationId >> ",notificationId);


        const isRegisteredUser = await GameUserRegister.findById(notificationId);
        console.log("regi >>> ",isRegisteredUser);

        if(isRegisteredUser){

            const notifications = await Notification.find({});

            const message = [...notifications, { createdAt : isRegisteredUser.createdAt, teamName : isRegisteredUser.TeamLeader.teamname }];

            return res.status(200).json({
                isValid : true,
                message : message,
            })

        }else{

            return res.status(200).json({
                isValid : false, 
                message : "Please complete the registeration."
            })

        }

    }catch(e){
        console.log("error" , e);
        res.send(e)
    }
}


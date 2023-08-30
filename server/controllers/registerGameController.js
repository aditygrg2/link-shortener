const GameUserRegister = require('../models/GameUserRegister')
const Razorpay = require('razorpay');

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
                orderId : orderId
            });

            return res.status(200).json({
                id : `EsportsAkhada-${gamerRegistered._id}`,
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
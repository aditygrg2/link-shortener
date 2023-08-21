const { languages } = require('../constants/urls');
const Link = require('../models/link');
const randomstring = require('randomstring');
const { calculateGTLink, manageExpiryDate } = require('../utils/main');
const {CLIENT_URL} = require('../constants/urls');
module.exports.shortenURL = async (req, res) => {
    const path = req.body.path;

    if(!path){
        return res.status(200, {
            error: "Incorrect URL"
        })
    }

    const customURL = req.body.customURL;
    const expiryDate = manageExpiryDate(req.body.expiryTime);
    const languageCode = req.body.languageSelected ? languages[req.body.languageSelected] : "";
    let newPath = customURL ? customURL : randomstring.generate(6);

    try{
        let check = await Link.find({shortenedURL: newPath});

        while(check.length){

            if(customURL){
                return res.status(200).json({
                    error: "Custom URL not available!!"
                    // Todo: Maybe show some suggestions here!
                })
            }
            
            newPath = randomstring.generate(6);
            check = await Link.find({shortenedURL: newPath});
        }

        if(!check.length){
            const newLink = await new Link({
                link: path,
                shortenedURL: newPath,
                languageCode,
                expireAt: expiryDate
            });
        
            await newLink.save();
        }
    }
    catch(err){
        console.log(err);
    }

    return res.status(200).json({
        newPath
    })
}

module.exports.handleLink = async (req, res) => {
    const params = req.params.id;

    try{
        let url = await Link.findOne({shortenedURL: params});

        if(url){
            if(!url.link.includes('http') || !url.link.includes('https')){
                // HTTPS Support
                url.link = 'https://' + url.link;
            }

            console.log(url.expireAt, new Date().getTime(), "here")

            if(url.expireAt < new Date().getTime()){
                // TODO: Need a cute page here!
               return res.status(200).redirect(CLIENT_URL + '/expired');
            }

            if(!url.languageCode){
                return res.redirect(url.link);
            }

            return res.redirect(calculateGTLink(url.languageCode, url.link));
        }
        else{
            return res.send("<div>Requested URL not found on our server</div>");
        }
    }
    catch(err){
        console.log(err);
        return res.send("<div>Requested URL not found on our server</div>")
    }
}
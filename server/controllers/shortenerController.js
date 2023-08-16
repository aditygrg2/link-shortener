const Link = require('../models/link');
const randomstring = require('randomstring')

const manageExpiryDate = (expiryTime) => {
    const today = new Date();

    if(!expiryTime) {
        today.setFullYear(2028, 12, 12);
        return [1, today.getTime()];
    }

    const date = new Date(expiryTime);
    var seconds = date.getTime();

    return [seconds, today.getTime()];
}

module.exports.shortenURL = async (req, res) => {
    const path = req.body.path;

    if(!path){
        return res.status(200, {
            error: "Incorrect URL"
        })
    }

    const customURL = req.body.customURL;
    const expiryDate = manageExpiryDate(req.body.expiryTime);
    console.log(expiryDate);
    const languageSelected = req.body.languageSelected;
    let newPath = customURL ? customURL : randomstring.generate(6);

    try{
        let check = await Link.find({shortenedURL: newPath});

        while(check.length){

            if(customURL){
                console.log("Found Already!");
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
                languageSelected,
                createdAt: expiryDate[1],
                expireAt: expiryDate ? expiryDate : new Date("2028-08-10")
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
        console.log(url);

        if(url){
            if(!url.link.includes('http') || !url.link.includes('https')){
                url.link = 'https://' + url.link;
            }

            return res.redirect(url.link);
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
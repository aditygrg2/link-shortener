const { languages } = require('../constants/urls');
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

const calculateGTLink = (languageCode, link) => {
    console.log(link);
    const modifiedLink = link.replaceAll('.', '-');
    const additer = `.translate.goog/?gws_rd=ssl&_x_tr_sl=auto&_x_tr_tl=${languageCode}&_x_tr_hl=en&_x_tr_pto=wapp&_x_tr_hist=true`;

    return modifiedLink + additer;
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
    const languageCode = req.body.languageSelected ? languages[req.body.languageSelected] : "";
    let newPath = customURL ? customURL : randomstring.generate(6);
    console.log(languageCode);

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
                languageCode,
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

            if(!url.languageCode){
                return res.redirect(url.link);
            }

            console.log(calculateGTLink(url.languageCode, url.link));

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
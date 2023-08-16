const Link = require('../models/link');
const randomstring = require('randomstring')

module.exports.shortenURL = async (req, res) => {
    const path = req.body.path;
    var uniqURL = false;
    let newPath = randomstring.generate(6);

    while(!uniqURL){
        try{
            let check = await Link.find({shortenedURL: newPath});

            console.log(check);

            if(!check.length){
                const newLink = await new Link({
                    link: path,
                    shortenedURL: newPath
                })
            
                await newLink.save();

                break;
            }

            newPath = randomstring.generate(6);            
        }
        catch(err){
            console.log(err);
        }
    }

    return res.status(200).json({
        newPath
    })
}

module.exports.handleLink = async (req, res) => {
    const params = req.params.id;

    console.log(params);

    try{
        let url = await Link.findOne({shortenedURL: params});

        console.log(url.link);

        if(url){
            if(!url.link.includes('http') || !url.link.includes('https')){
                url.link = 'https://' + url.link;
            }
            console.log(url);
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
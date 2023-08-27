const { isUndefined } = require("util");
const Link = require("../models/Link");

module.exports.checkCustomURLAvailability = async (req, res) => {
    const v = await Link.findOne({shortenedURL: req.body.customURL});

    return res.status(200).json({
        status: v ? true : false,
    })
}
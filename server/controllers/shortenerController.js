const { languages } = require("../constants/urls");
const Link = require("../models/Link");
const randomstring = require("randomstring");
const {
  calculateGTLink,
  manageExpiryDate,
} = require("../utils/main");
const { CLIENT_URL } = require("../constants/urls");

module.exports.shortenURL = async (req, res) => {
  const path = req.body.path;

  if (!path) {
    return res.status(200, {
      error: "Incorrect URL",
    });
  }

  const customURL = req.body.customURL;
  const expiryDate = manageExpiryDate(req.body.expiryTime);
  const languageCode = req.body.languageSelected
    ? languages[req.body.languageSelected]
    : "";
  let newPath = customURL ? customURL : randomstring.generate(6);
  const password = req.body.password;

  try {
    let check = await Link.find({ shortenedURL: newPath });

    while (check.length) {
      if (customURL) {
        return res.status(200).json({
          error: "Custom URL not available!!",
          // Todo: Maybe show some suggestions here!
        });
      }

      newPath = randomstring.generate(6);
      check = await Link.find({ shortenedURL: newPath });
    }

    if (!check.length) {
      const newLink = await new Link({
        link: path,
        shortenedURL: newPath,
        languageCode,
        expireAt: expiryDate,
        password,
      });

      await newLink.save();
    }
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({
    newPath,
  });
};

module.exports.handleLink = async (req, res) => {
  const params = req.params.id;

  const linkConfigs = {
    isExpired: false,
    isSecured: false,
    isInvalid: false,
    link: "",
  };

  try {
    let url = await Link.findOne({ shortenedURL: params });

    if (url) {
      if (!url.link.includes("http") || !url.link.includes("https")) {
        url.link = "https://" + url.link;
      }

      if (url.expireAt < new Date().getTime()) {
        linkConfigs.isExpired = true;
      }

      if (url.password.length > 0) {
        linkConfigs.isSecured = true;
        linkConfigs.id = url.id;
      }

      if (!url.languageCode) {
        linkConfigs.link = url.link;
      } else {
        linkConfigs.link = calculateGTLink(url.languageCode, url.link);
      }

      return res.status(200).send(linkConfigs);
    } else {
      linkConfigs.isInvalid = true;
      return res.status(200).send(linkConfigs);
    }
  } catch (err) {
    linkConfigs.isInvalid = true;
    return res.status(200).send(linkConfigs);
  }
};

module.exports.shortenByID = async (req, res) => {
  const LinkID = req.body.id;
  const password = req.body.password;

  try {
    const link = await Link.findById(LinkID);

    if (link) {
      if (link.password === password) {
        let url = link["link"];
        if (!url.includes("http") || !url.includes("https")) {
          url = "https://" + url;
        }
        return res.status(200).json({
          url,
          status: true,
        });
      } else {
        return res.status(200).json({
          status: false,
          message: "Incorrect Password",
        });
      }
    }

    return res.status(200).json({
      status: false,
      message: "Link not valid!",
    });
  } catch (err) {
    console.log(err);
  }
};

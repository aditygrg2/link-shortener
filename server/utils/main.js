module.exports.manageExpiryDate = (expiryTime) => {
    if(!expiryTime) {
        const today = new Date();
        today.setFullYear(2028, 12, 12);
        return today.getTime();
    }

    return new Date(expiryTime).getTime();
}

module.exports.calculateGTLink = (languageCode, link) => {
    const modifiedLink = link.replaceAll('.', '-');
    const additer = `.translate.goog/?gws_rd=ssl&_x_tr_sl=auto&_x_tr_tl=${languageCode}&_x_tr_hl=en&_x_tr_pto=wapp&_x_tr_hist=true`;

    return modifiedLink + additer;
}


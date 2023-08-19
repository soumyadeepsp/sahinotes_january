const User = require('./models/user');

module.exports.isExpired = async function(id) {
    var user = await User.findById(id);
    console.log(id);
    var currentDate = new Date();
    var expiryDate = user.expiryDate;
    if (expiryDate && currentDate<expiryDate) {
        return false;
    } else {
        return true;
    }
}
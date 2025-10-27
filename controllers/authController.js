const {oauth2Client} = require('./google-login/oauth2Client');

const googleLogin = async (req, res) => {
    try{
        const {code} = req.query;
        console.log(code);
    }
    catch(err){
        res.status(500).send({
            status: 500,
            message: "Internal server error",
        })
    }
}

module.exports = {
    googleLogin
}
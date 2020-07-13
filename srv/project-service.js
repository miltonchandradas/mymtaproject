const colors = require("colors");
const bcrypt = require("bcryptjs");


module.exports = srv => {
    srv.before("*", async req => {
        console.log(`Method: ${req.method}`.yellow.inverse);
        console.log(`Target: ${req.target.name}`.yellow.inverse);
    });

    srv.before("CREATE", "Users", async req => {
        console.log("CREATE User...");
        console.log(req.data);
        const { password } = req.data;
        console.log(password);
        const salt = await bcrypt.genSalt(10);
        req.data.password = await bcrypt.hash(password, salt);
        console.log("Encrypted password...");
        console.log(req.data.password);
    });

};

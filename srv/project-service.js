// eslint-disable-next-line
const colors = require("colors");
const bcrypt = require("bcryptjs");


module.exports = srv => {
    srv.on("getDATE", () => {
      return "2018-09-25";
   });

   srv.on("getProjectMembers", async (req) => {
      const { id } = req.data;
      const db = srv.transaction(req);

      let { Users } = srv.entities;
      const results = await db.read(Users).where({ PROJECT_ID: id });

      return results.map((user) => user.name);
   });

    srv.before("*", async req => {
        console.log(`Method: ${req.method}`.yellow.inverse);
        console.log(`Target: ${req.target}`.yellow.inverse);
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

    srv.on("READ", "Users", async (req, next) => {
        let id = req.data.id;
        console.log("id: ", id);

        const users = await next();

        if (id) {
            let customheader = req._.req.headers["customheader"];
            console.log("Custom header: ", customheader);

            if (!customheader) {
                return req.reject(403, "No custom header present...");
            }

            if (users.length !== 1) {
                return req.reject(401, "No users with the given id...");
            }

            if (users[0].password) {
                const match = await bcrypt.compare(customheader, users[0].password);

                if (!match) {
                    return req.reject(403, "Passwords do not match...");
                }
            }

            return users[0];

        }

        return users.filter(user => user.password === null);

    });

};

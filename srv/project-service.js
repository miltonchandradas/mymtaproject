// eslint-disable-next-line
const colors = require("colors");
const bcrypt = require("bcryptjs");


module.exports = srv => {

    srv.on("moveUserToAnotherProject", async (req) => {

        const { userId, projectId } = req.data;

        const db = srv.transaction(req);

        let { Users } = srv.entities;

        let results = await db.read(Users, ["id", "name as username", "project.id as currentProjectId"]).where({ id: userId });
        console.log("User info: ", results[0]);
        let { username, project: { currentProjectId } } = results[0];


        results = await db.read(Users).where({ project_Id: currentProjectId });
        console.log("Current Project members: ", results);
        console.log("Existing project member count: ", results.length);

        if (results.length < 3) {
            return {
                code: -100,
                success: false,
                moveStatus: "Sorry - Existing project only has 3 or less users"
            };
        }

        results = await db.read(Users, ["id", "project.name as newProjectName"]).where({ project_Id: projectId });
        console.log("Users in new project: ", results[0]);
        let { project: { newProjectName } } = results[0];

        console.log("New project member count: ", results.length);

        if (results.length > 7) {
            return {
                code: -200,
                success: false,
                moveStatus: "Sorry - New project already has 7 or more users"
            };
        }

        results = await db.update(Users).set({ project_id: projectId }).where({ id: userId });

        console.log("User info after update ", JSON.stringify(results));

        return {
            code: 100,
            success: true,
            moveStatus: "Successfully moved to new project",
            userId,
            username: username,
            projectId,
            projectname: newProjectName
        };

    });


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

    /* srv.on("READ", "Users", async (req, next) => {
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

    }); */

};

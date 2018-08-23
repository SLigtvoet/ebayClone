"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./events/controller");
const jwt_1 = require("./jwt");
const controller_3 = require("./logins/controller");
const controller_4 = require("./tickets/controller");
const entity_1 = require("./users/entity");
const controller_5 = require("./comments/controller");
const cors = require("@koa/cors");
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default
    ],
    authorizationChecker: (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith('Bearer ')) {
            const [, token] = header.split(' ');
            return !!(token && jwt_1.verify(token));
        }
        return false;
    },
    currentUserChecker: async (action) => {
        const header = action.request.headers.authorization;
        if (header && header.startsWith("Bearer ")) {
            const [, token] = header.split(" ");
            if (token) {
                const { id } = jwt_1.verify(token);
                return entity_1.User.findOne(id);
            }
        }
        return undefined;
    }
});
db_1.default()
    .then(_ => app.listen(4001, () => console.log('Listening on port 4001')))
    .then(_ => app.use(cors()))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map
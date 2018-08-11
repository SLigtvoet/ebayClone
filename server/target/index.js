"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./adds/controller");
const cors = require("@koa/cors");
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default
    ]
});
db_1.default()
    .then(_ => app.listen(4001, () => console.log('Listening on port 4001')))
    .then(_ => app.use(cors()))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map
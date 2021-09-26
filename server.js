const debug = require("debug")("server");

const app = require("./app");

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001;
require("./config/dbConnection");

app.listen(PORT, () => debug(`Listening on ${PORT}`));

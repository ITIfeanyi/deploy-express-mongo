const mongoose = require("mongoose");
const debug = require("debug")("DB");

async function main() {
  // eslint-disable-next-line no-undef
  await mongoose.connect(`${process.env.MONGO_URI}`);
  debug("Connected to mongo");
}

main().catch((err) => debug(err));

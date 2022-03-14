const cors = require("cors");

const whitelist = ["http://localhost:3000", "https://localhost:3443"];
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  console.log(req.header("Origin"));
  // indexOf returns -1 if value is not found in the array
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    // check to see if an origin can be found in the whitelist
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  // no error occurred. pass corsOptions object
  callback(null, corsOptions);
};

// returns middleware when called. sets cors header with access control allow origin on response object with wildcard value.
// allows cors for all origins.
exports.cors = cors();

// returns middleware when called. checks to see if incoming request belongs to origin is in the whitelist.
exports.corsWithOptions = cors(corsOptionsDelegate);

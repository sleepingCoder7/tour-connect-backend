const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const rfs = require("rotating-file-stream");

const logDirectory = path.join(__dirname, "../logs");

//Create log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

//Create rotating file stream for logs
const accessLogStream = rfs.createStream("access.log", {
    size: "10M",            //rotate files every 10 MB
    interval: "1d",         //rotate files every day
    path: logDirectory,
    compress: "gzip",       //compress the log files
    maxFiles: 5            //keep only 5 log files
});

module.exports = morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', { stream: accessLogStream });
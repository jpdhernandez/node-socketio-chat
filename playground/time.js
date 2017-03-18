const moment = require("moment");

// const date = moment();
// console.log(date.format("MMMM Do, YYYY"));

// const date = moment();
// console.log("It is " + date.format("h:mm a") + " right now");

const timestamp = moment().valueOf();
console.log(timestamp);

const createdAt = 1234;
const date = moment(createdAt);
console.log(date.format("h:mm a"));
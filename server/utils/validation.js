const _ = require("lodash");

const isRealString = (str) => {
  return _.isString(str) && str.trim().length > 0;
};

module.exports = {isRealString};
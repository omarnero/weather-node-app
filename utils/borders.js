const request = require("request");
const borders = (name, callback) => {
  const url = `https://restcountries.com/v2/name/${name}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("error in network connection", undefined);
    } else {
      const data = {
        name: body[0].capital,
        neibour: body[0].borders,
      };
      callback(undefined, data);
    }
  });
};
module.exports = borders;

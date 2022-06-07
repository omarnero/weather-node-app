const request = require("request");
const gecode = (addres, callback) => {
  let raddres = encodeURIComponent(addres);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${raddres}.json?access_token=pk.eyJ1Ijoib21hcjEyMy1tb2hhbWVkIiwiYSI6ImNsM3NvYXB3ajAwejkzY252ZjA2OXhqYWgifQ.gssNRuqC3x1JwHj1SsKt0A`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("error in network connection", undefined);
    } else {
      const lang = body.features[0].center[0];
      const long = body.features[0].center[1];
      const country = body.features[0].place_name;
      const data = { lang, long, country };
      callback(undefined, data);
    }
  });
};

module.exports = gecode;

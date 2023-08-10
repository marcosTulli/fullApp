const { SPEAKERS_API } = require('../config/variables');
const axios = require('axios');

function speakerService() {
  function getSpeakerById(id) {
    return new Promise((res, rej) => {
      axios
        .get(`${SPEAKERS_API}${id}`)
        .then((response) => {
          res(response);
        })
        .catch((error) => {
          rej(error);
        });
    });
  }
  return { getSpeakerById };
}

module.exports = speakerService();

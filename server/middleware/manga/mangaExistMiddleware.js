require('dotenv').config();

const httpReq = require('request-promise');
const url = process.env.DATAPROVIDER_URL;

const mangaExist = (req, res, next) => {
  const mangaUrl = `${url}/manga/${req.params.id}`;

  httpReq(mangaUrl)
    .then((html) => {
      const httpState = false; //Todo : if there is 404 text

      if (httpState) {
        res.status(404).json({
          state: 404,
          message: 'Manga Not Exist',
        });
      } else {
        req.html = html;
        next();
      }
    })
    .catch((e) => {
      res.status(500).json({
        state: 500,
        message: 'Something goes wrong',
      });
    });
};

module.exports = mangaExist;

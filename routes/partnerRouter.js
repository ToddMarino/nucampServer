const express = require("express");
const Partner = require("../models/partner");

const partnerRouter = express.Router();

partnerRouter
  .route("/")
  .get((req, res, next) => {
    Partner.find()
      .then((partners) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.json(partners);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
      .then((partner) => {
        console.log("Partner Created", partner);
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.json(partner);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operations not supported on /partners");
  })
  .delete((req, res, next) => {
    Partner.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.json(response);
      })
      .catch((err) => next(err));
  });

partnerRouter
  .route("/:partnerId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    next();
  })
  .get((req, res) => {
    res.end(
      `We will send details of the partner: ${req.params.partnerId} to you`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put((req, res) => {
    res.write(`Updating the partner: ${req.params.partnerId} \n`);
    res.end(
      `Will update the partner: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
  });

module.exports = partnerRouter;

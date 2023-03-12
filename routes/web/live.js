const router=require('express').Router();
const multer = require("multer");
const proceedForLiveStream = require(fconf('CORE:http:middleware')+ '/AuthenticateLiveStreamSession');


const {
    redirectToStreammingUrl
} = require(fconf('CORE:http:controllers')+ '/LiveStreamingController');

router.get('/join-session/:uuid', /* proceedForLiveStream, */ redirectToStreammingUrl);

module.exports = router;
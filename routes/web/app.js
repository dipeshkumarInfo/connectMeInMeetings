const router=require('express').Router();
const multer = require("multer");
const proceedForLiveStream = require(fconf('CORE:http:middleware')+ '/AuthenticateLiveStreamSession');

const {
    redirectToStreammingUrl,
    startMeeting
} = require(fconf('CORE:http:controllers')+ '/LiveStreamingController');

router.get('/join-session/:uuid', proceedForLiveStream, redirectToStreammingUrl);
router.get('live/:uuid', startMeeting);

module.exports = router;
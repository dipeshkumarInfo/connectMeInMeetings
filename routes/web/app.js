const router=require('express').Router();
const multer = require("multer");

const {
    startMeeting
} = require(fconf('CORE:http:controllers')+ '/LiveStreamingController');

router.get('live/:uuid', startMeeting);

module.exports = router;
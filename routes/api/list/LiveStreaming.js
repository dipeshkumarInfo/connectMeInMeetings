module.exports = (router) => {
    const { checkSessionLiveStreamStart, classDetail } = require(fconf('CORE:controllers:api')+ '/LiveStreamingController');

    router.post('/live/class-details-by-livestream/:uuid', async (req, res) => {
        const result = await classDetail(req.params.uuid);
        return res.send(result);
    });

    router.post('/live/check-class-start/:uuid', async (req, res) => {
        const result = await checkSessionLiveStreamStart(req);
        return res.send(result);
    });
    
    return router;
}
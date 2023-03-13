const { checkSessionLiveStreamStart } = require(fconf('CORE:controllers:api') + '/LiveStreamingController');

const checkSessionStart = async (req, resp, next) => {
    try {
        const { uuid } = req.params;

        if (!(uuid)) {
            req.flash('alert_message', [{ msg: "Invalid Class ! Please Join Again", type: 'danger' }]);
            return resp.redirect(base_path + 'classes/upcomming');
        }

        const validate = await checkSessionLiveStreamStart(req, uuid);
        const classStream  = validate.result;
        if (classStream === 1) {
            next();
        }
        else if (classStream === 2) {
            req.flash('alert_message', [{ msg: "Class Is Over , Please Join Next Class When It Start!", type: 'danger' }]);
            return resp.redirect(base_path + 'classes/upcomming');
        }
        else if (classStream === 3) {
            return resp.redirect(process.env.LIVE_STREAMING_URL);
        }else{
            req.flash('alert_message', [{ msg: "Something Wrong !" + classStream, type: 'danger' }]);
            return resp.redirect(base_path + 'classes/upcomming');
        }
    } catch (error) {
        req.flash('alert_message',[{msg:'Something Wrong ! '+ error.message ,type:'danger'}]);
        return res.redirect(base_path + "error/access-forbidden/403");
    }
}


module.exports = checkSessionStart;
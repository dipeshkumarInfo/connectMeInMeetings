const { classDetail } = require(fconf('CORE:controllers:api') + '/LiveStreamingController');
const { checkClassDay } = require(fconf('CORE:helpers:classes') + '/IndexHelper');

const _dirname = 'Live';

const redirectToStreammingUrl = async (req, resp, next) => {
    try {
        const uuid = req.params.uuid;
        const ClassDetails = await classDetail(uuid);

        resp.render(_dirname + '/index', { 
            title: "Wait For Start Class | connectMe", 
            alert_message: req.flash('alert_message'), 
            css: '<link rel="stylesheet" href="/css/live/style.css"><link rel="stylesheet" href="/css/custom-grid.css"><link rel="stylesheet" href="/css/custom-grid.css.map">',
            script: '<script src="/js/live/script.js"></script>',
            MainScriptShow:false , 
            checkClassDay,
            joining_link : base_path+ "/live/join-session/"+ uuid,
            classes : ClassDetails.msg
        });

    } catch (error) {
        req.flash('alert_message', [{ msg: "Something Wrong !" + error.message, type: 'danger' }]);
        return resp.redirect(base_path + 'classes/upcomming');
    }
}

const stream = ( socket ) => {
    socket.on( 'subscribe', ( data ) => {
        //subscribe/join a room
        socket.join( data.room );
        socket.join( data.socketId );

        //Inform other members in the room of new user's arrival
        if ( socket.adapter.rooms.has(data.room) === true ) {
            socket.to( data.room ).emit( 'new user', { socketId: data.socketId } );
        }
    } );


    socket.on( 'newUserStart', ( data ) => {
        socket.to( data.to ).emit( 'newUserStart', { sender: data.sender } );
    } );


    socket.on( 'sdp', ( data ) => {
        socket.to( data.to ).emit( 'sdp', { description: data.description, sender: data.sender } );
    } );


    socket.on( 'ice candidates', ( data ) => {
        socket.to( data.to ).emit( 'ice candidates', { candidate: data.candidate, sender: data.sender } );
    } );


    socket.on( 'chat', ( data ) => {
        socket.to( data.room ).emit( 'chat', { sender: data.sender, msg: data.msg } );
    } );
}

module.exports = {
    redirectToStreammingUrl,
    stream
};
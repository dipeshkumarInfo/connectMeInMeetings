const Classes = require(fconf('CORE:app:models') + '/ClassesModel');
const LiveStreaming = require(fconf('CORE:app:models') + '/LiveStreamingModel');
const ClassDays = require(fconf('CORE:app:models') + '/ClassDaysModel');
const { leftTimeInSeconds, checkClassDay } = require(fconf('CORE:helpers:classes') + '/IndexHelper');

const checkSessionLiveStreamStart = async (req, res) => {
  try{
  const detail = await classDetail(req.params.uuid);
  const result = detail.msg;
  
  if((detail.status == false))
  {
    return { result :  "Invalid Detail !" }
  }
  else if(detail.status == true && checkClassDay(result))
  {
    if(leftTimeInSeconds(result.start_time) > 0)
    {
      return { result : 1 }
    }
    if(leftTimeInSeconds(result.start_time) <= 0 && leftTimeInSeconds(result.end_time) <= 0)
    {
      return { result : 2 }
    }
    else if(leftTimeInSeconds(result.end_time) > 0)
    {
      return { result : 3 }
    }
  }else{
    return { result : "Today Class Not Held ! Join Next Session" }
  }

}catch(err)
{
  return { result :  err.message }
}

}


const classDetail = async (uuid) => {
  try {
    // const { uuid } = req.params;

    return await getClassDetailByLiveStream(uuid)
    .then(function (result) {
      return { msg: result , status: true };
    })
    .catch(function (error) {
      return { msg: error , status: false };
    });

} catch (error) {
    return { msg : error.message , status: false };
}
}

const getClassDetailByLiveStream = (uuid) => {
  return new Promise(async function (resolve, reject) {
    try {

        await LiveStreaming.findOne({ uuid: uuid, status: 1 })
            .exec(function (err, liveStreaming) {
              
                if ((liveStreaming == null) || (err))
                {
                  reject(err);
                }else{
                  Classes.find({ status: 1, live_streaming: liveStreaming._id })
                    .populate('live_streaming', 'topic start_time end_time uuid')
                    .populate('days', 'name order')
                    .select('topic start_time end_time routine days')
                    .exec(function (err, classes) {
                        if (err) {
                            reject(err);
                        }

                        Classes.count().exec(function (err, count) {
                            if (err) {
                                reject(err);
                            }
                            resolve(classes[0]);
                        });
                    });
                  }
            });

    } catch (error) {
        reject(error.message);
    }
});
}

  module.exports = {
    checkSessionLiveStreamStart,
    classDetail
  }
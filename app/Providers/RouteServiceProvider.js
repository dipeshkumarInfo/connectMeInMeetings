const webHandleRoute = (req, res, next, pageName) => {
    try{
        return require(fconf(`CORE:routes:web`) + pageName)(req, res, next);
    }catch(err)
    {
        return res.status(500).json({ result: "Invalid web route" + err, status: false });
    }
}


const apiHandleRoute = (req, res, next, pageName) => {
    try{
        var route = req.params.path || 'api';
        return require(fconf(`CORE:routes:${route}`) + pageName)(req, res, next);
    }catch(err)
    {
        return res.status(500).json({ result: "Invalid api route" + err, status: false });
    }
};

module.exports = {
    apiHandleRoute,
    webHandleRoute
};




// const fs = require("fs");

// const checkExistence = (filePath, req, res, next) => {
//     // Check if file exists
// fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       return res.status(500).json({ result: `File ${filePath} does not exist.`, status: false });
//     } else {
//       // File exists, require it
//       return require(filePath)(req, res, next);
//     }
//   });
// }
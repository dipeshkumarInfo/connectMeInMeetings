module.exports = (router) => {

    const { rolesPivoteResult } = require(fconf('CORE:controllers:api')+ '/PivoteTablesController');
    const { userDetailsById, checkChildOrParentProfile, permissionChecks, rolesPermissionChecks } = require(fconf('CORE:controllers:api')+ '/GetUserProfileDetailController');
    

    router.post('/roles_pivot_count', rolesPivoteResult);
    router.post('/users/:id', userDetailsById);
    
    router.post('/users/type/:id', async (req, res) => {
        const result = await checkChildOrParentProfile(req);
        return res.send(result);
    });

    router.post('/users/auth-permission/:permission', async (req, res) => {
        const permissions = req.params.permission.split(",");
        const result = await permissionChecks(req, permissions);
        // const result = await rolesPermissionChecks(req, ['teacher','student'], ['upcomming-classes']);
        return res.send(result);
    });

    return router;

}
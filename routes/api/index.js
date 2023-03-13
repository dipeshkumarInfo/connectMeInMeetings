const router = require("express").Router();

/* Seeders */
list = require(fconf('CORE:api:list')+ '/Seeders')(router);

/* Users */
list = require(fconf('CORE:api:list')+ '/Users')(router);

/* Courses */
list = require(fconf('CORE:api:list')+ '/Courses')(router);

/* Classes */
list = require(fconf('CORE:api:list')+ '/Classes')(router);

/* Live Streaming */
list = require(fconf('CORE:api:list')+ '/LiveStreaming')(router);


module.exports = list;
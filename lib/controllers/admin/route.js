/**
 * lib/controllers/admin/route.js
 */

'use strict';

const Koa = require('koa');
const passport = require('koa-passport');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const Authenticator = require('./authenticator');
const Controller = require('./controller');

router.prefix('/admin');


router.post('/login', Controller.Authentication.login);
router.get('/logout', Controller.Authentication.logout);

// Authentication required
app.use(passport.initialize());

router.use(Controller.Authentication.useJwtAuthenticate);
// router.use(Controller.Authentication.useAccessControl);

/////////////////////////////////////////////////////////////////////////////////////////////////
/// System Management

router.get('/system/checkusername', Controller.checkUsername);
// router.get('/system/checkuseremail', SystemManagement.checkUserEmail);
// router.get('/system/checkrolename', SystemManagement.checkRoleName);

// router.get('/system/user', SystemManagement.listUser);
// router.get('/system/user/:id', SystemManagement.getUser);
// router.get('/system/user/permission/:id', SystemManagement.getUserPermission);
// router.post('/system/user/:action', SystemManagement.postUser);

// router.get('/system/role', SystemManagement.listRole);
// router.get('/system/role/:id', SystemManagement.getRole);
// router.post('/system/role/:action', SystemManagement.postRole);

// router.get('/system/permission', SystemManagement.listPermission);
// router.get('/system/permission/:id', SystemManagement.getPermission);
// router.post('/system/permission/:action', SystemManagement.postPermission);

// router.get('/system/rolepermission/:id', SystemManagement.queryRolePermission);
// router.post('/system/rolepermission/:action', SystemManagement.postRolePermission);

// router.get('/system/resource', SystemManagement.listResource);
// router.get('/system/resource/:id', SystemManagement.getResource);

// router.get('/system/resource/type/:id', SystemManagement.listResourceType);

/**
 * use route
 */
app.use(router.middleware());
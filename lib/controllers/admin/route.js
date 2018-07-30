/**
 * lib/controllers/admin/route.js
 */

'use strict';

const Koa = require('koa');
const passport = require('koa-passport');
const app = module.exports = new Koa();
const Router = require('koa-router');
const router = new Router();

const Authentication = require('./authentication');
const Dashboard = require('./dashboard');
// const Security = require('./security');
const SystemManagement = require('./system-management');
// const GatewayManagement = require('./gateway-management');
// const AdmissionManagement = require('./admission-management');
// const MerchantManagement = require('./merchant-management');
// const TransactionManagement = require('./transaction-management');
// const StatisticsManagement = require('./statistics-management');

router.prefix('/admin');


router.post('/login', Authentication.login);
router.get('/logout', Authentication.logout);

// Authentication required
app.use(passport.initialize());

router.use(Authentication.useJwtAuthenticate);
// router.use(Authentication.useAccessControl);

/////////////////////////////////////////////////////////////////////////////////////////////////
/// Dashboard


/////////////////////////////////////////////////////////////////////////////////////////////////
/// Security


/////////////////////////////////////////////////////////////////////////////////////////////////
/// System Management

router.get('/system/checkusername', SystemManagement.checkUserNameConflict);
router.get('/system/checkemail', SystemManagement.checkEmailConflict);
router.get('/system/checkmobile', SystemManagement.checkMobileConflict);
// router.get('/system/checkrolename', SystemManagement.checkRoleNameConflict);

router.get('/system/users', SystemManagement.listUsers);
router.get('/system/user/:id', SystemManagement.queryUser);
router.post('/system/user/:action', SystemManagement.postUser);
router.get('/system/user/permission/:id', SystemManagement.queryUserPermission);

router.get('/system/roles', SystemManagement.listRoles);
router.get('/system/role/:id', SystemManagement.queryRole);
router.post('/system/role/:action', SystemManagement.postRole);

router.get('/system/permissions', SystemManagement.listPermissions);
router.get('/system/permission/:id', SystemManagement.queryPermission);
router.post('/system/permission/:action', SystemManagement.postPermission);

router.get('/system/role/permissions', SystemManagement.listRolePermissions);
router.get('/system/role/permission/:id', SystemManagement.queryRolePermission);
router.post('/system/role/permission/:action', SystemManagement.postRolePermission);

router.get('/system/resources', SystemManagement.listResources);
router.get('/system/resource/:id', SystemManagement.getResource);

router.get('/system/resource/:id/types', SystemManagement.listResourceTypes);

/////////////////////////////////////////////////////////////////////////////////////////////////
/// Gateway Management


/////////////////////////////////////////////////////////////////////////////////////////////////
/// Admission Management


/////////////////////////////////////////////////////////////////////////////////////////////////
/// Merchant Management


/////////////////////////////////////////////////////////////////////////////////////////////////
/// Transaction Management


/////////////////////////////////////////////////////////////////////////////////////////////////
/// Statistics Management

/**
 * use route
 */
app.use(router.middleware());
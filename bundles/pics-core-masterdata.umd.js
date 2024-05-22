(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/forms'), require('primeng/api'), require('devextreme-angular'), require('rxjs/operators'), require('@angular/router'), require('rxjs/add/operator/map'), require('@angular/common'), require('primeng/tree'), require('primeng/contextmenu'), require('primeng/confirmpopup'), require('primeng/card'), require('primeng/checkbox'), require('primeng/tabview'), require('primeng/dropdown'), require('devextreme-angular/ui/nested'), require('primeng/inputtext'), require('primeng/tooltip'), require('@angular/common/http'), require('@ng-bootstrap/ng-bootstrap'), require('primeng/accordion'), require('primeng/avatar'), require('primeng/badge'), require('primeng/button'), require('primeng/calendar'), require('primeng/confirmdialog'), require('primeng/dialog'), require('primeng/editor'), require('primeng/fieldset'), require('primeng/fileupload'), require('primeng/inputmask'), require('primeng/inputswitch'), require('primeng/inputtextarea'), require('primeng/knob'), require('primeng/message'), require('primeng/multiselect'), require('primeng/orderlist'), require('primeng/password'), require('primeng/progressspinner'), require('primeng/radiobutton'), require('primeng/ripple'), require('primeng/sidebar'), require('primeng/speeddial'), require('primeng/steps'), require('primeng/table'), require('primeng/tabmenu'), require('primeng/toast'), require('primeng/treeselect'), require('@angular/cdk/drag-drop'), require('@angular/material/tooltip')) :
    typeof define === 'function' && define.amd ? define('@pics-core/masterdata', ['exports', '@angular/core', 'rxjs', '@angular/forms', 'primeng/api', 'devextreme-angular', 'rxjs/operators', '@angular/router', 'rxjs/add/operator/map', '@angular/common', 'primeng/tree', 'primeng/contextmenu', 'primeng/confirmpopup', 'primeng/card', 'primeng/checkbox', 'primeng/tabview', 'primeng/dropdown', 'devextreme-angular/ui/nested', 'primeng/inputtext', 'primeng/tooltip', '@angular/common/http', '@ng-bootstrap/ng-bootstrap', 'primeng/accordion', 'primeng/avatar', 'primeng/badge', 'primeng/button', 'primeng/calendar', 'primeng/confirmdialog', 'primeng/dialog', 'primeng/editor', 'primeng/fieldset', 'primeng/fileupload', 'primeng/inputmask', 'primeng/inputswitch', 'primeng/inputtextarea', 'primeng/knob', 'primeng/message', 'primeng/multiselect', 'primeng/orderlist', 'primeng/password', 'primeng/progressspinner', 'primeng/radiobutton', 'primeng/ripple', 'primeng/sidebar', 'primeng/speeddial', 'primeng/steps', 'primeng/table', 'primeng/tabmenu', 'primeng/toast', 'primeng/treeselect', '@angular/cdk/drag-drop', '@angular/material/tooltip'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global["pics-core"] = global["pics-core"] || {}, global["pics-core"].masterdata = {}), global.ng.core, global.rxjs, global.ng.forms, global.i4, global.i15, global.rxjs.operators, global.ng.router, global.rxjs["add/operator/map"], global.ng.common, global.i8, global.i9, global.i10, global.i11, global.i12, global.i13, global.i14, global.i16, global.i18, global.i19, global.ng.common.http, global.ngBootstrap, global.accordion, global.avatar, global.badge, global.button, global.calendar, global.confirmdialog, global.dialog, global.editor, global.fieldset, global.fileupload, global.inputmask, global.inputswitch, global.inputtextarea, global.knob, global.message, global.multiselect, global.orderlist, global.password, global.progressspinner, global.radiobutton, global.ripple, global.sidebar, global.speeddial, global.steps, global.table, global.tabmenu, global.toast, global.treeselect, global.ng.cdk.dragDrop, global.ng.material.tooltip));
})(this, (function (exports, i0, rxjs, i2$1, i4, i15, operators, i1, map, i2, i8, i9, i10, i11, i12, i13, i14, i16, i18, i19, http, ngBootstrap, accordion, avatar, badge, button, calendar, confirmdialog, dialog, editor, fieldset, fileupload, inputmask, inputswitch, inputtextarea, knob, message, multiselect, orderlist, password, progressspinner, radiobutton, ripple, sidebar, speeddial, steps, table, tabmenu, toast, treeselect, dragDrop, tooltip) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i2__namespace$1 = /*#__PURE__*/_interopNamespace(i2$1);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i15__namespace = /*#__PURE__*/_interopNamespace(i15);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i11__namespace = /*#__PURE__*/_interopNamespace(i11);
    var i12__namespace = /*#__PURE__*/_interopNamespace(i12);
    var i13__namespace = /*#__PURE__*/_interopNamespace(i13);
    var i14__namespace = /*#__PURE__*/_interopNamespace(i14);
    var i16__namespace = /*#__PURE__*/_interopNamespace(i16);
    var i18__namespace = /*#__PURE__*/_interopNamespace(i18);
    var i19__namespace = /*#__PURE__*/_interopNamespace(i19);

    var MasterdataService = /** @class */ (function () {
        function MasterdataService() {
        }
        return MasterdataService;
    }());
    MasterdataService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    MasterdataService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return []; } });

    var RoleConfig = /** @class */ (function () {
        function RoleConfig() {
        }
        return RoleConfig;
    }());
    RoleConfig.EndPoint = {
        role: {
            getAllUserRole: '/access-control/role',
            createRole: '/access-control/role/create',
            getLandingPage: '/platform/menu/application',
            addPolicyGroup: '/access-control/role',
            getAllOrgRole: '/access-control/role/organization/{orgid}',
            dossier: '/dossier'
        }
    };
    var UserConfig = /** @class */ (function () {
        function UserConfig() {
        }
        return UserConfig;
    }());
    UserConfig.EndPoint = {
        User: {
            getAllUserList: '/org/user',
            getAllUserActiveInactive: '/org/user?includeInactiveUsers=true',
            activateUser: '/org/user/activate',
            createUser: '/org/user/create',
            userRole: '/org/user/role',
            managementgroup: '/org/team/managementgroup',
            getAllUserOrgList: '/org/user/organization/'
        },
        Provider: {
            getProviderList: '/ref/provider',
            searchProviderList: '/ref/provider/search',
            addProviderUser: '/ref/provider/create/account'
        }
    };
    var AttachmentConfig = /** @class */ (function () {
        function AttachmentConfig() {
        }
        return AttachmentConfig;
    }());
    AttachmentConfig.EndPoint = {
        Attachments: {
            GetAttachmentReferral: '/ref/attachment/referral',
            GetCategoryLookup: '/lookup/lookupbycategoryname',
            UploadKey: '/common/files/upload-key',
            DownloadKey: '/common/files/download-key',
            PostAttachment: '/ref/attachment/create',
            PutAttachment: '/ref/attachment'
        }
    };
    var PolicyGroupConfig = /** @class */ (function () {
        function PolicyGroupConfig() {
        }
        return PolicyGroupConfig;
    }());
    PolicyGroupConfig.EndPoint = {
        policyGroup: {
            getPolicyGroupList: '/platform/page-designer/policyGroup',
            getAllPolicyGroupList: '/platform/page-designer/policyGroup/all',
            createPolicyGroup: '/platform/page-designer/policyGroup',
            getOrgPolicyGroups: '/platform/page-designer/policyGroup/organization/{organizationid}'
        }
    };
    var PermissionsURL = /** @class */ (function () {
        function PermissionsURL() {
        }
        return PermissionsURL;
    }());
    PermissionsURL.EndPoints = {
        permission: {
            permissionRoleById: '/access-control/permission/role/{id}',
            pagePermission: '/access-control/permission/page',
            getPermission: '/access-control/permission/{id}',
            createPermission: '/access-control/permission/create',
            updateDeletePermission: '/access-control/permission/{permissionid}',
            getPermissionTree: '/access-control/permission/page/{pageid}/{parentid}',
            getPermissionTypes: '/access-control/permission/type/{applicationid}',
            applicationPermissionsTree: '/access-control/permission/application/{applicationid}'
        },
        page: {
            createPage: '/platform/menu/create',
            updateDeletePage: '/platform/menu/{pageid}',
            AllPageTree: '/platform/menu/tree/{applicationid}'
        }
    };
    var AccessManagementConfig$1 = /** @class */ (function () {
        function AccessManagementConfig() {
        }
        return AccessManagementConfig;
    }());
    AccessManagementConfig$1.EndPoint = {
        Organization: {
            getOrganizationList: '/org/organization/all',
            getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
        }
    };
    var MasterURL = /** @class */ (function () {
        function MasterURL() {
        }
        return MasterURL;
    }());
    MasterURL.EndPoints = {
        lookup: {
            createCategory: '/platform/master/lookup/category',
            updateDeleteCategory: '/platform/master/lookup/category/{id}',
            lookup: '/platform/master/lookup/{id}',
            createLookup: '/platform/master/lookup',
            getPermissionRoleById: '/access-control/permission/role/{id}',
            getAllCategoryTree: '/platform/master/lookup/category/tree/{applicationid}',
            getLookupTree: '/platform/master/lookup/tree/{categoryid}',
            getLookupByCategoryId: '/platform/master/lookup/list/{id}',
            getAllLookupByCategoryId: '/platform/master/lookup/getAllLookup/{categoryId}',
            getPermissionsTree: '/access-control/permission/application/{applicationid}',
            addOrUpdateLookup: '/platform/master/lookup/addOrUpdateLookup',
            updateLookupOrders: '/platform/master/lookup/update/lookupOrders/{sortOrder}',
        }
    };
    var RBACINFO = /** @class */ (function () {
        function RBACINFO() {
            this.apiHost = '';
            this.tokenKey = '';
        }
        return RBACINFO;
    }());
    var Environment = /** @class */ (function () {
        function Environment() {
        }
        return Environment;
    }());

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function")
            throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn)
                context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access)
                context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done)
                throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0)
                    continue;
                if (result === null || typeof result !== "object")
                    throw new TypeError("Object expected");
                if (_ = accept(result.get))
                    descriptor.get = _;
                if (_ = accept(result.set))
                    descriptor.set = _;
                if (_ = accept(result.init))
                    initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field")
                    initializers.unshift(_);
                else
                    descriptor[key] = _;
            }
        }
        if (target)
            Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    }
    ;
    function __runInitializers(thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    }
    ;
    function __propKey(x) {
        return typeof x === "symbol" ? x : "".concat(x);
    }
    ;
    function __setFunctionName(f, name, prefix) {
        if (typeof name === "symbol")
            name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    }
    ;
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }
    function __addDisposableResource(env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object")
                throw new TypeError("Object expected.");
            var dispose;
            if (async) {
                if (!Symbol.asyncDispose)
                    throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose)
                    throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
            }
            if (typeof dispose !== "function")
                throw new TypeError("Object not disposable.");
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    }
    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };
    function __disposeResources(env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async)
                        return Promise.resolve(result).then(next, function (e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError)
                throw env.error;
        }
        return next();
    }
    var tslib_es6 = {
        __extends: __extends,
        __assign: __assign,
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __createBinding: __createBinding,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __spreadArray: __spreadArray,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault,
        __classPrivateFieldGet: __classPrivateFieldGet,
        __classPrivateFieldSet: __classPrivateFieldSet,
        __classPrivateFieldIn: __classPrivateFieldIn,
        __addDisposableResource: __addDisposableResource,
        __disposeResources: __disposeResources,
    };

    var Store = /** @class */ (function () {
        function Store(initialState) {
            this._state$ = new rxjs.BehaviorSubject(initialState);
            this.state$ = this._state$.asObservable();
        }
        Object.defineProperty(Store.prototype, "state", {
            get: function () {
                return this._state$.getValue();
            },
            enumerable: false,
            configurable: true
        });
        Store.prototype.setState = function (nextState) {
            this._state$.next(nextState);
        };
        return Store;
    }());

    var PermissionStore = /** @class */ (function (_super) {
        __extends(PermissionStore, _super);
        function PermissionStore() {
            return _super.call(this, {}) || this;
        }
        PermissionStore.prototype.setStore = function (data) {
            if (data) {
                this.setState(Object.assign(Object.assign({}, this.state), data));
            }
        };
        PermissionStore.prototype.getStore = function (type) {
            if (type === void 0) { type = 'P'; }
            if (type === 'P')
                return rxjs.of(this.state);
            else
                return rxjs.of(this.state);
        };
        PermissionStore.prototype.flat = function (array) {
            var _this = this;
            var result = [];
            if (array) {
                array.forEach(function (item) {
                    result.push(item);
                    if (item && Array.isArray(item)) {
                        result = result.concat(_this.flat(item));
                    }
                });
            }
            return result;
        };
        return PermissionStore;
    }(Store));
    PermissionStore.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    PermissionStore.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionStore, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var DataStoreService = /** @class */ (function () {
        function DataStoreService() {
            this.currentStoreSubject = new rxjs.BehaviorSubject({});
            this.currentStore = this.currentStoreSubject.asObservable();
            // test code
        }
        DataStoreService.prototype.setData = function (key, value) {
            var currentStore = this.getCurrentStore();
            currentStore[key] = value;
            this.currentStoreSubject.next(currentStore);
        };
        DataStoreService.prototype.setObject = function (value) {
            this.currentStoreSubject.next(value);
        };
        DataStoreService.prototype.getData = function (key) {
            var currentStore = this.getCurrentStore();
            return currentStore[key];
        };
        DataStoreService.prototype.clearStore = function () {
            var currentStore = this.getCurrentStore();
            Object.keys(currentStore).forEach(function (key) {
                delete currentStore[key];
            });
            this.currentStoreSubject.next(currentStore);
        };
        DataStoreService.prototype.getCurrentStore = function () {
            return this.currentStoreSubject.value;
        };
        return DataStoreService;
    }());
    DataStoreService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    DataStoreService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DataStoreService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return []; } });

    var RbacService = /** @class */ (function () {
        function RbacService(storeService) {
            var _this = this;
            this.storeService = storeService;
            this.storeService.currentStore.subscribe(function (val) {
                if (val) {
                    _this.httpService = val.HTTPSERVICE;
                }
            });
        }
        RbacService.prototype.getAllUserList = function (key) {
            return this.httpService.get(UserConfig.EndPoint.User.getAllUserList + "/" + key);
        };
        RbacService.prototype.getAllUserOrgList = function (orgid) {
            return this.httpService.get(UserConfig.EndPoint.User.getAllUserOrgList + orgid);
        };
        RbacService.prototype.saveUser = function (data) {
            return this.httpService.post(UserConfig.EndPoint.User.createUser, data);
        };
        RbacService.prototype.updateUser = function (data, userid) {
            return this.httpService.put(UserConfig.EndPoint.User.getAllUserList + "/" + userid, data);
        };
        RbacService.prototype.deleteUser = function (id) {
            return this.httpService.delete(UserConfig.EndPoint.User.getAllUserList + "/" + id);
        };
        RbacService.prototype.activateUser = function (data) {
            return this.httpService.post(UserConfig.EndPoint.User.activateUser, data);
        };
        RbacService.prototype.addProviderUser = function (data) {
            return this.httpService.post(UserConfig.EndPoint.Provider.addProviderUser, data);
        };
        RbacService.prototype.addUserRole = function (data) {
            return this.httpService.post(UserConfig.EndPoint.User.userRole, data);
        };
        RbacService.prototype.uploadKey = function (objparams) {
            return this.httpService.post(AttachmentConfig.EndPoint.Attachments.UploadKey, objparams);
        };
        RbacService.prototype.getOrgPolicyGroupList = function (orgid) {
            return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getOrgPolicyGroups.replace('{organizationid}', String(orgid)));
        };
        RbacService.prototype.getAllPolicyGroupList = function (policyGroupId) {
            var endPoint = policyGroupId
                ? PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + "/" + policyGroupId
                : PolicyGroupConfig.EndPoint.policyGroup.getAllPolicyGroupList;
            return this.httpService.get(endPoint);
        };
        RbacService.prototype.getPolicyGroupById = function (id) {
            return this.httpService.get(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + '/' + id);
        };
        RbacService.prototype.getPolicyGroupsByManagementGroup = function (policyGroupId) {
            return this.httpService.get("/org/policyGroup/managementgroup/" + policyGroupId);
        };
        RbacService.prototype.createPolicyGroup = function (data) {
            return this.httpService.post(PolicyGroupConfig.EndPoint.policyGroup.createPolicyGroup, data);
        };
        RbacService.prototype.updatePolicyGroup = function (id, item) {
            return this.httpService.put(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + "/" + id, item);
        };
        RbacService.prototype.deletePolicyGroup = function (id) {
            return this.httpService.delete(PolicyGroupConfig.EndPoint.policyGroup.getPolicyGroupList + "/" + id);
        };
        RbacService.prototype.getAllUserRole = function (id) {
            return this.httpService.get(RoleConfig.EndPoint.role.getAllOrgRole.replace('{orgid}', String(id)));
        };
        RbacService.prototype.deleteRole = function (id) {
            return this.httpService.delete(RoleConfig.EndPoint.role.getAllUserRole + "/" + id);
        };
        RbacService.prototype.getRoleById = function (roleid) {
            return this.httpService.get(RoleConfig.EndPoint.role.getAllUserRole + "/" + roleid);
        };
        RbacService.prototype.createRole = function (data) {
            return this.httpService.post(RoleConfig.EndPoint.role.createRole, data);
        };
        RbacService.prototype.updateRole = function (roleId, data) {
            return this.httpService.put(RoleConfig.EndPoint.role.getAllUserRole + "/" + roleId, data);
        };
        RbacService.prototype.getLandingPage = function (id) {
            return this.httpService.get(RoleConfig.EndPoint.role.getLandingPage + "/" + id);
        };
        RbacService.prototype.createPolicyGroupForRole = function (roleId, data) {
            return this.httpService.post(RoleConfig.EndPoint.role.addPolicyGroup + "/" + roleId + "/policygroups", data);
        };
        RbacService.prototype.updatePolicyGroupForRole = function (roleId, data) {
            return this.httpService.put(RoleConfig.EndPoint.role.addPolicyGroup + "/" + roleId + "/policygroups", data);
        };
        RbacService.prototype.getReportDashbaord = function () {
            return this.httpService.get("" + RoleConfig.EndPoint.role.dossier);
        };
        RbacService.prototype.getPermissionRoleById = function (id) {
            return this.httpService.get(PermissionsURL.EndPoints.permission.permissionRoleById.replace('{id}', id));
        };
        RbacService.prototype.getManagementGroupTree = function (_organizationid) {
            return this.httpService.get('/org/management-group/organization/tree');
        };
        RbacService.prototype.getPermissionsTree = function (applicationid) {
            return this.httpService.get(PermissionsURL.EndPoints.permission.applicationPermissionsTree.replace('{applicationid}', applicationid));
        };
        RbacService.prototype.getPagePermission = function (data) {
            return this.httpService.post(PermissionsURL.EndPoints.permission.pagePermission, data);
        };
        RbacService.prototype.createPage = function (page) {
            return this.httpService.post(PermissionsURL.EndPoints.page.createPage, page);
        };
        RbacService.prototype.updatePage = function (page) {
            return this.httpService.put(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', page.id), page);
        };
        RbacService.prototype.deletePage = function (pageId) {
            return this.httpService.delete(PermissionsURL.EndPoints.page.updateDeletePage.replace('{pageid}', pageId));
        };
        RbacService.prototype.getPermission = function (id) {
            return this.httpService.get(PermissionsURL.EndPoints.permission.getPermission.replace('{id}', id));
        };
        RbacService.prototype.createPermission = function (permission) {
            return this.httpService.post(PermissionsURL.EndPoints.permission.createPermission, permission);
        };
        RbacService.prototype.updatePermission = function (permission) {
            return this.httpService.put(PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permission.id), permission);
        };
        RbacService.prototype.deletePermission = function (permissionId) {
            return this.httpService.delete(PermissionsURL.EndPoints.permission.updateDeletePermission.replace('{permissionid}', permissionId));
        };
        RbacService.prototype.getAllPageTree = function (applicationid) {
            return this.httpService
                .get(PermissionsURL.EndPoints.page.AllPageTree.replace('{applicationid}', applicationid))
                .pipe(operators.map(function (item) {
                return item.data;
            }));
        };
        RbacService.prototype.getPermissionTree = function (pageid, parentid) {
            return this.httpService.get(PermissionsURL.EndPoints.permission.getPermissionTree.replace('{pageid}', pageid).replace('{parentid}', parentid));
        };
        RbacService.prototype.getPermissionTypes = function (applicationid) {
            return this.httpService.get(PermissionsURL.EndPoints.permission.getPermissionTypes.replace('{applicationid}', applicationid));
        };
        RbacService.prototype.getOrganizationPage = function (orgId) {
            return this.httpService.get(AccessManagementConfig$1.EndPoint.Organization.getOrganization.replace('{orgId}', orgId));
        };
        RbacService.prototype.createCategory = function (category) {
            return this.httpService.post(MasterURL.EndPoints.lookup.createCategory, category);
        };
        RbacService.prototype.updateCategory = function (category) {
            return this.httpService.put(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', category.id), category);
        };
        RbacService.prototype.deleteCategory = function (categoryId) {
            return this.httpService.delete(MasterURL.EndPoints.lookup.updateDeleteCategory.replace('{id}', categoryId));
        };
        RbacService.prototype.getLookup = function (id) {
            return this.httpService.get(MasterURL.EndPoints.lookup.lookup.replace('{id}', id));
        };
        RbacService.prototype.createLookup = function (lookup) {
            return this.httpService.post(MasterURL.EndPoints.lookup.createLookup, lookup);
        };
        RbacService.prototype.updateLookup = function (lookup) {
            return this.httpService.put(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookup.id), lookup);
        };
        RbacService.prototype.deleteLookup = function (lookupId) {
            return this.httpService.delete(MasterURL.EndPoints.lookup.lookup.replace('{id}', lookupId));
        };
        RbacService.prototype.getAllCategoryTree = function (applicationid) {
            return this.httpService
                .get(MasterURL.EndPoints.lookup.getAllCategoryTree.replace('{applicationid}', applicationid))
                .pipe(operators.map(function (item) {
                return item.data;
            }));
        };
        RbacService.prototype.getLookupTree = function (categoryid) {
            return this.httpService.get(MasterURL.EndPoints.lookup.getLookupTree.replace('{categoryid}', categoryid));
        };
        RbacService.prototype.getLookupBycategoryID = function (categoryid) {
            return this.httpService.get(MasterURL.EndPoints.lookup.getLookupByCategoryId.replace('{id}', categoryid));
        };
        RbacService.prototype.getAllLookupBycategoryID = function (categoryid) {
            return this.httpService.get(MasterURL.EndPoints.lookup.getAllLookupByCategoryId.replace('{categoryId}', categoryid));
        };
        RbacService.prototype.addOrUpdateLookup = function (lookup) {
            return this.httpService.post(MasterURL.EndPoints.lookup.addOrUpdateLookup, lookup);
        };
        RbacService.prototype.updateLookupOrder = function (lookup, sortOrder) {
            return this.httpService.put((MasterURL.EndPoints.lookup.updateLookupOrders.replace('{sortOrder}', sortOrder)), lookup);
        };
        return RbacService;
    }());
    RbacService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: RbacService, deps: [{ token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    RbacService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: RbacService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: RbacService, decorators: [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], ctorParameters: function () { return [{ type: DataStoreService }]; } });

    var AlertService = /** @class */ (function () {
        function AlertService(router) {
            var _this = this;
            this.router = router;
            this.subject = new rxjs.Subject();
            this.keepAfterRouteChange = false;
            // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
            router.events.subscribe(function (event) {
                if (event instanceof i1.NavigationStart) {
                    if (_this.keepAfterRouteChange) {
                        // only keep for a single route change
                        _this.keepAfterRouteChange = false;
                    }
                    else {
                        // clear alert messages
                        _this.clear();
                    }
                }
            });
        }
        AlertService.prototype.getAlert = function () {
            return this.subject.asObservable();
        };
        AlertService.prototype.success = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Success, message, keepAfterRouteChange);
        };
        AlertService.prototype.error = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Error, message, keepAfterRouteChange);
        };
        AlertService.prototype.info = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Info, message, keepAfterRouteChange);
        };
        AlertService.prototype.warn = function (message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.alert(AlertType.Warning, message, keepAfterRouteChange);
        };
        AlertService.prototype.alert = function (type, message, keepAfterRouteChange) {
            if (keepAfterRouteChange === void 0) { keepAfterRouteChange = false; }
            this.keepAfterRouteChange = keepAfterRouteChange;
            this.subject.next({ type: type, message: message });
        };
        AlertService.prototype.clear = function () {
            // clear alerts
            this.subject.next({});
        };
        return AlertService;
    }());
    AlertService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService, deps: [{ token: i1__namespace.Router }], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    AlertService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertService, decorators: [{
                type: i0.Injectable
            }], ctorParameters: function () { return [{ type: i1__namespace.Router }]; } });
    var AlertType;
    (function (AlertType) {
        AlertType[AlertType["Success"] = 0] = "Success";
        AlertType[AlertType["Error"] = 1] = "Error";
        AlertType[AlertType["Info"] = 2] = "Info";
        AlertType[AlertType["Warning"] = 3] = "Warning";
    })(AlertType || (AlertType = {}));
    var Alert = /** @class */ (function () {
        function Alert() {
        }
        return Alert;
    }());
    var UserGroupDto = /** @class */ (function () {
        function UserGroupDto(data) {
            Object.assign(this, data);
        }
        return UserGroupDto;
    }());
    var UserRolePageDto = /** @class */ (function () {
        function UserRolePageDto(data) {
            Object.assign(this, data);
        }
        return UserRolePageDto;
    }());
    var UserRoleDto = /** @class */ (function () {
        function UserRoleDto(data) {
            Object.assign(this, data);
        }
        return UserRoleDto;
    }());
    var UserDto = /** @class */ (function () {
        function UserDto(data) {
            Object.assign(this, data);
        }
        return UserDto;
    }());
    var AccessManagementConfig = /** @class */ (function () {
        function AccessManagementConfig() {
        }
        return AccessManagementConfig;
    }());
    AccessManagementConfig.EndPoint = {
        Organization: {
            getOrganizationList: '/org/organization/all',
            getOrganization: '/platform/page-designer/page/organization/{orgId}?returnUserPage=false&excludeNoActiveVersionPages=true'
        }
    };

    var DISPLAY_IN_SECONDS = 8;
    var AlertComponent = /** @class */ (function () {
        function AlertComponent(alertService) {
            this.alertService = alertService;
            this.alerts = [];
        }
        AlertComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.alertService.getAlert().subscribe(function (alert) {
                if (!alert) {
                    // clear alerts when an empty alert is received
                    _this.alerts = [];
                    return;
                }
                // add alert to array
                _this.alerts.push(alert);
                // remove alert after 5 seconds
                setTimeout(function () { return _this.removeAlert(alert); }, DISPLAY_IN_SECONDS * 1000);
            });
        };
        AlertComponent.prototype.removeAlert = function (alert) {
            this.alerts = this.alerts.filter(function (x) { return x !== alert; });
        };
        AlertComponent.prototype.cssClass = function (alert) {
            if (!alert) {
                return;
            }
            // return css class based on alert type
            switch (alert.type) {
                case AlertType.Success:
                    return 'alert alert-success';
                case AlertType.Error:
                    return 'alert alert-danger';
                case AlertType.Info:
                    return 'alert alert-info';
                case AlertType.Warning:
                    return 'alert alert-warning';
            }
        };
        return AlertComponent;
    }());
    AlertComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertComponent, deps: [{ token: AlertService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AlertComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: AlertComponent, selector: "app-alert", ngImport: i0__namespace, template: "<div *ngFor=\"let alert of alerts\" class=\"alert-animate {{ cssClass(alert) }} alert-dismissable\">\n  {{ alert.message }}\n  <a class=\"close\" (click)=\"removeAlert(alert)\">&times;</a>\n</div>\n", styles: [".alert-animate{position:fixed;top:10px;left:auto;right:10px;z-index:999999;min-width:400px;text-transform:capitalize;margin:0 auto;animation-name:slideInDown;animation-duration:1s;animation-fill-mode:both}.alert-animate .close{padding:3px;border-radius:2px;color:#fff;opacity:1;text-align:center;line-height:17px;font-size:24px}@keyframes slideInDown{0%{transform:translateY(-100%);visibility:visible}to{transform:translateY(0)}}.alert-animate.alert-success{background:#04844b;color:#fff;border-color:#04844b}.alert-danger{background:#b92b28;border-color:#b92b28;color:#fff}.alert-info{color:#fff;background:#0f3164;border-color:#0f3164}\n"], directives: [{ type: i2__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertComponent, decorators: [{
                type: i0.Component,
                args: [{
                        // moduleId: module.id,
                        selector: 'app-alert',
                        templateUrl: 'alert.component.html',
                        styleUrls: ['./alert.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: AlertService }]; } });

    var PermissionDirective = /** @class */ (function () {
        function PermissionDirective(renderer, elementRef, dataStore) {
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.dataStore = dataStore;
        }
        PermissionDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            var permissions = this.dataStore.state;
            if (permissions) {
                if (!permissions[this.fieldKey]) {
                    var template = this.elementRef.nativeElement;
                    if (template.tagName === 'A') {
                        if (template) {
                            var r = document.createElement(this.elementRef.nativeElement.tagName.toLowerCase());
                            r.innerHTML = template.innerHTML;
                            r.href = 'javascript:void(0);';
                            r['disabled'] = true;
                            r.className = template.className;
                            this.elementRef.nativeElement.parentNode.replaceChild(r, template);
                        }
                    }
                    else if (template.tagName === 'P-MULTISELECT' ||
                        template.tagName === 'P-DROPDOWN' ||
                        template.tagName === 'P-CHECKBOX' ||
                        template.tagName === 'P-TREESELECT' ||
                        template.tagName === 'P-RADIOBUTTON' ||
                        template.tagName === 'P-CALENDAR') {
                        if (template) {
                            var r = document.createElement(this.elementRef.nativeElement.tagName.toLowerCase());
                            r.innerHTML = template.innerHTML;
                            r.className = template.className;
                            r.className += ' p-disabled';
                            this.elementRef.nativeElement.parentNode.replaceChild(r, template);
                        }
                    }
                    else {
                        this.renderer.setProperty(this.elementRef.nativeElement, 'disabled', 'true');
                        var childInputNodes = this.elementRef.nativeElement.querySelectorAll('input, select, textarea, button, a, ng-select, div, lable');
                        childInputNodes.forEach(function (elem) {
                            _this.renderer.setAttribute(elem, 'disabled', 'true');
                        });
                    }
                }
            }
        };
        return PermissionDirective;
    }());
    PermissionDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionDirective, deps: [{ token: i0__namespace.Renderer2 }, { token: i0__namespace.ElementRef }, { token: PermissionStore }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    PermissionDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: PermissionDirective, selector: "[fieldKey]", inputs: { fieldKey: "fieldKey" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PermissionDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[fieldKey]'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.Renderer2 }, { type: i0__namespace.ElementRef }, { type: PermissionStore }]; }, propDecorators: { fieldKey: [{
                    type: i0.Input
                }] } });

    var MasterdataComponent$1 = /** @class */ (function () {
        function MasterdataComponent(mastersService, formBuilder, alertService, confirmationService, permissionStore, _storeservice) {
            this.mastersService = mastersService;
            this.formBuilder = formBuilder;
            this.alertService = alertService;
            this.confirmationService = confirmationService;
            this.permissionStore = permissionStore;
            this._storeservice = _storeservice;
            this.menuItems = [];
            this.filterMasterList = [];
            this.selectedItem = {};
            this.pageErrorShow = false;
            this.dataControlActions = [
                { value: '', name: 'Select' },
                { value: 'HIDE', name: 'Hide' },
                { value: 'DISABLE', name: 'Disable' },
                { value: 'MASK', name: 'Mask' }
            ];
            this.sortOrder = [
                { value: 'asc', name: 'ASC' },
                { value: 'desc', name: 'DESC' }
            ];
            this.RBACORG = new RBACINFO();
            this.tasksData = [];
            this.rowEditMode = 'batch';
            this.pattern = /^[a-zA-Z0-9-_ ]+$/;
            //pattern: any = /^[a-zA-Z0-9,./ _*-]+$/;
            this.orderPattern = /^[0-9]+$/;
            this.allowDropInsideItem = true;
            this.allowReordering = false;
            this.showDragIcons = false;
            this.isEditMode = true;
            this.expandedRowKeys = [1];
            this.isSaveDisabled = false;
            this.isReorderMode = false;
            this.selectedSortOrder = 'asc';
            this.activeTabIndex = 0;
            this.formSubmit = false;
            this.validationErrors = {};
            this.nodeType = 'category';
            this.saveMode = 'INSERT';
            this.isGlobalLookup = true;
            this.selectedCategoryId = '';
            this.initializeCategoryForm();
            this.initializeLookupForm();
            this.showDragIcons = true;
            this.onReorder = this.onReorder.bind(this);
            this.checkKeyDuplicate = this.checkKeyDuplicate.bind(this);
            this.checkValueDuplicate = this.checkValueDuplicate.bind(this);
        }
        MasterdataComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.orgSubs = this._storeservice.currentStore.subscribe(function (res) {
                _this.inputValidationMethod = res['INPUTVALIDATIONMETHOD'];
                if (res['RBACORG'] && res['RBACORG'] !== '') {
                    _this.RBACORG = res['RBACORG'];
                    console.log(_this.RBACORG, 'RBACORG Permisson');
                    _this.environment = _this.RBACORG['environment'];
                    _this.orgId = parseInt(_this.RBACORG['orgID']);
                    if (_this.environment) {
                        _this.loadTree();
                        _this.loadContextMenu();
                        _this.mastersService.getAllUserRole().subscribe(function (items) {
                            _this.roles = items.data;
                        });
                        _this.mastersService.getPermissionsTree(_this.environment.applicationid).subscribe(function (items) {
                            _this.permissions = items.data;
                        });
                    }
                }
            });
        };
        MasterdataComponent.prototype.ngOnDestroy = function () {
            this.orgSubs.unsubscribe();
        };
        MasterdataComponent.prototype.initializeCategoryForm = function () {
            this.lookuporder = new i2$1.FormControl();
            this.categoryForm = this.formBuilder.group({
                id: [0],
                applicationid: [this.environment ? this.environment['applicationid'] : ''],
                name: ['', i2$1.Validators.required],
                description: [''],
                readonly: [false],
                isenabled: [true],
                lookuporder: this.lookuporder
            });
        };
        MasterdataComponent.prototype.clearCategory = function () {
            var _this = this;
            //this.clearForm();
            this.formSubmit = false;
            this.validationErrors = {};
            this.initializeCategoryForm();
            this.mastersService.getLookupBycategoryID(this.selectedCategoryId).subscribe(function (item) {
                var lookupdataitems = item['data'];
                _this.categoryForm.patchValue({
                    id: lookupdataitems.id,
                    applicationid: lookupdataitems.applicationid,
                    name: lookupdataitems.name,
                    description: lookupdataitems.description,
                    readonly: lookupdataitems.readonly,
                    isenabled: lookupdataitems.isenabled,
                });
            });
        };
        MasterdataComponent.prototype.onInput = function (event, fieldtype, label, required) {
            var error = this.inputValidationMethod(event, fieldtype, label, required);
            if (error && typeof error === 'string') {
                this.validationErrors[label] = error;
            }
            else {
                delete this.validationErrors[label];
            }
        };
        MasterdataComponent.prototype.onClickHome = function () {
            this.saveMode = 'INSERT';
            this.nodeType = 'category';
            this.selectedCategoryId = '';
            this.clearForm();
            this.loadTree();
            this.formSubmit = false;
            this.validationErrors = {};
        };
        MasterdataComponent.prototype.clearForm = function () {
            this.validationErrors = {};
            this.formSubmit = false;
            this.initializeCategoryForm();
            this.tasksData = [];
        };
        MasterdataComponent.prototype.onClickAddCategory = function () {
            this.saveMode = 'INSERT';
            this.nodeType = 'category';
            this.selectedCategoryId = '';
            this.clearForm();
            this.loadTree();
        };
        // onClickDeleteCategory() {
        //   this.saveMode = 'DELETE';
        //   this.nodeType = this.selectedItem.type;
        //   $('#Deleteuser').modal('show');
        // }
        MasterdataComponent.prototype.initNewRow = function (e) {
            e.data.order = 0;
            //e.data.id = 0;
            e.data.lookupcategoryid = this.selectedCategoryId;
        };
        MasterdataComponent.prototype.onCellPrepared = function (event) {
            // The event parameter contains information about the Component data
            this.visibleRows = event.component.getVisibleRows();
        };
        MasterdataComponent.prototype.onEditCanceled = function (event) {
            this.list(this.selectedCategoryId);
        };
        MasterdataComponent.prototype.onToolbarPreparing = function (e) {
            var toolbarItems = e.toolbarOptions.items;
            // Modifies an existing item
            toolbarItems.forEach(function (item) {
                if (item.name === "searchPanel") {
                    item.location = "before";
                }
            });
        };
        MasterdataComponent.prototype.onRowValidating = function (e) {
            console.log('event', e);
            if (e.isValid == false) {
                this.alertService.error("Please correct existing row-level validation(s).");
            }
            // else {
            //     this.isSaveDisabled = false;
            //     const saveButton = e.element.find("[aria-label='Speichern']").dxButton("instance");
            //     saveButton.option("disabled", this.isSaveDisabled);
            // }
        };
        //   onRowValidating(e) {
        //     console.log('event', e);
        //     const saveButton = e.element.querySelector(".dx-treelist-save-button"); // Use the correct class name
        //     if (e.isValid === false) {
        //         this.isSaveDisabled = true;
        //        // saveButton.prop("disabled", true);
        //        // this.alertService.error(`Error: Duplicate value found`);
        //     } else {
        //         this.isSaveDisabled = false;
        //       //  saveButton.prop("disabled", false);
        //     }
        //  }
        MasterdataComponent.prototype.handleTabClick = function (event) {
            console.log('Tab clicked:', event.itemData);
            if (event.itemData.text == 'Edit') {
                this.toggleEditMode();
            }
            if (event.itemData.text == 'Reorder') {
                this.toggleReorderMode();
            }
        };
        MasterdataComponent.prototype.toggleEditMode = function () {
            this.isEditMode = true;
            this.batchEdit = "batch";
            this.isReorderMode = false;
            this.list(this.selectedCategoryId);
        };
        MasterdataComponent.prototype.toggleReorderMode = function () {
            this.isEditMode = false;
            this.batchEdit = "";
            this.allowReordering = true;
            this.showDragIcons = true;
            this.isReorderMode = true;
            this.list(this.selectedCategoryId);
        };
        MasterdataComponent.prototype.onTabChange = function (event) {
            // Handle tab change logic here
            console.log('Tab changed:', event.index);
            if (event.index === 0) {
                // Call your toggleEditMode() method
                this.toggleEditMode();
            }
            else if (event.index === 1) {
                // Call your toggleReorderMode() method
                this.toggleReorderMode();
            }
        };
        MasterdataComponent.prototype.onReorder = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var sortOrder, visibleRows, toIndex, fromIndex;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            sortOrder = 'custom';
                            visibleRows = e.component.getVisibleRows();
                            toIndex = this.tasksData.findIndex(function (item) { return item.id === visibleRows[e.toIndex].data.id; });
                            fromIndex = this.tasksData.findIndex(function (item) { return item.id === e.itemData.id; });
                            this.tasksData.splice(fromIndex, 1);
                            this.tasksData.splice(toIndex, 0, e.itemData);
                            //moveItemInArray(this.tasksData, e.fromIndex, e.toIndex);
                            this.tasksData.forEach(function (item, index) {
                                item.order = index + 1;
                            });
                            return [4 /*yield*/, this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.list(this.selectedCategoryId)];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MasterdataComponent.prototype.sortGrid = function (order) {
            return __awaiter(this, void 0, void 0, function () {
                var sortOrder, sortOrder;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(order === 'asc')) return [3 /*break*/, 2];
                            sortOrder = 'asc';
                            this.tasksData.sort(function (a, b) { return a.value.localeCompare(b.value); });
                            this.tasksData.forEach(function (item, index) { return item.order = index + 1; });
                            return [4 /*yield*/, this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.list(this.selectedCategoryId)];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2:
                            sortOrder = 'desc';
                            this.tasksData.sort(function (a, b) { return b.value.localeCompare(a.value); });
                            this.tasksData.forEach(function (item, index) { return item.order = index + 1; });
                            return [4 /*yield*/, this.mastersService.updateLookupOrder(this.tasksData, sortOrder).subscribe(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.list(this.selectedCategoryId)];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        MasterdataComponent.prototype.checkKeyDuplicate = function (params) {
            if (params.data && params.data.key && params.data.key.length > 0) {
                var editedKey_1 = params.data.key.trim().toLowerCase();
                var occurrences = this.visibleRows.filter(function (item) {
                    item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid;
                    params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid;
                    if (params.data.parentid == item.data.parentid) {
                        return item.data && item.data.key && item.data.key.trim().toLowerCase() === editedKey_1;
                    }
                }).length;
                var isDuplicate = occurrences > 1;
                return !isDuplicate;
            }
        };
        MasterdataComponent.prototype.checkValueDuplicate = function (params) {
            if (params.data && params.data.value && params.data.value.length > 0) {
                var editedValue_1 = params.data.value.trim().toLowerCase();
                var occurrences = this.visibleRows.filter(function (item) {
                    item.data.parentid = item.data.parentid == null ? 0 : item.data.parentid;
                    params.data.parentid = params.data.parentid == null ? 0 : params.data.parentid;
                    if (params.data.parentid == item.data.parentid) {
                        return item.data && item.data.value && item.data.value.trim().toLowerCase() === editedValue_1;
                    }
                }).length;
                var isDuplicate = occurrences > 1;
                return !isDuplicate;
            }
        };
        MasterdataComponent.prototype.nodeSelect = function (event) {
            this.validationErrors = {};
            this.formSubmit = false;
            this.nodeselecttype = 'UPDATE';
            this.saveMode = 'UPDATE';
            this.nodeType = event.node.type;
            this.selectedEvent = event;
            this.selectedCategoryId = event.node.id;
            this.tasksData = [];
            this.activeTabIndex = 0; // Simulate tab change event to index 0
            this.onTabChange({ index: 0 });
        };
        MasterdataComponent.prototype.list = function (id) {
            var _this = this;
            this.nodeselecttype = 'UPDATE';
            this.saveMode = 'UPDATE';
            this.nodeType = 'category';
            this.mastersService.getLookupBycategoryID(id).subscribe(function (item) {
                var lookupdataitems = item['data'];
                _this.categoryForm.patchValue({
                    id: lookupdataitems.id,
                    applicationid: lookupdataitems.applicationid,
                    name: lookupdataitems.name,
                    description: lookupdataitems.description,
                    readonly: lookupdataitems.readonly,
                    isenabled: lookupdataitems.isenabled,
                    lookuporder: lookupdataitems.lookuporder
                });
                _this.mastersService.getAllLookupBycategoryID(id).subscribe(function (nodes) {
                    _this.tasksData = nodes.data;
                });
            });
        };
        MasterdataComponent.prototype.checkValidData = function (event) {
            var validationRules = event.component.option('validationRules');
            var hasValidationErrors = validationRules.some(function (rule) { return !rule.isValid; });
            if (hasValidationErrors) {
                this.isSaveDisabled = true;
            }
            else {
                // Enable the Save icon
                this.isSaveDisabled = false;
            }
        };
        MasterdataComponent.prototype.saveChanges = function (event) {
            var e_1, _b;
            var _this = this;
            console.log('addedItems', event);
            var changes = event.changes || [];
            var keysSet = new Set();
            var valuesSet = new Set();
            var lookupcategoryid;
            var _loop_1 = function (change) {
                if (change.type === 'update') {
                    var originalData = this_1.tasksData.filter(function (originalItem) { return originalItem.id === change.key; });
                    change.data = Object.assign(Object.assign({}, originalData[0]), change.data);
                }
            };
            var this_1 = this;
            try {
                for (var changes_1 = __values(changes), changes_1_1 = changes_1.next(); !changes_1_1.done; changes_1_1 = changes_1.next()) {
                    var change = changes_1_1.value;
                    _loop_1(change);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (changes_1_1 && !changes_1_1.done && (_b = changes_1.return)) _b.call(changes_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // for (const change of changes) {
            //   if (change.type === 'insert' || change.type === 'update') {
            //     lookupcategoryid = change.data.lookupcategoryid;
            //     const item = change.data;
            //     // Check for duplicate keys and values
            //     if (keysSet.has(item.key)) {
            //       this.alertService.error(`Error: Duplicate key found - ${item.key}`);
            //       // Optionally, you can prevent further processing or handle the error differently.
            //     } else {
            //       keysSet.add(item.key);
            //     }
            //     if (valuesSet.has(item.value)) {
            //       this.alertService.error(`Error: Duplicate value found - ${item.value}`);
            //       // Optionally, you can prevent further processing or handle the error differently.
            //     } else {
            //       valuesSet.add(item.value);
            //     }
            //   }
            // }
            var request = {
                // keylist:  Array.from(keysSet),
                // valuelist: Array.from(valuesSet),
                data: changes,
                // lookupcategoryid: lookupcategoryid
            };
            // Make the API call
            this.mastersService.addOrUpdateLookup(request).subscribe(function () {
                // API call was successful, update UI or refresh data
                _this.alertService.success('Updated Successfully');
                // this.loadTree();
                _this.clearForm();
                _this.nodeSelect(_this.selectedEvent);
            }, function (err) {
                // Handle API call error without refreshing the data
                _this.alertService.error(err.error.message);
            });
        };
        MasterdataComponent.prototype.initializeLookupForm = function () {
            this.pageErrorShow = false;
            this.lookupForm = this.formBuilder.group({
                id: [0],
                lookupcategoryid: [0],
                parentid: [null],
                // optionaldata: this.formBuilder.group({
                //   rules: this.formBuilder.array([])
                // }),
                // access: this.formBuilder.group({
                //   assign: ['', [this.requiredIfValidator(() => !this.isGlobalLookup)]],
                //   view: ['', [this.requiredIfValidator(() => !this.isGlobalLookup)]]
                // }),
                lookupdata: this.formBuilder.array([this.addlookupdata()]),
                readonly: [false],
                global: [true],
                isenabled: [true]
            });
        };
        Object.defineProperty(MasterdataComponent.prototype, "lookupdata", {
            // get datarules() {
            //   return this.lookupForm.get('optionaldata.rules') as FormArray;
            // }
            get: function () {
                return this.lookupForm.get('lookupdata');
            },
            enumerable: false,
            configurable: true
        });
        MasterdataComponent.prototype.addRule = function () {
            return this.formBuilder.group({
                roles: ['', i2$1.Validators.required],
                permission: ['', i2$1.Validators.required],
                action: ['', i2$1.Validators.required]
            });
        };
        // onAddRule(): void {
        //   this.datarules.push(this.addRule());
        // }
        MasterdataComponent.prototype.addlookupdata = function () {
            return this.formBuilder.group({
                key: ['', i2$1.Validators.required],
                value: ['', i2$1.Validators.required],
                order: [0]
            });
        };
        MasterdataComponent.prototype.onAddLookUpData = function () {
            this.pageErrorShow = false;
            this.lookupdata.push(this.addlookupdata());
        };
        MasterdataComponent.prototype.onDeleteLookupData = function (i) {
            this.lookupdata.removeAt(i);
        };
        // onDeleteRule(rowIndex: number): void {
        //   this.datarules.removeAt(rowIndex);
        // }
        MasterdataComponent.prototype.onClickdeleteCategory = function () {
            // this.saveMode = 'DELETE';
            this.nodeType = this.selectedItem.type;
            $('#Deleteuser').modal('show');
        };
        MasterdataComponent.prototype.searchMaster = function (event) {
            var value = event.target.value.toUpperCase();
            this.filterMasterList = this.categories.filter(function (a) { var _a; return (_a = a['name']) === null || _a === void 0 ? void 0 : _a.toUpperCase().startsWith(value); });
        };
        MasterdataComponent.prototype.clearSearch = function () {
            var inputElement = document.querySelector('.form-control');
            if (inputElement) {
                inputElement.value = '';
                this.filterMasterList = this.categories; // Reset the filtered list
            }
        };
        MasterdataComponent.prototype.onNodeContextMenuSelect = function (event) {
            var _this = this;
            if (event.node.type === 'category') {
                var permission = this.permissionStore.state;
                this.menuItems = [
                    // {
                    //   label: 'Create Category',
                    //   icon: PrimeIcons.ARROW_UP_LEFT,
                    //   //visible: permission.SETTINGS_MAS_CREATE_CATOGORY,
                    //   badge: 'SETTINGS_MAS_CREATE_CATOGORY',
                    //   command: (createEvent: any) => {
                    //     this.saveMode = 'INSERT';
                    //     this.nodeType = 'category';
                    //     this.selectedCategoryId = '';
                    //     this.clearForm();
                    //     this.loadTree();
                    //     console.log(createEvent);
                    //   }
                    // },
                    {
                        label: 'Delete',
                        icon: i4.PrimeIcons.TRASH,
                        visible: permission.SETTINGS_MAS_DELETE,
                        badge: 'SETTINGS_MAS_DELETE',
                        command: function (deleteEvent) {
                            _this.saveMode = 'DELETE';
                            _this.nodeType = _this.selectedItem.type;
                            $('#Deleteuser').modal('show');
                            // this.confirmationService.confirm({
                            //   target: deleteEvent.target,
                            //   message: 'Are you sure that you want to delete?',
                            //   icon: 'pi pi-exclamation-triangle',
                            //   accept: () => {
                            //     this.deleteItem();
                            //   },
                            //   reject: () => {
                            //     //not to be empty
                            //   }
                            // });
                        }
                    }
                ];
            }
            else if (event.node.type === 'lookup') {
                this.menuItems = [
                    {
                        label: 'Create Lookup',
                        icon: i4.PrimeIcons.ARROW_DOWN_RIGHT,
                        command: function (_eventErase) {
                            _this.setInsertEvent();
                        }
                    },
                    {
                        label: 'Delete',
                        icon: i4.PrimeIcons.TRASH,
                        command: function (RemoveEvent) {
                            _this.saveMode = 'DELETE';
                            _this.nodeType = _this.selectedItem.type;
                            console.log(RemoveEvent);
                            $('#Deleteuser').modal('show');
                            // this.confirmationService.confirm({
                            //   target: RemoveEvent.target,
                            //   message: 'Are you sure that you want to delete?',
                            //   icon: 'pi pi-exclamation-triangle',
                            //   accept: () => {
                            //     this.deleteItem();
                            //   },
                            //   reject: () => {
                            //     //not to be empty
                            //   }
                            // });
                        }
                    }
                ];
            }
        };
        MasterdataComponent.prototype.setInsertEvent = function () {
            this.saveMode = 'INSERT';
            this.nodeType = this.selectedItem.type;
            this.createLookupForm();
            // this.clearRules();
        };
        MasterdataComponent.prototype.nodeExpand = function (event) {
            if (event.node && event.node.data && event.node.type !== 'lookup') {
                this.mastersService.getLookupTree(event.node.data).subscribe(function (nodes) {
                    var sortedChildren = nodes.data.sort(function (a, b) { return a.value.localeCompare(b.value); });
                    event.node.children = sortedChildren;
                });
            }
        };
        MasterdataComponent.prototype.saveCategory = function () {
            var _this = this;
            var category = this.categoryForm.value;
            this.formSubmit = true;
            category.applicationid = this.environment.applicationid;
            console.log(category);
            category.order = category.order ? Number(category.order) : 1;
            if (this.categoryForm.valid) {
                if (this.saveMode === 'INSERT') {
                    this.mastersService.createCategory(category).subscribe(function (response) {
                        _this.alertService.success('Category created successfully.');
                        //this.selectedCategoryId = response.data;
                        _this.cancel();
                        _this.loadTree();
                        _this.clearForm();
                    }, function (err) { return _this.alertService.error(err.error.message); });
                }
                else {
                    this.mastersService.updateCategory(category).subscribe(function () {
                        _this.alertService.success('Category updated successfully.');
                        _this.cancel();
                        _this.list(_this.selectedCategoryId);
                        _this.loadTree();
                        _this.clearForm();
                    }, function (err) { return _this.alertService.error(err.error.message); });
                }
            }
            // else {
            //   this.alertService.error('Please Fill All Required Fields');
            // }
        };
        MasterdataComponent.prototype.saveLookup = function () {
            var _this = this;
            this.pageErrorShow = true;
            var lookupdts = this.lookupForm.value;
            lookupdts.applicationid = this.environment.applicationid;
            lookupdts.order = lookupdts.order ? Number(lookupdts.order) : Number(1);
            if (this.lookupForm.valid) {
                delete lookupdts.readonly;
                lookupdts.lookup.order = lookupdts.lookup.order ? Number(lookupdts.lookup.order) : 1;
                // if (lookup.optionaldata && lookup.optionaldata.rules) {
                //   lookup.optionaldata.rules = lookup.optionaldata.rules.map((rule: any) => {
                //     rule.permission.parent = null;
                //     return rule;
                //   });
                // }
                if (this.saveMode === 'INSERT') {
                    this.mastersService.createLookup(lookupdts).subscribe(function () {
                        _this.alertService.success('Lookup created successfully.');
                        _this.loadTree();
                        _this.clearForm();
                    }, function (err) { return _this.alertService.error(err.error.message); });
                }
                else {
                    this.mastersService.updateLookup(lookupdts).subscribe(function () {
                        _this.alertService.success('Lookup updated successfully.');
                        _this.loadTree();
                        _this.clearForm();
                    }, function (err) { return _this.alertService.error(err.error.message); });
                }
            }
            else {
                // this.alertService.error('Invalid lookup data.');
            }
        };
        MasterdataComponent.prototype.createLookupForm = function () {
            this.initializeLookupForm();
            this.setGlobal(true);
            if (this.nodeType === 'category') {
                this.nodeType = 'lookup';
                this.lookupForm.patchValue({
                    lookupcategoryid: this.selectedItem.id
                });
            }
            else {
                this.lookupForm.patchValue({
                    lookupcategoryid: this.selectedItem.lookupcategoryid,
                    parentid: this.selectedItem.id
                });
            }
        };
        MasterdataComponent.prototype.setGlobal = function (checked) {
            var _a;
            this.isGlobalLookup = checked;
            (_a = this.lookupForm.get('access')) === null || _a === void 0 ? void 0 : _a.patchValue({
                view: [],
                assign: []
            });
        };
        MasterdataComponent.prototype.loadContextMenu = function () {
            var _this = this;
            this.menuItems = [
                {
                    label: 'Create Category',
                    icon: i4.PrimeIcons.ARROW_UP_LEFT,
                    command: function (event) {
                        _this.saveMode = 'INSERT';
                        _this.nodeType = 'category';
                        _this.clearForm();
                        console.log(event);
                    }
                },
                {
                    label: 'Create Lookup',
                    icon: i4.PrimeIcons.ARROW_DOWN_RIGHT,
                    command: function (_eventNode) {
                        _this.setInsertEvent();
                    }
                },
                {
                    label: 'Delete',
                    icon: i4.PrimeIcons.TRASH,
                    command: function (event) {
                        _this.saveMode = 'DELETE';
                        _this.nodeType = _this.selectedItem.type;
                        console.log(event);
                        $('#Deleteuser').modal('show');
                        // this.confirmationService.confirm({
                        //   target: event.target,
                        //   message: 'Are you sure that you want to delete?',
                        //   icon: 'pi pi-exclamation-triangle',
                        //   accept: () => {
                        //     //confirm action
                        //     this.deleteItem();
                        //   },
                        //   reject: () => {
                        //     // This is intentional
                        //   }
                        // });
                    }
                }
            ];
        };
        MasterdataComponent.prototype.loadTree = function () {
            var _this = this;
            this.pageErrorShow = false;
            this.mastersService.getAllCategoryTree(this.environment.applicationid).subscribe(function (items) {
                _this.categories = items;
                if (_this.categories.length) {
                    // this.selectedItem = this.categories[0];
                    if (_this.selectedCategoryId) {
                        var index = _this.categories.findIndex(function (category) { return category.id === _this.selectedCategoryId; });
                        if (index !== -1) {
                            _this.selectedItem = _this.categories[index];
                        }
                    }
                    _this.filterMasterList = _this.categories;
                }
            });
            this.clearSearch();
        };
        MasterdataComponent.prototype.cancel = function () {
            this.categoryForm.reset();
            this.formSubmit = false;
        };
        MasterdataComponent.prototype.deleteItem = function () {
            var _this = this;
            this.saveMode = 'UPDATE';
            if (this.selectedItem.type === 'lookup') {
                this.mastersService.deleteLookup(this.selectedItem.id).subscribe(function (_item) {
                    _this.cancel();
                    $('#Deleteuser').modal('hide');
                    _this.alertService.success('Lookup deleted successfully.');
                    _this.loadTree();
                });
            }
            else {
                this.mastersService.deleteCategory(this.selectedItem.id).subscribe(function (_item) {
                    _this.cancel();
                    $('#Deleteuser').modal('hide');
                    _this.alertService.success('Category deleted successfully.');
                    _this.selectedCategoryId = '';
                    _this.onClickHome();
                });
            }
        };
        MasterdataComponent.prototype.requiredIfValidator = function (predicate) {
            return function (formControl) {
                if (!formControl.parent) {
                    return null;
                }
                if (predicate()) {
                    return i2$1.Validators.required(formControl);
                }
                return null;
            };
        };
        return MasterdataComponent;
    }());
    MasterdataComponent$1.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataComponent$1, deps: [{ token: RbacService }, { token: i2__namespace$1.FormBuilder }, { token: AlertService }, { token: i4__namespace.ConfirmationService }, { token: PermissionStore }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MasterdataComponent$1.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent$1, selector: "lib-masterdata", viewQueries: [{ propertyName: "treeList", first: true, predicate: i15.DxTreeListComponent, descendants: true }], ngImport: i0__namespace, template: "<head>\n  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn3.devexpress.com/jslib/23.2.3/css/dx.material.blue.light.css\" />\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css\" integrity=\"sha384-dfST6o4eMl42MOv72d7aMR3zdTtiErUq6nhB65eA6ATlFAq1RfiaDJt9FCx0X1o5\" crossorigin=\"anonymous\">\n</head>\n<app-alert></app-alert>\n<div class=\"permission\">\n  <div class=\"row\">\n    <div class=\"col-lg-4 col-md-6 col-12\">\n      <div class=\"clearfix\"></div>\n      <div class=\"tab-content py-2\">\n        <div class=\"tab-pane fade show active\">\n          <div class=\"row\">\n            <div class=\"col-md-10 col-12 form-group bgiconsearch pr-1\">\n              <span class=\"p-input-icon-right w-100\">\n                <i class=\"pi pi-times-circle\" (click)=\"clearSearch()\"></i>\n                <input class=\"form-control\" placeholder=\"Search by Category name\" type=\"text\" (keyup)=\"searchMaster($event)\"\n                  fieldKey=\"SETTINGS_MAS_SEARCH_BY_NAME\" pInputText />\n              </span>\n            </div>\n            <div class=\"col-md-2 col-12 form-group pl-0 text-md-right\">\n              <button type=\"button\" class=\"btn btn-primary btncommon\" (click)=\"onClickAddCategory()\">Add</button>\n            </div>\n          </div>\n          <div class=\"clearfix\"></div>\n          <div class=\"masteracess\">\n            <p-tree [value]=\"filterMasterList\" selectionMode=\"single\" [(selection)]=\"selectedItem\"\n              (onNodeSelect)=\"nodeSelect($event)\">\n            </p-tree>\n            <p-contextMenu #treeContextMenu [model]=\"menuItems\" appendTo=\"body\"></p-contextMenu>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"col-lg-8 col-md-6 col-12 master-right mt-2\">\n      <p-confirmPopup></p-confirmPopup>\n      <p-card id=\"categoryForm\" class=\"rbac-card\" [formGroup]=\"categoryForm\"\n        [style]=\"{ width: '100%', 'margin-bottom': '1em' }\">\n\n        <input id=\"cid\" type=\"hidden\" formControlName=\"id\" />\n        <input id=\"capplicationid\" type=\"hidden\" formControlName=\"applicationid\" />\n\n        <div class=\"p-fluid p-formgrid p-grid\">\n          <div class=\"col-md-12 col-12 mb-3\">\n            <div class=\"strip_head toggleleft m-0 p-0\">\n              <span class=\"report_head font-weight-bold\">{{saveMode === 'INSERT' ? 'Add Category' : 'Update Category'}}</span>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"mName\" class=\"referral-form-labels\">Name\n              <span class=\"requiredfield text-danger\">*</span>\n            </label>\n            <!-- <div pTooltip=\"{{ categoryForm.get('name').value }}\" tooltipPosition=\"top\" class=\"text-truncate\">\n                <input id=\"mName\" type=\"text\" formControlName=\"name\" fieldKey=\"SETTINGS_MAS_NAME\" placeholder=\"Enter Name\" aria-describedby=\"mName\" \n                (input)=\"onInput($event, 'name', 'Category Name', true)\" pInputText class=\"wide-input\" />\n            </div> -->\n            <div class=\"tooltip-container\">\n              <input id=\"mName\" type=\"text\" formControlName=\"name\" fieldKey=\"SETTINGS_MAS_NAME\" placeholder=\"Enter Name\" aria-describedby=\"mName\" \n              (input)=\"onInput($event, 'name', 'Category Name', true)\" pInputText class=\"wide-input text-truncate\" />\n              <i class=\"fas fa-ellipsis-h tooltip-icon\" pTooltip=\"{{ categoryForm.get('name').value }}\" tooltipPosition=\"top\"></i>\n            </div>            \n            <div *ngIf=\"validationErrors['Category Name']\" class=\"p-error block mt-1\">{{validationErrors['Category Name']}}</div>\n            <div *ngIf=\"!validationErrors['Category Name'] && \n            categoryForm.controls['name'].invalid &&\n            categoryForm.controls['name'].hasError('required') && categoryForm.controls['name'].errors && formSubmit\">\n              <div *ngIf=\"categoryForm.controls['name'].hasError('required')\" class=\"p-error block mt-1\">Category Name is required</div>\n            </div>\n          </div>\n          <div class=\"col-lg-6 col-md-12 col-12 mb-3\">\n            <label for=\"cdescription\" class=\"referral-form-labels\">Description </label>\n            <input id=\"cdescription\" type=\"text\" formControlName=\"description\" fieldKey=\"SETTINGS_MAS_DESCRYPTION\"\n              placeholder=\"Enter Description\" aria-describedby=\"cdescription\"\n              (input)=\"onInput($event, 'description', 'Description', false)\" pInputText class=\"wide-input\" />\n              <div *ngIf=\"validationErrors['Description']\" class=\"p-error block mt-1\">{{validationErrors['Description']}}</div>\n          </div>\n          <div class=\"col-lg-3 col-md-12 col-12 mb-3\">\n            <label for=\"corder\" class=\"referral-form-labels d-none d-lg-inline-block\">&#160;</label>\n            <div class=\"d-flex align-items-center\" style=\"height: 32px;\">\n              <p-checkbox st inputId=\"active\" [binary]=\"true\" formControlName=\"isenabled\" fieldKey=\"SETTINGS_MAS_ACTIVE\"\n                label=\"Active\"></p-checkbox>\n            </div>\n          </div>\n        </div>\n       <div class=\"mt-2 text-right\">\n          <button class=\"mb-2 btn btn-danger\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"onClickdeleteCategory()\" *ngIf=\"saveMode === 'UPDATE'\">\n            Delete\n          </button>\n          <button class=\"mb-2 btn bg-white text-primary border border-primary btncancel\"\n            fieldKey=\"SETTINGS_MAS_CANCEL\" (click)=\"clearCategory()\">\n            Cancel\n          </button>\n          <button class=\"mb-2 btn btn-primary btncommon\" fieldKey=\"SETTINGS_MAS_ADD_CATOGORY\"\n            (click)=\"saveCategory()\">\n            {{ saveMode === 'UPDATE' ? 'Update' : 'Save' }}\n          </button>\n        </div>\n      </p-card>\n\n      <div id=\"tree-list-demo\" *ngIf=\"selectedCategoryId != '' \">\n        <style>\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        </style>\n\n        <p-tabView #tabView [(activeIndex)]=\"activeTabIndex\" (onChange)=\"onTabChange($event)\">\n          <p-tabPanel header=\"Edit\">\n              <!-- Content for the Edit tab -->\n          </p-tabPanel>\n          <p-tabPanel header=\"Reorder\">\n              <!-- Content for the Reorder tab -->\n          </p-tabPanel>\n          </p-tabView>\n        <div class=\"sort-options col-lg-3 col-md-12 col-12 mb-3\" *ngIf=\"isReorderMode\">\n          <form [formGroup]=\"categoryForm\">\n            <p-dropdown\n              [options]=\"sortOrder\"\n              placeholder=\"Select a Order\"\n              formControlName=\"lookuporder\"\n              optionLabel=\"name\"\n              optionValue=\"value\"\n              styleClass=\"icon-dropdown\"\n              (onChange)=\"sortGrid($event.value)\">\n            </p-dropdown>\n          </form>\n        </div>\n        <dx-tree-list\n          id=\"lookuptasks\"\n          [dataSource]=\"tasksData\"\n          keyExpr=\"id\"\n          parentIdExpr=\"parentid\"\n          [columnAutoWidth]=\"true\"\n          [wordWrapEnabled]=\"true\"\n          [showBorders]=\"true\"\n          (onInitNewRow)=\"initNewRow($event)\"\n          (onSaving)=\"saveChanges($event)\"\n          (onCellPrepared)=\"onCellPrepared($event)\"\n          (onEditCanceled)=\"onEditCanceled($event)\"\n          (onToolbarPreparing)=\"onToolbarPreparing($event)\"\n          (onRowValidating)=\"onRowValidating($event)\"\n        >\n          <dxo-sorting mode=\"none\"></dxo-sorting>\n          <dxo-search-panel id=\"searchpanel\" class=\"dx-datagrid-search-panel\" [visible]=\"isEditMode\" [width]=\"300\" [style]=\"{ 'position': 'absolute', 'left': '0' }\"></dxo-search-panel>\n          <dxo-editing\n            mode=\"batch\"\n            [allowAdding]=\"isEditMode\"\n            [allowUpdating]=\"isEditMode\"\n            [allowDeleting]=\"isEditMode\"\n            [useIcons]=\"true\">\n          </dxo-editing>\n          <dxo-row-dragging\n            [allowReordering]=\"!isEditMode\"\n            [onReorder]=\"onReorder\"\n            [showDragIcons]=\"false\">\n          </dxo-row-dragging>\n          <dxo-header-filter>\n            <style>\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            </style>\n          </dxo-header-filter>\n\n          <dxi-column class=\"dx-header-row\" dataField=\"key\" caption=\"Key\" [minWidth]=\"200\" [maxWidth]=\"200\">\n            <div class=\"required-header\">\n              Key<span class=\"required-marker\">*</span>\n            </div>\n            <dxi-validation-rule type=\"required\" message=\"Key is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"pattern\" [pattern]=\"pattern\" message=\"Allowed input - Alpha numeric, hyphen, underscore and space.\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"50\" message=\"Key limit - 50 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkKeyDuplicate\" message=\"Key Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n          <dxi-column class=\"dx-header-row\" dataField=\"value\" caption=\"Value\" [minWidth]=\"250\" [maxWidth]=\"250\">\n            <dxi-validation-rule type=\"required\" message=\"Value is required\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"stringLength\" [max]=\"250\" message=\"Value limit - 250 characters\"></dxi-validation-rule>\n            <dxi-validation-rule type=\"custom\" [validationCallback]=\"checkValueDuplicate\" message=\"Value Already Exists\"></dxi-validation-rule>\n          </dxi-column>\n        </dx-tree-list>\n      </div>\n    </div>\n  </div>\n</div>\n\n<div class=\"modal\" id=\"Deleteuser\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\">Delete {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        Are you sure you want to delete the {{this.selectedItem.type === 'lookup' ? 'Lookup' : 'Category'}}?\n        <div class=\"clearfix\"></div>\n        <div class=\"mt-2\">\n          <button class=\"pull-right mb-2 btn btn-primary btncommon delete\" data-dismiss=\"modal\" (click)=\"deleteItem()\">\n            Delete\n          </button>\n          <button class=\"pull-right mb-2 mr-2 btn bg-white text-primary btncancel\" data-dismiss=\"modal\">Cancel</button>\n        </div>\n        <div class=\"clearfix\"></div>\n      </div>\n    </div>\n  </div>\n</div>", styles: ["@import\"devextreme/dist/css/dx.common.css\";@import\"devextreme/dist/css/dx.light.css\";.head-div{padding-top:9px;padding-left:7px}.bgiconsearch{margin-bottom:5px;padding-bottom:0;font-size:var(--base-font-size)}.masteracess{border:solid 1px var(--table-border);border-radius:2px;padding:5px 0;overflow-y:auto;background:var(--bg-light);max-height:calc(100vh - 243px);min-height:calc(100vh - 237px)}.masterempty{max-width:none;border-radius:50%;height:40px;width:40px}.row.masterdata{margin:0;border-bottom:solid 1px var(--table-border);padding:5px 0;cursor:pointer}.overflow_txt{overflow:hidden;text-overflow:ellipsis}span.namemaster{font-size:var(--base-font-size);color:#000}.masterid,span.emailmaster{font-size:var(--base-font-size);color:#9b9b9b}span.deletemaster{position:absolute;top:0px;right:15px;z-index:9;width:20px;float:right;cursor:pointer}span.deletemaster img{width:12px}.wide-input{width:100%}.text-truncate{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.activate{position:absolute;margin-top:-46px;margin-left:44rem}.toggleleft{font-size:13px;font-weight:600;display:block;margin-top:-12px;padding-bottom:13px}.report_button{margin-left:12px}:host ::ng-deep .ui-tree.permission-tree{width:100%}:host ::ng-deep .p-datatable .p-datatable-header{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}:host ::ng-deep .p-datatable .p-datatable-thead tr th{background:var(--background-color);color:var(--text-dark);border-color:var(--table-border)}.p-datatable-wrapper tr td{text-align:left;border:none;padding:15px 8px;vertical-align:top}.p-datatable-wrapper tr td input{width:100%}.p-datatable-wrapper tr td button i{color:#f92929}::ng-deep #tree-list-demo{min-height:700px}::ng-deep #tasks{max-height:700px}.highlighted-row{background-color:#cbe4a9}.tab-container{display:flex;margin-bottom:10px}.tab-button{cursor:pointer;padding:10px;background-color:#f2f2f2;margin-right:5px;border-bottom:1px solid var(--table-border);background-color:var(--bg-light)}.tab-button.active{background-color:#ddd}.dx-datagrid-search-panel{margin-left:0;padding-left:0}.required-header{position:relative}.required-marker{color:red;margin-left:4px}:host ::ng-deep .p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus{box-shadow:none}:host ::ng-deep .icon-dropdown li.p-dropdown-item{padding:.5rem 15px!important}:host ::ng-deep .icon-dropdown li.p-dropdown-item.p-highlight .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:hover .userempty,:host ::ng-deep .icon-dropdown li.p-dropdown-item:focus .userempty{color:#fff}:host ::ng-deep .icon-dropdown .userempty{height:inherit;padding:0;justify-content:start;font-size:19px;width:25px}:host ::ng-deep .p-card .p-card-content{padding:0}\n", "\n          #lookuptasks .dx-datagrid-rowsview .dx-row {\n            border-bottom: 1px solid #ddd;\n          }\n          #lookuptasks .dx-header-row .dx-header-cell {\n            font-weight: bold;\n          }\n          #searchpanel .dx-datagrid-search-panel {\n            margin-left: 0px;\n            padding-left: 0px;\n          }\n        ", "\n              #lookuptasks .dx-header-row .dx-header-cell {\n                font-weight: bold;\n              }\n            "], components: [{ type: AlertComponent, selector: "app-alert" }, { type: i8__namespace.Tree, selector: "p-tree", inputs: ["value", "selectionMode", "selection", "style", "styleClass", "contextMenu", "layout", "draggableScope", "droppableScope", "draggableNodes", "droppableNodes", "metaKeySelection", "propagateSelectionUp", "propagateSelectionDown", "loading", "loadingIcon", "emptyMessage", "ariaLabel", "togglerAriaLabel", "ariaLabelledBy", "validateDrop", "filter", "filterBy", "filterMode", "filterPlaceholder", "filteredNodes", "filterLocale", "scrollHeight", "virtualScroll", "virtualNodeHeight", "minBufferPx", "maxBufferPx", "indentation", "trackBy"], outputs: ["selectionChange", "onNodeSelect", "onNodeUnselect", "onNodeExpand", "onNodeCollapse", "onNodeContextMenuSelect", "onNodeDrop", "onFilter"] }, { type: i9__namespace.ContextMenu, selector: "p-contextMenu", inputs: ["model", "global", "target", "style", "styleClass", "appendTo", "autoZIndex", "baseZIndex", "triggerEvent"], outputs: ["onShow", "onHide"] }, { type: i10__namespace.ConfirmPopup, selector: "p-confirmPopup", inputs: ["key", "defaultFocus", "showTransitionOptions", "hideTransitionOptions", "autoZIndex", "baseZIndex", "style", "styleClass", "visible"] }, { type: i11__namespace.Card, selector: "p-card", inputs: ["header", "subheader", "style", "styleClass"] }, { type: i12__namespace.Checkbox, selector: "p-checkbox", inputs: ["value", "name", "disabled", "binary", "label", "ariaLabelledBy", "ariaLabel", "tabindex", "inputId", "style", "styleClass", "labelStyleClass", "formControl", "checkboxIcon", "readonly", "required", "trueValue", "falseValue"], outputs: ["onChange"] }, { type: i13__namespace.TabView, selector: "p-tabView", inputs: ["orientation", "style", "styleClass", "controlClose", "scrollable", "activeIndex"], outputs: ["onChange", "onClose", "activeIndexChange"] }, { type: i13__namespace.TabPanel, selector: "p-tabPanel", inputs: ["closable", "headerStyle", "headerStyleClass", "cache", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "selected", "disabled", "header", "leftIcon", "rightIcon"] }, { type: i14__namespace.Dropdown, selector: "p-dropdown", inputs: ["scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "selectId", "dataKey", "filterBy", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "virtualScroll", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "autofocusFilter", "disabled", "options", "filterValue"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear"] }, { type: i15__namespace.DxTreeListComponent, selector: "dx-tree-list", inputs: ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoExpandAll", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columns", "columnWidth", "customizeColumns", "dataSource", "dataStructure", "dateSerializationFormat", "disabled", "editing", "elementAttr", "errorRowEnabled", "expandedRowKeys", "expandNodesOnFiltering", "filterBuilder", "filterBuilderPopup", "filterMode", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "focusedColumnIndex", "focusedRowEnabled", "focusedRowIndex", "focusedRowKey", "focusStateEnabled", "hasItemsExpr", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "itemsExpr", "keyboardNavigation", "keyExpr", "loadPanel", "noDataText", "pager", "paging", "parentIdExpr", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootValue", "rowAlternationEnabled", "rowDragging", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selection", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sorting", "stateStoring", "tabIndex", "toolbar", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"], outputs: ["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onOptionChanged", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "accessKeyChange", "activeStateEnabledChange", "allowColumnReorderingChange", "allowColumnResizingChange", "autoExpandAllChange", "autoNavigateToFocusedRowChange", "cacheEnabledChange", "cellHintEnabledChange", "columnAutoWidthChange", "columnChooserChange", "columnFixingChange", "columnHidingEnabledChange", "columnMinWidthChange", "columnResizingModeChange", "columnsChange", "columnWidthChange", "customizeColumnsChange", "dataSourceChange", "dataStructureChange", "dateSerializationFormatChange", "disabledChange", "editingChange", "elementAttrChange", "errorRowEnabledChange", "expandedRowKeysChange", "expandNodesOnFilteringChange", "filterBuilderChange", "filterBuilderPopupChange", "filterModeChange", "filterPanelChange", "filterRowChange", "filterSyncEnabledChange", "filterValueChange", "focusedColumnIndexChange", "focusedRowEnabledChange", "focusedRowIndexChange", "focusedRowKeyChange", "focusStateEnabledChange", "hasItemsExprChange", "headerFilterChange", "heightChange", "highlightChangesChange", "hintChange", "hoverStateEnabledChange", "itemsExprChange", "keyboardNavigationChange", "keyExprChange", "loadPanelChange", "noDataTextChange", "pagerChange", "pagingChange", "parentIdExprChange", "remoteOperationsChange", "renderAsyncChange", "repaintChangesOnlyChange", "rootValueChange", "rowAlternationEnabledChange", "rowDraggingChange", "rtlEnabledChange", "scrollingChange", "searchPanelChange", "selectedRowKeysChange", "selectionChange", "showBordersChange", "showColumnHeadersChange", "showColumnLinesChange", "showRowLinesChange", "sortingChange", "stateStoringChange", "tabIndexChange", "toolbarChange", "twoWayBindingEnabledChange", "visibleChange", "widthChange", "wordWrapEnabledChange"] }, { type: i16__namespace.DxoSortingComponent, selector: "dxo-sorting", inputs: ["ascendingText", "clearText", "descendingText", "mode", "showSortIndexes"] }, { type: i16__namespace.DxoSearchPanelComponent, selector: "dxo-search-panel", inputs: ["highlightCaseSensitive", "highlightSearchText", "placeholder", "searchVisibleColumnsOnly", "text", "visible", "width"], outputs: ["textChange"] }, { type: i16__namespace.DxoEditingComponent, selector: "dxo-editing", inputs: ["allowAdding", "allowDeleting", "allowUpdating", "changes", "confirmDelete", "editColumnName", "editRowKey", "form", "mode", "newRowPosition", "popup", "refreshMode", "selectTextOnEditStart", "startEditAction", "texts", "useIcons", "allowAddShape", "allowChangeConnection", "allowChangeConnectorPoints", "allowChangeConnectorText", "allowChangeShapeText", "allowDeleteConnector", "allowDeleteShape", "allowMoveShape", "allowResizeShape", "allowDependencyAdding", "allowDependencyDeleting", "allowResourceAdding", "allowResourceDeleting", "allowResourceUpdating", "allowTaskAdding", "allowTaskDeleting", "allowTaskResourceUpdating", "allowTaskUpdating", "enabled", "allowDragging", "allowResizing", "allowTimeZoneEditing"], outputs: ["changesChange", "editColumnNameChange", "editRowKeyChange"] }, { type: i16__namespace.DxoRowDraggingComponent, selector: "dxo-row-dragging", inputs: ["allowDropInsideItem", "allowReordering", "autoScroll", "boundary", "container", "cursorOffset", "data", "dragDirection", "dragTemplate", "dropFeedbackMode", "filter", "group", "handle", "onAdd", "onDragChange", "onDragEnd", "onDragMove", "onDragStart", "onRemove", "onReorder", "scrollSensitivity", "scrollSpeed", "showDragIcons"] }, { type: i16__namespace.DxoHeaderFilterComponent, selector: "dxo-header-filter", inputs: ["allowSearch", "dataSource", "groupInterval", "height", "searchMode", "width", "searchTimeout", "texts", "visible", "showRelevantValues"] }, { type: i16__namespace.DxiColumnComponent, selector: "dxi-column", inputs: ["alignment", "allowEditing", "allowExporting", "allowFiltering", "allowFixing", "allowGrouping", "allowHeaderFiltering", "allowHiding", "allowReordering", "allowResizing", "allowSearch", "allowSorting", "autoExpandGroup", "buttons", "calculateCellValue", "calculateDisplayValue", "calculateFilterExpression", "calculateGroupValue", "calculateSortValue", "caption", "cellTemplate", "columns", "cssClass", "customizeText", "dataField", "dataType", "editCellTemplate", "editorOptions", "encodeHtml", "falseText", "filterOperations", "filterType", "filterValue", "filterValues", "fixed", "fixedPosition", "format", "formItem", "groupCellTemplate", "groupIndex", "headerCellTemplate", "headerFilter", "hidingPriority", "isBand", "lookup", "minWidth", "name", "ownerBand", "renderAsync", "selectedFilterOperation", "setCellValue", "showEditorAlways", "showInColumnChooser", "showWhenGrouped", "sortIndex", "sortingMethod", "sortOrder", "trueText", "type", "validationRules", "visible", "visibleIndex", "width"], outputs: ["filterValueChange", "filterValuesChange", "groupIndexChange", "selectedFilterOperationChange", "sortIndexChange", "sortOrderChange", "visibleChange", "visibleIndexChange"] }, { type: i16__namespace.DxiValidationRuleComponent, selector: "dxi-validation-rule", inputs: ["message", "trim", "type", "ignoreEmptyValue", "max", "min", "reevaluate", "validationCallback", "comparisonTarget", "comparisonType", "pattern"] }], directives: [{ type: PermissionDirective, selector: "[fieldKey]", inputs: ["fieldKey"] }, { type: i18__namespace.InputText, selector: "[pInputText]" }, { type: i2__namespace$1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace$1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i2__namespace$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2__namespace$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace$1.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i19__namespace.Tooltip, selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { type: i2__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2__namespace$1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataComponent$1, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'lib-masterdata',
                        templateUrl: './masterdata.component.html',
                        styleUrls: ['./masterdata.component.scss']
                    }]
            }], ctorParameters: function () { return [{ type: RbacService }, { type: i2__namespace$1.FormBuilder }, { type: AlertService }, { type: i4__namespace.ConfirmationService }, { type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { treeList: [{
                    type: i0.ViewChild,
                    args: [i15.DxTreeListComponent, { static: false }]
                }] } });

    var MasterdataComponent = /** @class */ (function () {
        function MasterdataComponent(permissionStore, _storeservice) {
            this.permissionStore = permissionStore;
            this._storeservice = _storeservice;
            this.RBACORG = new RBACINFO();
        }
        MasterdataComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.mastersEvent.subscribe(function (val) {
                _this.RBACORG = val.RBACORG;
                _this.PERMISSION = val.PERMISSION;
                _this._storeservice.setData('RBACORG', _this.RBACORG);
                _this.permissionStore.setStore(_this.PERMISSION);
                _this._storeservice.setData('INPUTVALIDATIONMETHOD', _this.INPUTVALIDATIONMETHOD);
                _this._storeservice.setData('HTTPSERVICE', val.HTTPSERVICE);
            });
        };
        return MasterdataComponent;
    }());
    MasterdataComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataComponent, deps: [{ token: PermissionStore }, { token: DataStoreService }], target: i0__namespace.ɵɵFactoryTarget.Component });
    MasterdataComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.17", type: MasterdataComponent, selector: "masterdata", inputs: { RBACORG: "RBACORG", PERMISSION: "PERMISSION", mastersEvent: "mastersEvent", INPUTVALIDATIONMETHOD: "INPUTVALIDATIONMETHOD" }, ngImport: i0__namespace, template: "\n      <lib-masterdata></lib-masterdata>\n  ", isInline: true, components: [{ type: MasterdataComponent$1, selector: "lib-masterdata" }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'masterdata',
                        template: "\n      <lib-masterdata></lib-masterdata>\n  ",
                        styles: []
                    }]
            }], ctorParameters: function () { return [{ type: PermissionStore }, { type: DataStoreService }]; }, propDecorators: { RBACORG: [{
                    type: i0.Input
                }], PERMISSION: [{
                    type: i0.Input
                }], mastersEvent: [{
                    type: i0.Input
                }], INPUTVALIDATIONMETHOD: [{
                    type: i0.Input
                }] } });

    var ShowFieldDirective = /** @class */ (function () {
        function ShowFieldDirective(templateRef, viewContainer, dataStore) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
            this.dataStore = dataStore;
        }
        ShowFieldDirective.prototype.ngOnInit = function () {
            var _this = this;
            var permissions = this.dataStore.state;
            if (!permissions || !permissions[this.showField]) {
                this.viewContainer.clear();
            }
            else {
                this.viewContainer.createEmbeddedView(this.templateRef);
                var lookupIds = sessionStorage.getItem('LOOKUP_IDS');
                if (lookupIds) {
                    var lookupIdArray_1 = lookupIds.split(',');
                    Object.entries(permissions)
                        .filter(function (item) { return item[0].startsWith('GALKP_'); })
                        .forEach(function (_a) {
                        var e_1, _b;
                        var _c = __read(_a, 2), key = _c[0], value = _c[1];
                        try {
                            for (var value_1 = __values(value), value_1_1 = value_1.next(); !value_1_1.done; value_1_1 = value_1.next()) {
                                var _value = value_1_1.value;
                                var _key = key.replace('GALKP_', '');
                                if (_key === _this.showField &&
                                    lookupIdArray_1.includes(String(_value['lookupid'])) &&
                                    _value['action'] === 'H') {
                                    _this.viewContainer.clear();
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (value_1_1 && !value_1_1.done && (_b = value_1.return)) _b.call(value_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    });
                }
            }
        };
        return ShowFieldDirective;
    }());
    ShowFieldDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ShowFieldDirective, deps: [{ token: i0__namespace.TemplateRef }, { token: i0__namespace.ViewContainerRef }, { token: PermissionStore }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    ShowFieldDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.17", type: ShowFieldDirective, selector: "[showField]", inputs: { showField: "showField" }, ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: ShowFieldDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: '[showField]'
                    }]
            }], ctorParameters: function () { return [{ type: i0__namespace.TemplateRef }, { type: i0__namespace.ViewContainerRef }, { type: PermissionStore }]; }, propDecorators: { showField: [{
                    type: i0.Input
                }] } });

    var DirectivesModule = /** @class */ (function () {
        function DirectivesModule() {
        }
        return DirectivesModule;
    }());
    DirectivesModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DirectivesModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    DirectivesModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DirectivesModule, declarations: [PermissionDirective, ShowFieldDirective], imports: [i2.CommonModule], exports: [PermissionDirective, ShowFieldDirective] });
    DirectivesModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DirectivesModule, imports: [[i2.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: DirectivesModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [PermissionDirective, ShowFieldDirective],
                        imports: [i2.CommonModule],
                        exports: [PermissionDirective, ShowFieldDirective]
                    }]
            }] });

    var AlertModule = /** @class */ (function () {
        function AlertModule() {
        }
        return AlertModule;
    }());
    AlertModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    AlertModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertModule, declarations: [AlertComponent], imports: [i2.CommonModule], exports: [AlertComponent] });
    AlertModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertModule, imports: [[i2.CommonModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: AlertModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i2.CommonModule],
                        declarations: [AlertComponent],
                        exports: [AlertComponent]
                    }]
            }] });

    //import { DxTextBoxModule } from "devextreme-angular";
    var PicsMasterdataModule = /** @class */ (function () {
        function PicsMasterdataModule() {
        }
        return PicsMasterdataModule;
    }());
    PicsMasterdataModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsMasterdataModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    PicsMasterdataModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsMasterdataModule, bootstrap: [MasterdataComponent$1], declarations: [MasterdataComponent$1], imports: [i2.CommonModule,
            i2$1.FormsModule,
            i2$1.ReactiveFormsModule,
            ngBootstrap.NgbModule,
            tabmenu.TabMenuModule,
            i13.TabViewModule,
            treeselect.TreeSelectModule,
            http.HttpClientModule,
            i12.CheckboxModule,
            i14.DropdownModule,
            i11.CardModule,
            confirmdialog.ConfirmDialogModule,
            accordion.AccordionModule,
            message.MessageModule,
            table.TableModule,
            i18.InputTextModule,
            calendar.CalendarModule,
            editor.EditorModule,
            fieldset.FieldsetModule,
            button.ButtonModule,
            radiobutton.RadioButtonModule,
            inputtextarea.InputTextareaModule,
            inputmask.InputMaskModule,
            steps.StepsModule,
            toast.ToastModule,
            ripple.RippleModule,
            avatar.AvatarModule,
            badge.BadgeModule,
            multiselect.MultiSelectModule,
            inputswitch.InputSwitchModule,
            progressspinner.ProgressSpinnerModule,
            speeddial.SpeedDialModule,
            orderlist.OrderListModule,
            fileupload.FileUploadModule,
            dialog.DialogModule,
            password.PasswordModule,
            knob.KnobModule,
            sidebar.SidebarModule,
            i9.ContextMenuModule,
            i10.ConfirmPopupModule,
            DirectivesModule,
            AlertModule,
            dragDrop.DragDropModule,
            i15.DxTreeListModule,
            //DxTextBoxModule,
            i15.DxSortableModule,
            i15.DxTemplateModule,
            tooltip.MatTooltipModule,
            i15.DxTabPanelModule], exports: [MasterdataComponent$1] });
    PicsMasterdataModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsMasterdataModule, imports: [[
                i2.CommonModule,
                i2$1.FormsModule,
                i2$1.ReactiveFormsModule,
                ngBootstrap.NgbModule,
                tabmenu.TabMenuModule,
                i13.TabViewModule,
                treeselect.TreeSelectModule,
                http.HttpClientModule,
                i12.CheckboxModule,
                i14.DropdownModule,
                i11.CardModule,
                confirmdialog.ConfirmDialogModule,
                accordion.AccordionModule,
                message.MessageModule,
                table.TableModule,
                i18.InputTextModule,
                calendar.CalendarModule,
                editor.EditorModule,
                fieldset.FieldsetModule,
                button.ButtonModule,
                radiobutton.RadioButtonModule,
                inputtextarea.InputTextareaModule,
                inputmask.InputMaskModule,
                steps.StepsModule,
                toast.ToastModule,
                ripple.RippleModule,
                avatar.AvatarModule,
                badge.BadgeModule,
                multiselect.MultiSelectModule,
                inputswitch.InputSwitchModule,
                progressspinner.ProgressSpinnerModule,
                speeddial.SpeedDialModule,
                orderlist.OrderListModule,
                fileupload.FileUploadModule,
                dialog.DialogModule,
                password.PasswordModule,
                knob.KnobModule,
                sidebar.SidebarModule,
                i9.ContextMenuModule,
                i10.ConfirmPopupModule,
                DirectivesModule,
                AlertModule,
                dragDrop.DragDropModule,
                i15.DxTreeListModule,
                //DxTextBoxModule,
                i15.DxSortableModule,
                i15.DxTemplateModule,
                tooltip.MatTooltipModule,
                i15.DxTabPanelModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: PicsMasterdataModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            MasterdataComponent$1
                        ],
                        bootstrap: [MasterdataComponent$1],
                        imports: [
                            i2.CommonModule,
                            i2$1.FormsModule,
                            i2$1.ReactiveFormsModule,
                            ngBootstrap.NgbModule,
                            tabmenu.TabMenuModule,
                            i13.TabViewModule,
                            treeselect.TreeSelectModule,
                            http.HttpClientModule,
                            i12.CheckboxModule,
                            i14.DropdownModule,
                            i11.CardModule,
                            confirmdialog.ConfirmDialogModule,
                            accordion.AccordionModule,
                            message.MessageModule,
                            table.TableModule,
                            i18.InputTextModule,
                            calendar.CalendarModule,
                            editor.EditorModule,
                            fieldset.FieldsetModule,
                            button.ButtonModule,
                            radiobutton.RadioButtonModule,
                            inputtextarea.InputTextareaModule,
                            inputmask.InputMaskModule,
                            steps.StepsModule,
                            toast.ToastModule,
                            ripple.RippleModule,
                            avatar.AvatarModule,
                            badge.BadgeModule,
                            multiselect.MultiSelectModule,
                            inputswitch.InputSwitchModule,
                            progressspinner.ProgressSpinnerModule,
                            speeddial.SpeedDialModule,
                            orderlist.OrderListModule,
                            fileupload.FileUploadModule,
                            dialog.DialogModule,
                            password.PasswordModule,
                            knob.KnobModule,
                            sidebar.SidebarModule,
                            i9.ContextMenuModule,
                            i10.ConfirmPopupModule,
                            DirectivesModule,
                            AlertModule,
                            dragDrop.DragDropModule,
                            i15.DxTreeListModule,
                            //DxTextBoxModule,
                            i15.DxSortableModule,
                            i15.DxTemplateModule,
                            tooltip.MatTooltipModule,
                            i15.DxTabPanelModule
                        ],
                        exports: [
                            MasterdataComponent$1
                        ],
                        schemas: [i0.NO_ERRORS_SCHEMA, i0.CUSTOM_ELEMENTS_SCHEMA],
                    }]
            }] });

    var MasterdataModule = /** @class */ (function () {
        function MasterdataModule() {
        }
        return MasterdataModule;
    }());
    MasterdataModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MasterdataModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataModule, declarations: [MasterdataComponent], imports: [PicsMasterdataModule], exports: [MasterdataComponent] });
    MasterdataModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataModule, providers: [RbacService, AlertService, i4.ConfirmationService, PermissionStore, DataStoreService], imports: [[
                PicsMasterdataModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.17", ngImport: i0__namespace, type: MasterdataModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            MasterdataComponent
                        ],
                        imports: [
                            PicsMasterdataModule
                        ],
                        exports: [
                            MasterdataComponent
                        ],
                        providers: [RbacService, AlertService, i4.ConfirmationService, PermissionStore, DataStoreService]
                    }]
            }] });

    /*
     * Public API Surface of masterdata
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MasterdataComponent = MasterdataComponent;
    exports.MasterdataModule = MasterdataModule;
    exports.MasterdataService = MasterdataService;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=pics-core-masterdata.umd.js.map

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import request from 'umi-request';
var TableAddressRegister = /** @class */ (function () {
    function TableAddressRegister() {
        this._address = {};
    }
    TableAddressRegister.prototype.register = function (table, address) {
        this._address[table] = address;
    };
    TableAddressRegister.prototype.query = function (table) {
        return this._address[table] || '';
    };
    return TableAddressRegister;
}());
export var tableAddressRegister = new TableAddressRegister();
export var ConditionOperator;
(function (ConditionOperator) {
    ConditionOperator[ConditionOperator["EQUAL"] = 1] = "EQUAL";
    ConditionOperator[ConditionOperator["NOT_EQUAL"] = 2] = "NOT_EQUAL";
    ConditionOperator[ConditionOperator["GREATER"] = 3] = "GREATER";
    ConditionOperator[ConditionOperator["GREATER_EQUAL"] = 4] = "GREATER_EQUAL";
    ConditionOperator[ConditionOperator["LESS"] = 5] = "LESS";
    ConditionOperator[ConditionOperator["LESS_EQUAL"] = 6] = "LESS_EQUAL";
    ConditionOperator[ConditionOperator["IN"] = 7] = "IN";
    ConditionOperator[ConditionOperator["NOT_IN"] = 8] = "NOT_IN";
    ConditionOperator[ConditionOperator["START_WITH"] = 9] = "START_WITH";
    ConditionOperator[ConditionOperator["END_WITH"] = 10] = "END_WITH";
    ConditionOperator[ConditionOperator["LIKE"] = 11] = "LIKE";
    ConditionOperator[ConditionOperator["BETWEEN"] = 12] = "BETWEEN";
})(ConditionOperator || (ConditionOperator = {}));
var Condition = /** @class */ (function () {
    function Condition(operator, name, value) {
        this.operator = operator;
        this.name = name;
        this.value = value;
    }
    Condition.equal = function (name, value) {
        return new Condition(ConditionOperator.EQUAL, name, value);
    };
    Condition.notEqual = function (name, value) {
        return new Condition(ConditionOperator.NOT_EQUAL, name, value);
    };
    Condition.greater = function (name, value) {
        return new Condition(ConditionOperator.GREATER, name, value);
    };
    Condition.greaterEqual = function (name, value) {
        return new Condition(ConditionOperator.GREATER_EQUAL, name, value);
    };
    Condition.less = function (name, value) {
        return new Condition(ConditionOperator.LESS, name, value);
    };
    Condition.lessEqual = function (name, value) {
        return new Condition(ConditionOperator.LESS_EQUAL, name, value);
    };
    Condition.in = function (name, value) {
        return new Condition(ConditionOperator.IN, name, value);
    };
    Condition.notIn = function (name, value) {
        return new Condition(ConditionOperator.NOT_IN, name, value);
    };
    Condition.startWith = function (name, value) {
        return new Condition(ConditionOperator.START_WITH, name, value);
    };
    Condition.endWith = function (name, value) {
        return new Condition(ConditionOperator.END_WITH, name, value);
    };
    Condition.like = function (name, value) {
        return new Condition(ConditionOperator.LIKE, name, value);
    };
    Condition.between = function (name, value) {
        return new Condition(ConditionOperator.BETWEEN, name, value);
    };
    return Condition;
}());
export { Condition };
/**
 * 条件构建器
 */
var ConditionBuilder = /** @class */ (function () {
    function ConditionBuilder() {
        this.data = [];
    }
    Object.defineProperty(ConditionBuilder.prototype, "empty", {
        get: function () {
            return this.data.length === 0;
        },
        enumerable: false,
        configurable: true
    });
    ConditionBuilder.prototype.equal = function (name, value) {
        return this.condition(ConditionOperator.EQUAL, name, value);
    };
    ConditionBuilder.prototype.notEqual = function (name, value) {
        return this.condition(ConditionOperator.NOT_EQUAL, name, value);
    };
    ConditionBuilder.prototype.greater = function (name, value) {
        return this.condition(ConditionOperator.GREATER, name, value);
    };
    ConditionBuilder.prototype.greaterEqual = function (name, value) {
        return this.condition(ConditionOperator.GREATER_EQUAL, name, value);
    };
    ConditionBuilder.prototype.less = function (name, value) {
        return this.condition(ConditionOperator.LESS, name, value);
    };
    ConditionBuilder.prototype.lessEqual = function (name, value) {
        return this.condition(ConditionOperator.LESS_EQUAL, name, value);
    };
    ConditionBuilder.prototype.in = function (name, value) {
        return this.condition(ConditionOperator.IN, name, value);
    };
    ConditionBuilder.prototype.notIn = function (name, value) {
        return this.condition(ConditionOperator.NOT_IN, name, value);
    };
    ConditionBuilder.prototype.startWith = function (name, value) {
        return this.condition(ConditionOperator.START_WITH, name, value);
    };
    ConditionBuilder.prototype.endWith = function (name, value) {
        return this.condition(ConditionOperator.END_WITH, name, value);
    };
    ConditionBuilder.prototype.like = function (name, value) {
        return this.condition(ConditionOperator.LIKE, name, value);
    };
    ConditionBuilder.prototype.between = function (name, value) {
        return this.condition(ConditionOperator.BETWEEN, name, value);
    };
    ConditionBuilder.prototype.and = function () {
        if (this.canAppendCondition()) {
            throw new Error('bad logic operator');
        }
        this.data.push('and');
        return this;
    };
    ConditionBuilder.prototype.or = function () {
        if (this.canAppendCondition()) {
            throw new Error('bad logic operator');
        }
        this.data.push('or');
        return this;
    };
    ConditionBuilder.prototype.group = function (builder) {
        if (!this.canAppendCondition()) {
            throw new Error('cat not append group');
        }
        this.data.push(builder.build());
        return this;
    };
    ConditionBuilder.prototype.all = function (items) {
        var first = true;
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (first) {
                first = false;
            }
            else {
                this.and();
            }
            this.data.push(item);
        }
    };
    ConditionBuilder.prototype.any = function (items) {
        var first = true;
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (first) {
                first = false;
            }
            else {
                this.or();
            }
            this.data.push(item);
        }
    };
    ConditionBuilder.prototype.condition = function (operator, name, value) {
        if (!this.canAppendCondition()) {
            throw new Error('cat not append condition');
        }
        this.data.push({ operator: operator, name: name, value: value });
        return this;
    };
    ConditionBuilder.prototype.canAppendCondition = function () {
        if (this.data.length === 0) {
            return true;
        }
        var last = this.data[this.data.length - 1];
        return typeof last === 'string';
    };
    ConditionBuilder.prototype.build = function () {
        return this.data;
    };
    ConditionBuilder.prototype.buildString = function () {
        return this.data.length > 0 ? JSON.stringify(this.build()) : undefined;
    };
    return ConditionBuilder;
}());
export { ConditionBuilder };
export function buildSortParams(sort) {
    var sortParams = sort
        ? sort.map(function (item) {
            return item.name + ',' + (item.direction === 'ascend' ? 'asc' : 'desc');
        })
        : undefined;
    return sortParams;
}
var TableApi = /** @class */ (function () {
    function TableApi(serviceEndpoint, table, version, extraParams) {
        if (version === void 0) { version = '1.0.0'; }
        if (extraParams === void 0) { extraParams = {}; }
        this._serviceEndpoint = serviceEndpoint;
        this._table = table;
        this._version = version;
        this._extraParams = extraParams;
    }
    TableApi.prototype.loadSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._schema) {
                            return [2 /*return*/, this._schema];
                        }
                        return [4 /*yield*/, request(this._serviceEndpoint + '/schema/' + this._table, {
                                method: 'GET',
                                params: __assign(__assign({}, this._extraParams), { version: this._version }),
                            })];
                    case 1:
                        response = _a.sent();
                        this._schema = response;
                        return [2 /*return*/, this._schema];
                }
            });
        });
    };
    TableApi.prototype.query = function (fields, condition, sort) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (condition instanceof ConditionBuilder) {
                            condition = condition.buildString();
                        }
                        url = this._serviceEndpoint + '/proxy/' + this._table + '/query';
                        return [4 /*yield*/, request(url, {
                                method: 'GET',
                                params: {
                                    fields: fields,
                                    condition: condition,
                                    sort: buildSortParams(sort),
                                },
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 加载分页数据
     * @param page 页码,0开始
     * @param size 单页数据量
     * @param condition 条件串,由ConditionBuilder构建
     * @param sort 排序方式
     * @returns
     */
    TableApi.prototype.loadPage = function (page, size, condition, sort) {
        return __awaiter(this, void 0, void 0, function () {
            var url, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/proxy/' + this._table;
                        return [4 /*yield*/, request(url, {
                                method: 'GET',
                                params: __assign(__assign({}, this._extraParams), { page: page, size: size, version: this._version, condition: condition, sort: buildSortParams(sort) }),
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * 创建一条数据
     * @param row
     */
    TableApi.prototype.create = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var url, dbRow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/proxy/' + this._table;
                        return [4 /*yield*/, request(url, {
                                method: 'POST',
                                params: __assign(__assign({}, this._extraParams), { version: this._version }),
                                data: row,
                            })];
                    case 1:
                        dbRow = _a.sent();
                        return [2 /*return*/, dbRow];
                }
            });
        });
    };
    /**
     * 更新一条数据
     * @param row
     */
    TableApi.prototype.update = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var url, dbRow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/proxy/' + this._table;
                        return [4 /*yield*/, request(url, {
                                method: 'PUT',
                                params: __assign(__assign({}, this._extraParams), { version: this._version }),
                                data: row,
                            })];
                    case 1:
                        dbRow = _a.sent();
                        return [2 /*return*/, dbRow];
                }
            });
        });
    };
    /**
     * 删除一条数据
     * @param primaryKey
     * @returns
     */
    TableApi.prototype.delete = function (primaryKey) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/proxy/' + this._table;
                        return [4 /*yield*/, request(url, {
                                method: 'DELETE',
                                params: __assign(__assign({}, this._extraParams), { version: this._version, primaryKey: primaryKey }),
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 导出
     * @returns
     */
    TableApi.prototype.export = function (condition, timezone) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/proxy/' + this._table + '/export';
                        return [4 /*yield*/, request(url, {
                                method: 'POST',
                                params: __assign(__assign({}, this._extraParams), { condition: condition, timezone: timezone, version: this._version }),
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TableApi.prototype.getJobs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/job';
                        return [4 /*yield*/, request(url, {
                                method: 'GET',
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TableApi.prototype.getJob = function (jobId) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = this._serviceEndpoint + '/job/' + jobId;
                        return [4 /*yield*/, request(url, {
                                method: 'GET',
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return TableApi;
}());
export { TableApi };

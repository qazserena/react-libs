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
import { EditableProTable } from '@ant-design/pro-table';
import { Popconfirm } from 'antd';
import React from 'react';
import { metaApi } from '../../../api/meta';
import { RESTfulApi } from '../../../utils';
export var MetaEnumItemExpandEditor = function (props) {
    var api = new RESTfulApi(metaApi.data.enumRest + '/' + props.row.code, 'code');
    var columns = [
        {
            dataIndex: 'code',
            title: 'code',
            formItemProps: { rules: [{ required: true }] },
        },
        {
            dataIndex: 'value',
            title: '值',
            valueType: 'digit',
            formItemProps: { rules: [{ required: true }] },
        },
        {
            dataIndex: 'label',
            title: '名称',
            formItemProps: { rules: [{ required: true }] },
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: function (_text, record, _, action) {
                if (!props.row.editable) {
                    return [];
                }
                return [
                    React.createElement("a", { key: "editable", onClick: function () {
                            var _a;
                            (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                        } }, "\u7F16\u8F91"),
                    React.createElement(Popconfirm, { key: "delete", title: "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\u5417?", okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88", onConfirm: function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, api.delete(record.code)];
                                    case 1:
                                        _a.sent();
                                        action === null || action === void 0 ? void 0 : action.reload();
                                        return [2 /*return*/];
                                }
                            });
                        }); } },
                        React.createElement("a", null, "\u5220\u9664")),
                ];
            },
        },
    ];
    var request = function (_params, _sort, _filter) { return __awaiter(void 0, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.list()];
                case 1:
                    rows = _a.sent();
                    return [2 /*return*/, {
                            data: rows.map(function (row, index) { return (__assign(__assign({}, row), { id: index, newRow: false })); }),
                            success: true,
                        }];
            }
        });
    }); };
    var handleSave = function (_, data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!data.newRow) return [3 /*break*/, 2];
                    return [4 /*yield*/, api.create({ code: data.code, value: data.value, label: data.label })];
                case 1:
                    _a.sent();
                    data.newRow = false;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, api.update({ code: data.code, value: data.value, label: data.label })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (_, row) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!row.newRow) return [3 /*break*/, 2];
                    return [4 /*yield*/, api.delete(row.code)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(EditableProTable, { size: "small", rowKey: "id", recordCreatorProps: {
            creatorButtonText: '添加一项',
            record: function () {
                return { code: '', label: '', value: 0, id: Date.now(), newRow: true };
            },
        }, request: request, bordered: true, columns: columns, editable: { onSave: handleSave, onDelete: handleDelete } }));
};

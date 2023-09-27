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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormText, } from '@ant-design/pro-form';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Col, Dropdown, Input, Menu, message, Popconfirm, Row, } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { metaApi } from '../../api/meta';
import { useMounted } from '../../hooks';
import { LanguageApi } from '../../api/language';
import { LanguageForm } from './components/LanguageForm';
import { RESTfulApi } from '../../utils';
/**
 * 多语言编辑器
 *
 * 数据来源
 * 1. 本地配置文件
 * 2. 枚举自动填充
 * 3. 从服务器读取
 *
 * @returns
 */
export var LanguageEditor = function (props) {
    var _a = useState([]), columns = _a[0], setColumns = _a[1];
    var _b = useState([]), dataSource = _b[0], setDataSource = _b[1];
    var _c = useState(), selectedRow = _c[0], setSelectedRow = _c[1];
    var _d = useState([]), supportedLanguages = _d[0], setSupportedLanguages = _d[1];
    var _e = useState([]), enumLanguages = _e[0], setEnumLanguages = _e[1];
    var languages = useRef(new Map());
    var _f = useState([]), serverLanguages = _f[0], setServerLanguages = _f[1];
    var _g = useState(), searchKeyword = _g[0], setSearchKeyword = _g[1];
    var formRef = useRef();
    var mounted = useMounted();
    var languageApi = new LanguageApi();
    var handleDeleteRow = function (record) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, languageApi.delete(record.langKey)];
                case 1:
                    _a.sent();
                    setServerLanguages(function (serverLanguages) {
                        return serverLanguages.filter(function (item) { return item.langKey !== record.langKey; });
                    });
                    setSelectedRow(function (selectedRow) {
                        if (selectedRow && selectedRow.langKey === record.langKey) {
                            return undefined;
                        }
                        return selectedRow;
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    useEffect(function () {
        languageApi.getSupporedLanguages().then(function (languages) {
            if (!mounted.current) {
                return;
            }
            setSupportedLanguages(languages);
            var columns = languages.map(function (language) {
                return {
                    dataIndex: language,
                    title: language,
                    hideInTable: props.defaultLanguage
                        ? language !== props.defaultLanguage
                        : language !== 'zhCN',
                    search: false,
                    ellipsis: true,
                    valueType: 'textarea',
                };
            });
            setColumns(__spreadArray(__spreadArray([
                {
                    dataIndex: 'langKey',
                    title: 'key',
                }
            ], columns, true), [
                {
                    dataIndex: 'option',
                    title: '操作',
                    hideInDescriptions: true,
                    valueType: 'option',
                    width: '60px',
                    render: function (_, record) {
                        if (record.type === 'local') {
                            return undefined;
                        }
                        return (React.createElement(Popconfirm, { key: "delete", title: "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\u5417?", okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88", onConfirm: function () {
                                handleDeleteRow(record);
                            } },
                            React.createElement("a", null, "\u5220\u9664")));
                    },
                },
            ], false));
        });
    }, []);
    useEffect(function () {
        if (columns.length === 0) {
            return;
        }
        languageApi.list().then(function (data) {
            setServerLanguages(data);
        });
        if (!props.disableEnumLanguage) {
            var metaRestApi = new RESTfulApi(metaApi.data.enumRest, 'code');
            metaRestApi.list().then(function (data) {
                var list = [];
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var em = data_1[_i];
                    for (var _a = 0, _b = em.items; _a < _b.length; _a++) {
                        var item = _b[_a];
                        list.push({
                            langKey: 'enum.' + em.code + '.' + item.value,
                            zhCN: item.label,
                        });
                    }
                }
                setEnumLanguages(list);
            });
        }
    }, [columns, props.disableEnumLanguage]);
    useEffect(function () {
        languages.current.clear();
        // 合并本地数据
        if (props.localLanguages) {
            for (var _i = 0, _a = props.localLanguages; _i < _a.length; _i++) {
                var item = _a[_i];
                languages.current.set(item.langKey, __assign(__assign({}, item), { type: 'local' }));
            }
        }
        // 合并枚举数据
        for (var _b = 0, enumLanguages_1 = enumLanguages; _b < enumLanguages_1.length; _b++) {
            var item = enumLanguages_1[_b];
            languages.current.set(item.langKey, __assign(__assign({}, item), { type: 'local' }));
        }
        // 合并服务器数据
        for (var _c = 0, serverLanguages_1 = serverLanguages; _c < serverLanguages_1.length; _c++) {
            var item = serverLanguages_1[_c];
            languages.current.set(item.langKey, __assign(__assign({}, item), { type: 'server' }));
        }
        var list = [];
        languages.current.forEach(function (item) { return list.push(item); });
        list.sort(function (a, b) { return a.langKey.localeCompare(b.langKey); });
        if (searchKeyword) {
            list = list.filter(function (item) {
                return (item.langKey.indexOf(searchKeyword) >= 0 ||
                    (item['zhCN'] && item['zhCN'].indexOf(searchKeyword) >= 0));
            });
        }
        // 设置数据
        setDataSource(list);
    }, [props.localLanguages, serverLanguages, enumLanguages, searchKeyword]);
    useEffect(function () {
        var _a, _b;
        if (selectedRow) {
            (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.resetFields();
            (_b = formRef.current) === null || _b === void 0 ? void 0 : _b.setFieldsValue(selectedRow);
        }
    }, [selectedRow]);
    var handleFormFinish = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, languageApi.update(data)];
                case 1:
                    _a.sent();
                    setServerLanguages(function (serverLanguages) {
                        var exist = false;
                        var list = serverLanguages.map(function (item) {
                            if (item.langKey === data.langKey) {
                                exist = true;
                                return __assign(__assign({}, data), { type: 'server' });
                            }
                            return item;
                        });
                        if (!exist) {
                            list.push(__assign(__assign({}, data), { type: 'server' }));
                        }
                        return list;
                    });
                    message.success('保存成功!');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleCreate = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var newItem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (serverLanguages.findIndex(function (item) { return item.langKey === data.langKey; }) >= 0) {
                        message.error('存在重复的key');
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, languageApi.create(data)];
                case 1:
                    _a.sent();
                    newItem = { langKey: data.langKey, type: 'server' };
                    setServerLanguages(function (serverLanguages) {
                        return __spreadArray(__spreadArray([], serverLanguages, true), [newItem], false);
                    });
                    setSelectedRow(newItem);
                    return [2 /*return*/, true];
            }
        });
    }); };
    var handleSearch = function (keyword) {
        setSearchKeyword(keyword);
        setSelectedRow(undefined);
    };
    return (React.createElement(Row, null,
        React.createElement(Col, { span: 16 },
            React.createElement(ProTable, { rowKey: "langKey", size: "small", columns: columns, dataSource: dataSource, options: { setting: false, density: false, reload: false }, search: false, rowClassName: function (record) {
                    return record.langKey === (selectedRow === null || selectedRow === void 0 ? void 0 : selectedRow.langKey)
                        ? 'ant-table-row-selected'
                        : '';
                }, onRow: function (record) {
                    return {
                        onClick: function (event) {
                            event.stopPropagation();
                            setSelectedRow(record);
                            return false;
                        },
                    };
                }, toolBarRender: function () { return [
                    React.createElement(Input.Search, { key: "searchKey", style: { width: 300 }, placeholder: "\u8F93\u5165\u591A\u8BED\u8A00Key\u6A21\u7CCA\u641C\u7D22", onSearch: handleSearch, enterButton: true }),
                    React.createElement(ModalForm, { key: "new", layout: "inline", title: "\u65B0\u5EFA\u4E00\u6761\u591A\u8BED\u8A00", modalProps: { destroyOnClose: true }, trigger: React.createElement(Button, { icon: React.createElement(PlusOutlined, null), type: "primary" }, "\u65B0\u5EFA"), onFinish: handleCreate },
                        React.createElement(ProForm.Group, null,
                            React.createElement(ProFormText, { width: "xl", name: "langKey", label: "\u591A\u8BED\u8A00Key", rules: [{ required: true }] }))),
                    React.createElement(Dropdown, { key: "menu", overlay: React.createElement(Menu, null,
                            React.createElement(Menu.Item, { key: "1" }, "\u6279\u91CF\u5BFC\u5165"),
                            React.createElement(Menu.Item, { key: "2" }, "\u6279\u91CF\u5BFC\u51FA")) },
                        React.createElement(Button, null,
                            React.createElement(EllipsisOutlined, null))),
                ]; } })),
        React.createElement(Col, { span: 8 }, selectedRow && (React.createElement(Card, { title: '编辑多语言项:' + selectedRow.langKey },
            React.createElement(LanguageForm, { supportedLanguages: supportedLanguages, value: selectedRow, onFinish: handleFormFinish }))))));
};

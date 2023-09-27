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
import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { TableFormType } from './typing';
import { Condition, ConditionBuilder } from '../../index';
import { Alert, Button, message, Popconfirm } from 'antd';
import { FormCreator } from './Form';
import { ExportButton } from './ExportButton';
import { useMounted } from '../../hooks';
import { MetaContext } from '../../contexts';
import { TimestampPicker, TimestampRender } from '../Timestamp';
import { tableAddressRegister, TableApi } from '../../api';
import { PlusOutlined } from '@ant-design/icons';
var requestForeignField = function (table, valueField, labelField) { return __awaiter(void 0, void 0, void 0, function () {
    var address, tableApi, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = tableAddressRegister.query(table);
                tableApi = new TableApi(address, table);
                return [4 /*yield*/, tableApi.query([valueField, labelField || valueField])];
            case 1:
                rows = _a.sent();
                return [2 /*return*/, rows.map(function (row) {
                        return { value: row[valueField], label: row[labelField || valueField] };
                    })];
        }
    });
}); };
/**
 * 通用数据表组件
 */
var TableView = function (props) {
    var _a = useState(), schema = _a[0], setSchema = _a[1];
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var actionRef = useRef();
    var _c = useState(), currentEditRow = _c[0], setCurrentEditRow = _c[1];
    var _d = useState(false), createFormVisible = _d[0], setCreateFormVisible = _d[1];
    var mounted = useMounted();
    var metaContext = useContext(MetaContext);
    var _e = useState(''), errorMessage = _e[0], setErrorMessage = _e[1];
    var loadingLock = useRef(false);
    var _f = useState(), conditionString = _f[0], setConditionString = _f[1];
    var primaryKey = useMemo(function () {
        if (!schema) {
            return;
        }
        for (var _i = 0, _a = schema.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.primaryKey) {
                return column.name;
            }
        }
        return;
    }, [schema]);
    var handleEditRow = useCallback(function (row) {
        setCurrentEditRow(row);
    }, [setCurrentEditRow]);
    var handleDeleteRow = useCallback(function (row) { return __awaiter(void 0, void 0, void 0, function () {
        var pkv;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!primaryKey) {
                        message.error('找不到主键');
                        return [2 /*return*/];
                    }
                    pkv = row[primaryKey];
                    return [4 /*yield*/, props.dataProvider.delete(pkv)];
                case 1:
                    _b.sent();
                    (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
                    return [2 /*return*/];
            }
        });
    }); }, [primaryKey, props.dataProvider]);
    var behaviour = useMemo(function () {
        if (!schema || !schema.behaviour) {
            return { create: false, update: false, delete: false, export: false };
        }
        return schema.behaviour;
    }, [schema]);
    var columns = useMemo(function () {
        var items = [];
        if (!schema) {
            return items;
        }
        items = schema.columns
            .filter(function (columns) { return !columns.hidden; })
            .map(function (column, index) {
            var _a, _b, _c;
            var proColumn = {
                title: column.label,
                dataIndex: column.name,
                key: column.name,
                valueType: column.valueType,
                search: !column.queryable ? false : undefined,
                columnSchema: column,
                sequence: index * 10,
                sorter: column.sortable,
                defaultSortOrder: column.defaultSortOrder,
            };
            var metaEnum = (_a = column.meta) === null || _a === void 0 ? void 0 : _a.enum;
            if (metaEnum) {
                proColumn.request = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        result = metaContext.getEnum(metaEnum.name);
                        if (!result) {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/, result.items.map(function (item1) {
                                return {
                                    label: item1.label,
                                    value: metaEnum.type === 'integer' ? item1.value : item1.code,
                                };
                            })];
                    });
                }); };
            }
            var foreignField = (_b = column.meta) === null || _b === void 0 ? void 0 : _b.foreignField;
            if (foreignField) {
                proColumn.request = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, requestForeignField(foreignField.table, foreignField.valueField, foreignField.labelField)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    });
                }); };
            }
            if (column.valueType === 'timestamp') {
                var metaTimestamp_1 = (_c = column.meta) === null || _c === void 0 ? void 0 : _c.timestamp;
                proColumn.render = function (_, record) {
                    return React.createElement(TimestampRender, __assign({ value: record[column.name] }, metaTimestamp_1));
                };
                proColumn.renderFormItem = function (_, props) {
                    return React.createElement(TimestampPicker, __assign({}, props, metaTimestamp_1));
                };
            }
            return proColumn;
        });
        if (props.rowOptionRender || behaviour.update || behaviour.delete) {
            items.push({
                title: '操作',
                key: 'option',
                width: 180,
                sequence: items.length * 10,
                valueType: 'option',
                render: function (_, record) {
                    var options = [];
                    if (behaviour.update) {
                        options.push(React.createElement("a", { key: "edit", onClick: function () {
                                handleEditRow(record);
                            } }, "\u4FEE\u6539"));
                    }
                    if (behaviour.delete) {
                        options.push(React.createElement(Popconfirm, { key: "delete", title: "\u786E\u8BA4\u5220\u9664\u8BE5\u6761\u6570\u636E\u5417?", okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88", onConfirm: function () {
                                handleDeleteRow(record);
                            } },
                            React.createElement("a", null, "\u5220\u9664")));
                    }
                    if (props.rowOptionRender) {
                        options.push.apply(options, props.rowOptionRender(record));
                    }
                    return options;
                },
            });
        }
        if (props.columnPostProcessor) {
            items = props.columnPostProcessor(items);
        }
        if (props.columns) {
            var existColumns_1 = new Set();
            items = items.map(function (item) {
                existColumns_1.add(item.dataIndex);
                var column = props.columns[item.dataIndex];
                if (column) {
                    return __assign(__assign({}, item), column);
                }
                return item;
            });
            for (var key in props.columns) {
                if (!existColumns_1.has(key)) {
                    items.push(props.columns[key]);
                }
            }
        }
        items.forEach(function (item) {
            item.order = 100000 - (item.sequence || 0);
        });
        return items.sort(function (a, b) { return (a.sequence || 0) - (b.sequence || 0); });
    }, [schema, props.columnPostProcessor, props.columns, behaviour]);
    var searchFormConfig = useMemo(function () {
        if (columns.findIndex(function (column) { return column.search !== false && column.dataIndex; }) >= 0) {
            return {};
        }
        else {
            return false;
        }
    }, [columns]);
    useEffect(function () {
        if (loadingLock.current) {
            return;
        }
        loadingLock.current = true;
        setLoading(true);
        props.dataProvider
            .loadSchema()
            .then(function (schema) {
            if (!mounted.current) {
                return;
            }
            if (props.schemaPostProcesser) {
                schema = props.schemaPostProcesser(schema);
            }
            setLoading(false);
            loadingLock.current = false;
            setSchema(schema);
            setErrorMessage('');
        })
            .catch(function (e) {
            if (mounted.current) {
                setLoading(false);
                loadingLock.current = false;
                setErrorMessage(e + '');
            }
        });
        // 数据接口发生变化时, 重新加载表配置
    }, [props.dataProvider]);
    useEffect(function () {
        var _a;
        if (!schema) {
            return;
        }
        (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
        // 表配置发生变化时，重新加载
    }, [schema, props.extraCondition]);
    var requestData = function (params, sort, filters) { return __awaiter(void 0, void 0, void 0, function () {
        var conditions, _i, columns_1, column, columnSchema, item, key, value, conditionBuilder, sorts, tmpConditionSting, pageData, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!schema) {
                        return [2 /*return*/, { success: false }];
                    }
                    conditions = [];
                    if (params && columns.length > 0) {
                        for (_i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
                            column = columns_1[_i];
                            columnSchema = column.columnSchema;
                            if (columnSchema && params[columnSchema.name]) {
                                if (columnSchema.fuzzyQuery) {
                                    conditions.push(Condition.like(columnSchema.name, params[columnSchema.name]));
                                }
                                else {
                                    conditions.push(Condition.equal(columnSchema.name, params[columnSchema.name]));
                                }
                            }
                            else {
                                if (column.conditionBuilder) {
                                    item = column.conditionBuilder(params);
                                    if (item) {
                                        conditions.push(item);
                                    }
                                }
                            }
                        }
                    }
                    if (filters) {
                        for (key in filters) {
                            value = filters[key];
                            if (value && Array.isArray(value)) {
                                conditions.push(Condition.in(key, value));
                            }
                        }
                    }
                    conditionBuilder = null;
                    if (conditions.length > 0) {
                        conditionBuilder = new ConditionBuilder();
                        conditionBuilder.all(conditions);
                    }
                    if (props.extraCondition && !props.extraCondition.empty) {
                        if (!conditionBuilder) {
                            conditionBuilder = props.extraCondition;
                        }
                        else {
                            conditionBuilder.and().group(props.extraCondition);
                        }
                    }
                    sorts = sort
                        ? Object.keys(sort).map(function (key) { return ({ name: key, direction: sort[key] }); })
                        : undefined;
                    loadingLock.current = true;
                    tmpConditionSting = conditionBuilder ? conditionBuilder.buildString() : undefined;
                    setConditionString(tmpConditionSting);
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, props.dataProvider.loadPage(params.current - 1, params.pageSize, tmpConditionSting, sorts)];
                case 2:
                    pageData = _a.sent();
                    setErrorMessage('');
                    return [2 /*return*/, {
                            data: pageData.content,
                            success: true,
                            total: pageData.totalElements,
                        }];
                case 3:
                    e_1 = _a.sent();
                    if (mounted.current) {
                        setErrorMessage(e_1 + '');
                    }
                    return [2 /*return*/, {
                            data: [],
                            total: 0,
                            success: true,
                        }];
                case 4:
                    if (mounted.current) {
                        loadingLock.current = false;
                        setLoading(false);
                    }
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    useImperativeHandle(props.actionRef, function () {
        return {
            reload: function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, ((_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload())];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            openTableForm: function (type, editRow) {
                if (type === TableFormType.EDIT) {
                    if (editRow) {
                        setCurrentEditRow(editRow);
                    }
                }
                else {
                    setCreateFormVisible(true);
                }
            },
        };
    });
    var handleEditFormSuccess = useCallback(function () {
        setTimeout(function () {
            var _a;
            (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
        }, 300);
    }, [setCurrentEditRow]);
    var handleEditFormClose = useCallback(function () {
        setCurrentEditRow(undefined);
    }, [setCurrentEditRow]);
    var handleCreateFormSuccess = useCallback(function () {
        setTimeout(function () {
            var _a;
            (_a = actionRef.current) === null || _a === void 0 ? void 0 : _a.reload();
        }, 300);
    }, [setCreateFormVisible]);
    var handleCreateFormClose = useCallback(function () {
        setCreateFormVisible(false);
    }, [setCreateFormVisible]);
    if (columns.length === 0) {
        return React.createElement(React.Fragment, null);
    }
    return (React.createElement(React.Fragment, null,
        behaviour.update && (React.createElement(FormCreator, { formType: TableFormType.EDIT, dataProvider: props.dataProvider, visible: !!currentEditRow, columns: columns, currentRow: currentEditRow, creatorFun: props.formCreator, onSuccessComplete: handleEditFormSuccess, onClose: handleEditFormClose })),
        behaviour.create && (React.createElement(FormCreator, { key: "create-form", formType: TableFormType.CREATE, visible: createFormVisible, dataProvider: props.dataProvider, columns: columns, creatorFun: props.formCreator, onSuccessComplete: handleCreateFormSuccess, onClose: handleCreateFormClose })),
        errorMessage && (React.createElement(Alert, { type: "error", onClose: function () {
                setErrorMessage('');
            }, description: errorMessage, closable: true, showIcon: true })),
        React.createElement(ProTable, __assign({}, props.proTableProps, { actionRef: actionRef, columns: columns, search: searchFormConfig, rowKey: primaryKey, request: requestData, loading: loading, size: "small", toolBarRender: function () { return [
                props.toolbarActions,
                behaviour.create && (React.createElement(Button, { key: "create-form-button", type: "primary", onClick: function () {
                        setCreateFormVisible(true);
                    } },
                    React.createElement(PlusOutlined, null),
                    "\u65B0\u5EFA")),
                behaviour.export && schema ? (React.createElement(ExportButton, { key: "export", schema: schema, dataProvider: props.dataProvider, condition: conditionString })) : undefined,
            ]; }, options: {
                density: false,
            }, headerTitle: (schema === null || schema === void 0 ? void 0 : schema.label) || '' }))));
};
export default TableView;

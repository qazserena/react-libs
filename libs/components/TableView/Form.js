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
import { BetaSchemaForm } from '@ant-design/pro-form';
import { message } from 'antd';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { TableFormType } from './typing';
var CreateForm = function (props) {
    var columns = useMemo(function () {
        return props.columns
            .filter(function (column) { return !!column.columnSchema && !column.columnSchema.generated && column.columnSchema.editable; })
            .map(function (column) {
            if (column.dataFormItemProps) {
                return __assign(__assign({}, column), { formItemProps: column.dataFormItemProps });
            }
            return column;
        });
    }, [props.columns]);
    var formRef = useRef();
    var handleFinish = useCallback(function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // 进入数据转换
                    columns.forEach(function (column) {
                        if (column.convertFromForm) {
                            var key = column.columnSchema.name;
                            values[key] = column.convertFromForm(values[key]);
                        }
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, props.dataProvider.create(values)];
                case 2:
                    _b.sent();
                    props.onSuccessComplete();
                    (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.resetFields();
                    return [2 /*return*/, true];
                case 3:
                    e_1 = _b.sent();
                    message.error(e_1 + '', 2000);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [props.dataProvider]);
    var handleOpenChange = useCallback(function (open) {
        if (!open) {
            props.onClose();
        }
    }, [props.onClose]);
    return (React.createElement(BetaSchemaForm, { columns: columns, formRef: formRef, layoutType: "DrawerForm", shouldUpdate: false, visible: props.visible, title: "\u65B0\u5EFA", autoFocusFirstInput: true, onFinish: handleFinish, onOpenChange: handleOpenChange }));
};
var EditForm = function (props) {
    var formRef = useRef();
    var columns = useMemo(function () {
        return props.columns
            .filter(function (column) {
            return !!column.columnSchema &&
                !column.columnSchema.generated &&
                !column.columnSchema.primaryKey &&
                column.columnSchema.editable;
        })
            .map(function (column) {
            if (column.dataFormItemProps) {
                return __assign(__assign({}, column), { formItemProps: column.dataFormItemProps });
            }
            return column;
        });
    }, [props.columns]);
    useEffect(function () {
        if (props.currentRow && formRef.current) {
            // 重置所有
            formRef.current.resetFields();
            var row_1 = __assign({}, props.currentRow);
            // 进入数据转换
            columns.forEach(function (column) {
                if (column.convertToForm) {
                    var key = column.columnSchema.name;
                    row_1[key] = column.convertToForm(row_1[key]);
                }
            });
            formRef.current.setFieldsValue(row_1);
        }
    }, [props.currentRow]);
    var handleFinish = useCallback(function (values) { return __awaiter(void 0, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // 进入数据转换
                    columns.forEach(function (column) {
                        if (column.convertFromForm) {
                            var key = column.columnSchema.name;
                            values[key] = column.convertFromForm(values[key]);
                        }
                    });
                    return [4 /*yield*/, props.dataProvider.update(__assign(__assign({}, props.currentRow), values))];
                case 1:
                    _a.sent();
                    props.onSuccessComplete();
                    return [2 /*return*/, true];
                case 2:
                    e_2 = _a.sent();
                    message.error(e_2 + '', 2000);
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [props.dataProvider, props.currentRow]);
    var handleOpenChange = useCallback(function (open) {
        if (!open) {
            props.onClose();
        }
    }, [props.onClose]);
    return (React.createElement(BetaSchemaForm, { columns: columns, formRef: formRef, layoutType: "DrawerForm", shouldUpdate: false, open: props.visible, title: "\u7F16\u8F91", autoFocusFirstInput: true, onOpenChange: handleOpenChange, onFinish: handleFinish }));
};
export var FormCreator = React.memo(function (props) {
    if (props.creatorFun) {
        var node = props.creatorFun(props);
        if (node) {
            return React.createElement(React.Fragment, null, node);
        }
    }
    if (props.formType === TableFormType.EDIT) {
        return React.createElement(EditForm, __assign({}, props));
    }
    else {
        return React.createElement(CreateForm, __assign({}, props));
    }
});

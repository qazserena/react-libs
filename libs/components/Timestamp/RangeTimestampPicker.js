import { Col, DatePicker, Radio, Row } from 'antd';
import moment from 'moment';
import React, { useContext, useMemo, useState } from 'react';
import { MetaContext } from '../../contexts';
var RangePicker = DatePicker.RangePicker;
/**
 * 时间戳范围选择器
 * @param props
 * @returns
 */
export var RangeTimestampPicker = function (props) {
    var _a = useContext(MetaContext), timezoneSupported = _a.timezoneSupported, timezone = _a.timezone;
    var _b = useState(props.precision || 'date'), precision = _b[0], setPrecision = _b[1];
    var showTime = useMemo(function () {
        if (precision === 'datetime') {
            return {
                hideDisabledOptions: true,
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('00:00:00', 'HH:mm:ss')],
            };
        }
        else {
            return undefined;
        }
    }, [precision]);
    var onOk = function (value) {
        if (!value) {
            props.onChange && props.onChange(null);
            return;
        }
        var value0 = value[0];
        var value1 = value[1];
        if (!showTime) {
            // 抹去时间只留日期
            value0 = value0 ? value0.startOf('day') : null;
            value1 = value1 ? value1.endOf('day') : null;
        }
        var t0 = value0 ? value0.unix() : 0;
        var t1 = value1 ? value1.unix() : 0;
        if (props.unit === 'second') {
            props.onChange && props.onChange([t0, t1]);
        }
        else {
            props.onChange && props.onChange([t0 * 1000, t1 * 1000]);
        }
    };
    var momentValue = useMemo(function () {
        if (props.value) {
            if (props.unit === 'second') {
                var t0 = props.value[0] > 0 ? moment.unix(props.value[0]) : null;
                var t1 = props.value[1] > 0 ? moment.unix(props.value[1]) : null;
                return [t0, t1];
            }
            else {
                var t0 = props.value[0] > 0 ? moment(props.value[0]) : null;
                var t1 = props.value[1] > 0 ? moment(props.value[1]) : null;
                return [t0, t1];
            }
        }
        return undefined;
    }, [props.value, props.unit]);
    var footer = [];
    if (timezone && timezoneSupported) {
        footer.push(React.createElement(Col, { key: "1" }, "\u65F6\u533A:"));
        footer.push(React.createElement(Col, { key: "2" }, timezone));
    }
    if (!props.disablePrecisionSwitch) {
        footer.push(React.createElement(Col, { key: "3", offset: footer.length > 0 ? 2 : 0 }, "\u7CBE\u5EA6"));
        footer.push(React.createElement(Col, { key: "4" },
            React.createElement(Radio.Group, { key: "2", value: precision, size: "small", onChange: function (e) {
                    props.onChange && props.onChange(null);
                    setPrecision(e.target.value);
                } },
                React.createElement(Radio, { value: "date" }, "\u65E5\u671F"),
                React.createElement(Radio, { value: "datetime" }, "\u65F6\u95F4"))));
    }
    var presetRanges = useMemo(function () { return ({
        今天: [moment(), moment()],
        本周: [moment().startOf('week'), moment().endOf('week')],
        本月: [moment().startOf('month'), moment().endOf('month')],
    }); }, []);
    return (React.createElement(RangePicker, { renderExtraFooter: function () {
            return React.createElement(Row, { gutter: 8 }, footer);
        }, ranges: presetRanges, disabled: props.disabled, allowClear: props.allowClear, value: momentValue, onChange: onOk, showTime: showTime, onOk: onOk }));
};

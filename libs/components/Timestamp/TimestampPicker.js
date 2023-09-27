import { DatePicker } from 'antd';
import moment from 'moment';
import React, { useContext, useMemo } from 'react';
import { MetaContext } from '../../contexts';
/**
 * 时间戳选择器
 * @param props
 * @returns
 */
export var TimestampPicker = function (props) {
    var _a = useContext(MetaContext), timezoneSupported = _a.timezoneSupported, timezone = _a.timezone;
    var showTime = useMemo(function () {
        if (props.precision === 'datetime') {
            return {
                hideDisabledOptions: true,
                defaultValue: moment('00:00:00', 'HH:mm:ss'),
            };
        }
        else {
            return undefined;
        }
    }, [props.precision]);
    var onOk = function (value) {
        if (!value) {
            props.onChange && props.onChange(0);
            return;
        }
        if (!showTime) {
            // 抹去时间只留日期
            value = value.startOf('day');
        }
        if (props.unit === 'second') {
            props.onChange && props.onChange(value.unix());
        }
        else {
            props.onChange && props.onChange(value.unix() * 1000);
        }
    };
    var momentValue = useMemo(function () {
        if (props.value) {
            if (props.unit === 'second') {
                return moment.unix(props.value);
            }
            else {
                return moment(props.value);
            }
        }
        return undefined;
    }, [props.value, props.unit]);
    return (React.createElement(DatePicker, { renderExtraFooter: function () {
            if (timezone && timezoneSupported) {
                return React.createElement("span", null,
                    "\u65F6\u533A: ",
                    timezone);
            }
            else {
                return undefined;
            }
        }, disabled: props.disabled, allowClear: props.allowClear, value: momentValue, onChange: onOk, showTime: showTime, onOk: onOk }));
};

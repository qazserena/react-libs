import moment from 'moment';
import { useContext, useMemo } from 'react';
import { MetaContext } from '../../contexts';
import React from 'react';
/**
 * 时间戳render
 * @param props
 * @returns
 */
export var TimestampRender = function (props) {
    var _a = useContext(MetaContext), timezoneSupported = _a.timezoneSupported, timezone = _a.timezone;
    var momentValue = useMemo(function () {
        if (props.value) {
            return props.unit === 'second' ? moment.unix(props.value) : moment(props.value);
        }
        return undefined;
    }, [props.value, props.unit]);
    var format = useMemo(function () {
        if (props.format) {
            return props.format;
        }
        if (props.precision === 'date') {
            if (timezoneSupported && timezone) {
                return 'YYYY-MM-DD z';
            }
            else {
                return 'YYYY-MM-DD';
            }
        }
        else {
            if (timezoneSupported && timezone) {
                return 'YYYY-MM-DD HH:mm:ss z';
            }
            else {
                return 'YYYY-MM-DD HH:mm:ss';
            }
        }
    }, [props.format, props.precision, timezoneSupported, timezone]);
    var formatedString = useMemo(function () {
        if (!momentValue) {
            return '-';
        }
        if (timezoneSupported && timezone) {
            return momentValue.tz(timezone).format(format);
        }
        else {
            return momentValue.format(format);
        }
    }, [momentValue, format, timezoneSupported, timezone]);
    return React.createElement("span", null, formatedString);
};

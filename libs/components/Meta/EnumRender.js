import React, { useContext, useMemo } from 'react';
import { MetaContext } from '../../contexts';
/**
 * 枚举显示
 * @param props
 * @returns
 */
export var EnumRender = function (props) {
    var meta = useContext(MetaContext);
    var label = useMemo(function () {
        var em = meta.getEnum(props.enumName);
        if (!em) {
            return '';
        }
        for (var _i = 0, _a = em.items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.value === props.value) {
                return item.label;
            }
        }
        return '';
    }, [meta, props.enumName, props.value]);
    return React.createElement("span", null, label);
};

import React, {
    useCallback,
    useState,
    useRef,
    useMemo,
    memo
} from 'react';
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import Styles from './styles';

function ReactNativeDropDownPicker({
    value = null,
    items = [],
    placeholder = "Select an item",
    placeholderStyle = {},
    containerStyle = {},
    textStyle = {},
    containerLabelStyle = {}
}) {
    /**
     * Get the selected item.
     * @returns {object}
     */
    const getSelectedItem = useCallback(() => {
        if (value === null)
            return null;

        return items.find(item => item.value === value);
    }, [value, items]);

    /**
     * Get the label of the selected item.
     * @param {string|null} fallback
     * @returns {string}
     */
    const getLabel = useCallback((fallback = null) => {
        return getSelectedItem()?.label ?? fallback;
    }, [getSelectedItem]);

    /**
     * Determine whether the given value is selected.
     * @param {any} val
     * @return {boolean}
     */
    const isSelected = useCallback((val) => {
        return value === val;
    }, [value]);

    /**
     * Indicates whether the value is null.
     * @returns {boolean}
     */
    const isNull = React.useCallback(() => value === null, [value]);

    /**
     * The container style.
     * @returns {array}
     */
    const _containerStyle = useMemo(() => ([
        Styles.container,
        containerStyle
    ]), [containerStyle]);

    /**
     * The style of the container label.
     * @returns array.
     */
    const _containerLabelStyle = useMemo(() => ([
        textStyle,
        isNull() ? placeholderStyle : containerLabelStyle,
    ]), [textStyle, value]);

    return (
        <TouchableOpacity style={_containerStyle}>
            <Text style={_containerLabelStyle}>
                {getLabel(placeholder)}
            </Text>
        </TouchableOpacity>
    );
}

export default ReactNativeDropDownPicker;
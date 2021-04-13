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
    containerStyle = {}
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
     * The container style.
     * @returns {array}
     */
    const _containerStyle = useMemo(() => ([
        Styles.container,
        containerStyle
    ]), [containerStyle]);

    return (
        <TouchableOpacity style={_containerStyle}>
            <Text>{getLabel(placeholder)}</Text>
        </TouchableOpacity>
    );
}

export default ReactNativeDropDownPicker;
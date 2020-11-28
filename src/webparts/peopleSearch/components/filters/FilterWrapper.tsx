import * as React from 'react';
import { IFilterWrapperProps } from './IFilterWrapperProps';
import styles from './FilterWrapper.module.scss';

import { FilterComboBox } from './FilterComboBox';
import { FilterAutoSuggest } from './FilterAutoSuggest';

export const FilterWrapper: React.FunctionComponent<IFilterWrapperProps> = (props) => {
    return (
        <div className={styles.filterWrapper}>
            <div className={styles.filterRow}>
                <div className={styles.filterColumn}>
                    <FilterComboBox />
                </div>
                <div className={styles.filterColumn}>
                    <FilterComboBox />
                </div>
                <div className={styles.filterColumn}>
                    <FilterComboBox />
                </div>
                <div className={styles.filterColumn}>
                    <FilterAutoSuggest />
                </div>
            </div>
        </div>
    );
};
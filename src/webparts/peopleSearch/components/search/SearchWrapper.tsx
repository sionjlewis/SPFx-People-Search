import * as React from 'react';
import { ISearchWrapperProps } from './ISearchWrapperProps';
import styles from './SearchWrapper.module.scss';

import { SearchBox } from './SearchBox';
import { SearchClear } from './SearchClear';

export const SearchWrapper: React.FunctionComponent<ISearchWrapperProps> = (props) => {
    return (
        <div className={styles.searchWrapper}>
            <div className={styles.row}>
                <div className={styles.columnSearchBox}>
                    <SearchBox
                        searchQuery={props.searchQuery}
                        setSearchQuery={props.setSearchQuery}
                    />
                </div>
                <div className={styles.columnSearchClear}>
                    <SearchClear
                        setSearchQuery={props.setSearchQuery}
                    />
                </div>
            </div>
        </div>
    );
};
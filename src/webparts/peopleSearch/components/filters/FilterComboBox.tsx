import * as React from 'react';
import { IFilterComboBoxProps } from './IFilterComboBoxProps';
import styles from './FilterComboBox.module.scss';

//import { SearchBox as UISearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export const FilterComboBox: React.FunctionComponent<IFilterComboBoxProps> = (props) => {
    
    return (
        <div className={styles.filterComboBox}>Filter Combo Box</div>
    );
};
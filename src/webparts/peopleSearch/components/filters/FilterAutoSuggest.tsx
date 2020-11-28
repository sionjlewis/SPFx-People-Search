import * as React from 'react';
import { IFilterAutoSuggestProps } from './IFilterAutoSuggestProps';
import styles from './FilterAutoSuggest.module.scss';

//import { SearchBox as UISearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export const FilterAutoSuggest: React.FunctionComponent<IFilterAutoSuggestProps> = (props) => {
    
    return (
        <div className={styles.filterAutoSuggest}>Filter Auto Suggest</div>
    );
};
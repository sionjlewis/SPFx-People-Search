import * as React from 'react';
import { ISearchBoxProps } from './ISearchBoxProps';

import { SearchBox as UISearchBox } from 'office-ui-fabric-react/lib/SearchBox';

export const SearchBox: React.FunctionComponent<ISearchBoxProps> = (props) => {

    //props.setSearchQuery();

    return (
        <UISearchBox
            placeholder=''
            onSearch={(newValue: any) => {props.setSearchQuery(newValue);}}
            //onClear=null
            value={props.searchQuery}
            className=''
            
        />
    );
};
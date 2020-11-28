import * as React from 'react';
import { ISearchClearProps } from './ISearchClearProps';

import { IconButton, DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';

export const SearchClear: React.FunctionComponent<ISearchClearProps> = (props) => {
    return (
        <DefaultButton
            text="Clear Filters"
            onClick={() => {props.setSearchQuery('');}}
        />
    );
};
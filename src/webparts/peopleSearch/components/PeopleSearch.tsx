//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import styles from './PeopleSearch.module.scss';
import { IPeopleSearchProps } from './IPeopleSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SearchWrapper } from './search/SearchWrapper';
import { FilterWrapper } from './filters/FilterWrapper';
import { ResultWrapper } from './results/ResultWrapper';
import { FooterWrapper } from './footer/FooterWrapper';


export const PeopleSearch: React.FunctionComponent<IPeopleSearchProps> = (props) => {
  console.log("PeopleSearch");
  const tenantName: string = window.location.host.split('.')[0];
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [nextLink, setNextLink] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div id={`people-search-${props.webpartInstanceId}`} className={styles.peopleSearch}>
      <div className={styles.grid} dir='ltr'>
        <SearchWrapper
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <FilterWrapper />
        <ResultWrapper
          webpartInstanceId={props.webpartInstanceId}
          msGraphSrvcInstance={props.msGraphSrvcInstance}
          tenantName={tenantName}
          pageSize={props.pageSize}
          setDisplayCount={setDisplayCount}
          setNextLink={setNextLink}
          searchQuery={searchQuery}
        />
        <FooterWrapper
          msGraphSrvcInstance={props.msGraphSrvcInstance}
          displayCount={displayCount}
        />
      </div>
    </div>
  );
};
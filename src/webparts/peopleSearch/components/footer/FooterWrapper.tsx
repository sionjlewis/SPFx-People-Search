//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { IFooterWrapperProps } from './IFooterWrapperProps';
import styles from './FooterWrapper.module.scss';

export const FooterWrapper: React.FunctionComponent<IFooterWrapperProps> = (props) => {

  const [totalCount, setTotalCount] = useState<any>(0);

  useEffect(() => {
    // https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http#code-try-27
    props.msGraphSrvcInstance.getUserCount().then((response: JSON) => {
      if (response !== undefined && response !== null) {
        const jsonData: any = response;

        if (!isNaN(jsonData)) {
          const count: number = parseInt(jsonData);
          setTotalCount(count);
        }
      }
    }).catch((error: any) => {
      // handle the response.
      let err = error;
    });
  }, [totalCount]);

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerRow}>
        <div className={styles.footerColumnLeft}>
          <span title='Record Count'>{`Display Count: ${props.displayCount} | Record Count: ${totalCount}`}</span>
        </div>
        <div className={styles.footerColumnRight}>
          <span title='Paging...'>{`Previous < > Next`}</span>
        </div>
      </div>
    </div>
  );
};
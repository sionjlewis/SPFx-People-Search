//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { IResultWrapperProps } from './IResultWrapperProps';
import styles from './ResultWrapper.module.scss';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import _ from 'lodash';
import { ResultCard } from './ResultCard';

export const ResultWrapper: React.FunctionComponent<IResultWrapperProps> = (props) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [rowCount, setRowCount] = useState<number>(0);
    const [data, setData] = useState<MicrosoftGraph.User[]>(null);

    useEffect(() => {
        async function getFilteredUsersExpanded(searchQuery: string) {
            props.msGraphSrvcInstance.getFilteredUsersExpanded(props.pageSize, searchQuery, "", "").then((response: any) => {
                if (!_.isNaN(response["@odata.count"])) {
                    props.setDisplayCount(response["@odata.count"]);
                }
                if (!_.isEmpty(response["@odata.nextLink"])) {
                    props.setNextLink(response["@odata.nextLink"]);
                }
                return response.value;
            }).then((people: MicrosoftGraph.User[]): void => {
                if (people !== undefined && people !== null && people.length > 0) {
                    // notify the user that loading the data is finished and return the loaded information.
                    setLoading(false);
                    setRowCount(people.length);
                    setData(people);
                }
                else {
                    // People collection could be reduced to zero, so no results.
                    setRowCount(0);
                    setLoading(false);
                }
            }).catch((error: any) => {
                // handle the response.
                setLoading(false);
            });
        }

        getFilteredUsersExpanded(props.searchQuery);
    }, [props.searchQuery]);


    if (data !== null && loading === false && rowCount > 0) {
        return (
            <div id={`result-wrapper-${props.webpartInstanceId}`} className={styles.resultWrapper}>
                <div className={styles.resultWrapperRow}>
                    {data.map(item => (
                        <ResultCard
                            key={item.id}
                            userId={item.id}
                            fullName={item.givenName + ' ' + item.surname}
                            displayName={item.displayName}
                            givenName={item.givenName}
                            mail={item.mail}
                            jobTitle={item.jobTitle}
                            businessPhones={item.businessPhones}
                            mobilePhone={item.mobilePhone}
                            department={item.department}
                            officeLocation={item.officeLocation}
                            city={item.city}
                            country={item.country}
                            tenantName={props.tenantName}
                            msGraphSrvcInstance={props.msGraphSrvcInstance}
                        />
                    ))}
                </div>
            </div>
        );
    } else if (data !== null && loading === false && rowCount === 0) {
        return (
            <div className={styles.resultWrapper}>
                <div className={styles.resultNoDataRow}>
                    <div className={styles.resultNoDataCol}>
                        <div>No data found...</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.resultWrapper}>
                <div className={styles.resultLoadingRow}>
                    <div className={styles.resultLoadingCol}>
                        {
                            // To-Do: Add a loading control...
                            // https://developer.microsoft.com/en-us/fluentui#/controls/web/announced/lazyloading
                            // <Announced id={`loading-{props.webpartInstanceId}`} message='50% complete' />
                        }
                        <div>Data Loading...</div>
                    </div>
                </div>
            </div>
        );
    }
};
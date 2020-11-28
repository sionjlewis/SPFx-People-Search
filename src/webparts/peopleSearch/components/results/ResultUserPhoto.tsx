import * as React from 'react';
//import React, { useState, useEffect } from 'react';
import { IResultUserPhotoProps } from './IResultUserPhotoProps';
import styles from './ResultUserPhoto.module.scss';

import { Persona } from 'office-ui-fabric-react/lib/Persona';

export const ResultUserPhoto: React.FunctionComponent<IResultUserPhotoProps> = (props) => {

    function onClickOpenDelveProfile(tenantName: string, emailAddress: string): void {
        window.open(`https://${tenantName}-my.sharepoint.com/_layouts/15/me.aspx/?p=${emailAddress}&v=work`, '_blank');
    }

    return (
        <div id={`result-user-photo-${props.userId}`} className={styles.resultUserPhoto}>
            <div className={styles.imageWrapper}>
                <Persona
                    text={props.fullName}
                    secondaryText={props.mail}
                    tertiaryText={props.phone}
                    size={props.personaSize}
                    hidePersonaDetails
                    presence={props.userPresence}
                    imageUrl={props.photoUrl}
                    imageAlt={props.displayName}
                    title={`Profile Photo: ${props.fullName}`}
                    onClick={() => onClickOpenDelveProfile(props.tenantName, props.mail)}
                />
            </div>
        </div>
    );
};

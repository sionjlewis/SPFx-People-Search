//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { IResultCardProps } from './IResultCardProps';
import styles from './ResultCard.module.scss';

import { ResultUserPhoto } from './ResultUserPhoto';
import { ResultUserContact } from './ResultUserContact';

import {
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';

export const ResultCard: React.FunctionComponent<IResultCardProps> = (props) => {

  const [userPresence, setUserPresence] = useState<PersonaPresence>(PersonaPresence.none);
  const [userPhotoURL, setUserPhotoURL] = useState<string>("");

  useEffect(() => {
    let userId: string = props.userId;

    async function getUserPresence(userId: string) {
      props.msGraphSrvcInstance.getUserPresence(userId).then((response: JSON) => {
        if (response !== undefined && response !== null) {
          let jsonData: any = response;

          // https://docs.microsoft.com/en-us/javascript/api/react-internal/personapresence?view=office-ui-fabric-react-latest
          if (jsonData.availability === 'Away') {
            setUserPresence(PersonaPresence.away);
          } else if (jsonData.availability === 'Blocked') {
            setUserPresence(PersonaPresence.blocked);
          } else if (jsonData.availability === 'Busy') {
            setUserPresence(PersonaPresence.busy);
          } else if (jsonData.availability === 'DoNotDisturb') {
            setUserPresence(PersonaPresence.dnd);
          } else if (jsonData.availability === 'None') {
            setUserPresence(PersonaPresence.none);
          } else if (jsonData.availability === 'Offline') {
            setUserPresence(PersonaPresence.offline);
          } else if (jsonData.availability === 'Available') {
            setUserPresence(PersonaPresence.online);
          }
        }
      }).catch((error: any) => {
        // handle the response.
        let err = error;
      });
    }

    getUserPresence(userId);
  }, [props.userId, userPresence]);

  useEffect(() => {
    let userId: string = props.userId;

    async function getUserPhoto(userId: string) {
      props.msGraphSrvcInstance.getUserPhoto(userId, '96x96').then(async (response: any) => {
        if (response !== undefined && response !== null) {
          setUserPhotoURL(response);
        }
      }).catch((error: any) => {
        // handle the response.
        let err = error;
      });
    }

    getUserPhoto(userId);
  }, [props.userId, userPhotoURL]);

  return (
    <div id={`result-card-${props.userId}`} className={styles.resultCard}>
      <div id={`result-card-column-${props.userId}`} className={styles.resultCardColumn}>
        <div className={styles.resultCardInner}>
          <ResultUserPhoto
            userId={props.userId}
            fullName={props.fullName}
            displayName={props.displayName}
            mail={props.mail}
            phone={props.businessPhones ? props.businessPhones[0] : props.mobilePhone}
            personaSize={PersonaSize.size72}
            userPresence={userPresence}
            photoUrl={userPhotoURL}
            tenantName={props.tenantName}
          />
          <ResultUserContact
            userId={props.userId}
            fullName={props.displayName}
            jobTitle={props.jobTitle}
            department={props.department}
            officeLocation={props.officeLocation}
            city={props.city}
            country={props.country}
            mail={props.mail}
            phone={props.businessPhones ? props.businessPhones[0] : props.mobilePhone}
            mobile={props.mobilePhone ? props.mobilePhone : props.businessPhones ? props.businessPhones[0] : ''}
            openInWeb={false}
            tenantName={props.tenantName}
            msGraphSrvcInstance={props.msGraphSrvcInstance}
          />
        </div>
      </div>
    </div>
  );
};

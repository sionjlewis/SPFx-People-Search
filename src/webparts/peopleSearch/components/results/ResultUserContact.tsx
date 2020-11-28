//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { IResultUserContactProps } from './IResultUserContactProps';
import styles from './ResultUserContact.module.scss';

//import * as _ from 'underscore';
//import * as _s from 'underscore.string';
import _ from 'lodash';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { IconButton } from '@fluentui/react/lib/Button';
import {
    //AnimationStyles,
    //AnimationVariables,
    AnimationClassNames
} from 'office-ui-fabric-react/lib/Styling';

export const ResultUserContact: React.FunctionComponent<IResultUserContactProps> = (props) => {

    const [userAboutMe, setUserAboutMe] = useState<string>('');
    const [userPastProjects, setUserPastProjects] = useState<string>('');
    const [userSkills, setUserSkills] = useState<string>('');
    const [toggleCard, setToggleCard] = useState<boolean>(false);
    const [enableAnimation, setEnableAnimation] = useState<boolean>(false);

    useEffect(() => {
        let userId: string = props.userId;

        props.msGraphSrvcInstance.getUserProperties(userId).then((response: any) => {
            return response;
        }).then((people: MicrosoftGraph.User): void => {
            if (_.isEmpty(people) === false) {
                if (_.isEmpty(people.aboutMe) === false) {
                    let aboutMe = people.aboutMe;
                    aboutMe = _.truncate(aboutMe, {'length': 135,'separator': /,? +/});
                    setUserAboutMe(aboutMe); 
                }
                if (_.isEmpty(people.pastProjects) === false) {
                    if (people.pastProjects.length > 1) {
                        let pastProjects = people.pastProjects.join(', ');
                        pastProjects = _.truncate(pastProjects, {'length': 45,'separator': /,? +/});
                        setUserPastProjects(pastProjects);
                    } else {
                        if (_.isEmpty(people.pastProjects[0]) === false) {
                            let pastProjects = people.pastProjects[0];
                            pastProjects = _.truncate(pastProjects, {'length': 45,'separator': /,? +/});
                            setUserPastProjects(pastProjects);
                        }
                    }
                }
                if (_.isEmpty(people.skills) === false) {
                    if (people.skills.length > 1) {
                        let skills = people.skills.join(', ');
                        skills = _.truncate(skills, {'length': 40,'separator': /,? +/});
                        setUserSkills(skills);
                    } else {
                        if (_.isEmpty(people.skills[0]) === false) {
                            let skills = people.skills[0];
                            skills = _.truncate(skills, {'length': 40,'separator': /,? +/});
                            setUserSkills(skills);
                        }
                    }
                }
            }
        }).catch((error: any) => {
            // handle the response.
            let err = error;
        });
    }, []);

    function onClickOpenDelveProfile(tenantName: string, emailAddress: string) {
        window.open(`https://${tenantName}-my.sharepoint.com/_layouts/15/me.aspx/?p=${emailAddress}&v=work`, '_blank');
    }

    function onClickOpenEmail(emailAddress: string) {
        window.location.href = `mailto:${emailAddress}`;
    }

    function onClickOpenPhone(phoneNumber: string) {
        window.location.href = `tel:${phoneNumber}`;
    }

    function onClickOpenTeamsChat(openInWeb: boolean, emailAddress: string) {
        if (openInWeb) {
            window.open(`https://teams.microsoft.com/_#/l/chat/0/0?users=${emailAddress}&topicname=Chat`, '_blank');
        } else {
            window.open(`https://teams.microsoft.com/l/chat/0/0?users=${emailAddress}&topicname=Chat`, '_blank');
        }
    }

    function onClickToggleCard() {
        setToggleCard(toggleCard ? false : true);
        setEnableAnimation(true);
        setTimeout(() => {
            setEnableAnimation(false);
        }, 2000);
    }

    return (
        <div id={`result-user-contact-${props.userId}`} className={styles.resultUserContact}>
            <div className={styles.contactCardHeader}>
                <div className={styles.contactHeaderName} title={`Full Name: ${props.fullName}`}>{`${props.fullName}`}</div>
                <div className={styles.contactHeaderInfo}><IconButton iconProps={{ iconName: 'Info' }} title={'Link to more information'} ariaLabel={`Click to see ${props.fullName} details`} onClick={() => onClickToggleCard()} /></div>
            </div>
            <div className={styles.contactCardBody}>
                {!toggleCard && (
                    <div className={`${enableAnimation ? AnimationClassNames.slideRightIn40 : ''} ${styles.contactBodyInfo}`}>
                        <div className={styles.contactText} title={`Job Title: ${props.jobTitle}`}>{props.jobTitle}</div>
                        <div className={styles.contactTitle} title={`Department: ${props.department}`}>{props.department}</div>
                        <div className={styles.contactSpacer}>&nbsp;</div>
                        <div className={styles.contactTextSmaller} title={`Phone Number: ${props.phone}`} aria-label={`Click to telephone ${props.fullName}`}>T: <a href={`tel:${props.phone}`}>{props.phone}</a></div>
                        <div className={styles.contactTextSmaller} title={`Mobile Number: ${props.mobile}`} aria-label={`Click to telephone ${props.fullName}`}>M: <a href={`tel:${props.mobile}`}>{props.mobile}</a></div>
                        <div className={styles.contactTextSmaller} title={`Email: ${props.mail}`} aria-label={`Click to email ${props.fullName}`}>E: <a href={`mailto:${props.mail}`}>{props.mail}</a></div>
                        <div className={styles.contactSpacer}>&nbsp;</div>
                        <div className={styles.contactText} title={`Office: ${props.officeLocation}`}>{props.officeLocation}</div>
                        {
                        //<div className={styles.contactTextSmaller} title={`City: ${props.city}`}>{props.city}</div>
                        }
                        <div className={styles.contactTextSmaller} title={`Country: ${props.country}`}>{props.country}</div>
                        <div className={styles.contactSpacer}>&nbsp;</div>
                        <div className={styles.contactTitle}>Skills {`&`} Expertise</div>
                        <div className={styles.contactTextWrap} title={`Skills & Expertise: ${props.fullName}`}>{userSkills}</div>
                    </div>
                )}
                {toggleCard && (
                    <div className={`${enableAnimation ? AnimationClassNames.slideRightIn40 : ''} ${styles.contactBodyInfo}`}>
                        <div className={styles.contactTitle}>About me</div>
                        <div className={styles.contactTextWrap} title={`About me: ${props.fullName}`}>{userAboutMe}</div>
                        <div className={styles.contactSpacer}>&nbsp;</div>
                        <div className={styles.contactTitle}>Projects</div>
                        <div className={styles.contactTextWrap} title={`Projects: ${props.fullName}`}>{userPastProjects}</div>
                    </div>
                )}
            </div>
            <div className={styles.contactCardLinks}>
                <IconButton iconProps={{ iconName: 'DelveLogo' }} title={'Link to Delve profile'} ariaLabel={`Click to telephone ${props.fullName}`} onClick={() => onClickOpenDelveProfile(props.tenantName, props.mail)} />
                <IconButton iconProps={{ iconName: 'SkypeMessage' }} title={'Link to Microsoft Direct Message'} ariaLabel={`Click direct message ${props.fullName}`} onClick={() => onClickOpenTeamsChat(props.openInWeb, props.mail)} />
                <IconButton iconProps={{ iconName: 'Phone' }} title={'Link to Phone'} ariaLabel={`Click phone ${props.fullName}`} onClick={() => onClickOpenPhone(props.phone)} />
                <IconButton iconProps={{ iconName: 'Mail' }} title={'Link to Email'} ariaLabel={`Click to email ${props.fullName}`} onClick={() => onClickOpenEmail(props.mail)} />
            </div>
        </div>
    );
};
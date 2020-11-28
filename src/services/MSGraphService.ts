import { ServiceKey, ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClientFactory, MSGraphClient } from '@microsoft/sp-http';
import _ from 'lodash';
import { IMSGraphService } from './IMSGraphService';


/**
 * The ServiceScope pattern built by SPFx engineers enforce a service contract to always have a default implementation.
 */
export class MSGraphService implements IMSGraphService {

  /**
 * Create a ServiceKey which will be used to consume the service.
 */
  public static readonly serviceKey: ServiceKey<IMSGraphService> =
    ServiceKey.create<IMSGraphService>("SPFx-Webparts:IMSGraphService", MSGraphService);

  private _msGraphClientFactory: MSGraphClientFactory;
  private _graphBetaApi: string = 'https://graph.microsoft.com/beta';

  /**
   * Service class constructor.
   * @param serviceScope 
   */
  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._msGraphClientFactory = serviceScope.consume(MSGraphClientFactory.serviceKey);
    });
  }

  /**
   * Get details of my account, using the default query.
   */
  public getMyDetails(): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(`/me`).get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response.json());
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }

  /**
   * Get all Users, using the default query.
   */
  public getAllUsers(): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(`/users`).get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }

  /**
   * Get all Users, with additional fields to the default query.
   */
  public async getAllUsersExpanded(): Promise<JSON> {
    const selectFields: string = 'userPrincipalName,id,displayName,givenName,surname,jobTitle,mail,mobilePhone,businessPhones,department,officeLocation,country,userType,creationType';

    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
        _msGraphClient.api('/users').select(selectFields).get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }


  /**
   * Get all Users, with additional fields to the default query.
   * @param top 
   * @param search 
   * @param nextLink 
   */
  public async getFilteredUsersExpanded(top: number, search: string, orderby: string, nextLink: string): Promise<JSON> {
    const selectFields: string = 'userPrincipalName,id,displayName,givenName,surname,jobTitle,mail,mobilePhone,businessPhones,department,officeLocation,country,userType,creationType';

    let apiPath: string = '/users?$count=true';
    if (_.isEmpty(nextLink)) {
      apiPath = !isNaN(top) && top > 0 ? `${apiPath}&$top=${top}` : `${apiPath}`;
      apiPath = !_.isEmpty(search) ? `${apiPath}&$search="displayName:${search}"` : `${apiPath}`;
      apiPath = !_.isEmpty(orderby) ? `${apiPath}&$orderby=${orderby}` : `${apiPath}&$orderby=displayName`;
    } else {
      // Replace the API Path with the nextLink value, which contains the skiptoken paramter.
      apiPath = nextLink;
    }

    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient) => {
        _msGraphClient.api(apiPath).select(selectFields).header('ConsistencyLevel', 'eventual').get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }



  /**
   * Get the User Presence for a specific account.
   * @param userId 
   */
  public getUserPresence(userId: string): Promise<JSON> {
    const apiUrl: string = `${this._graphBetaApi}/users/${userId}/presence`;

    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(apiUrl).get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }

  /*
  * Get the User Photo for a specific account.
  * ------------------------------------------------------------------------------------------
  * NOTE: Returns the image blob as a string,
  * for example: "blob:https://sion365dev.sharepoint.com/be579899-b1ba-4d55-8f0f-56ff0c455418"
  * @param userId The User's ID (or UPN).
  * @param imageSize The supported sizes of HD photos on Exchange Online are as follows: '48x48', '64x64', '96x96', '120x120', '240x240', '360x360','432x432', '504x504', and '648x648'.
  */

  public getUserPhoto(userId: string, imageSizeId: string): Promise<string> {
    imageSizeId = (imageSizeId !== undefined && imageSizeId.trim().length > 0) ? `${imageSizeId}/` : '';
    const stUrl: string = `/users/${userId}/photos/${imageSizeId}$value`;

    return new Promise<string>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(stUrl).responseType('blob').get().then((blob: Blob) => {

          let imgData: string = blob ? URL.createObjectURL(blob) : null;
          resolve(imgData);
        });
      });
    });
  }

  /**
   * Get the User Properties, with additional fields to the default query.
   * @param userId 
   */
  public getUserProperties(userId: string): Promise<JSON> {
    const selectFields: string = 'userPrincipalName,id,displayName,aboutMe,skills,pastProjects,preferredLanguage';

    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(`/users/${userId}`).select(selectFields).get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }

  /**
   * Get User Count, using the default query.
   * Note: We need to add the 'ConsistencyLevel' header and webApiPermissionRequests scopes.
   */
  public getUserCount(): Promise<JSON> {
    return new Promise<JSON>((resolve, reject) => {
      this._msGraphClientFactory.getClient().then((_msGraphClient: MSGraphClient): void => {
        _msGraphClient.api(`/users/$count`).header('ConsistencyLevel', 'eventual').get((error, response: any, rawResponse?: any) => {
          if (rawResponse.ok) {
            resolve(response);
          } else {
            console.info(error);
            reject(`Error: ${error}`);
          }
        });
      });
    });
  }

}

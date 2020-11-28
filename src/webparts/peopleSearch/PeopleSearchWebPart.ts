import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, ServiceScope, ServiceKey } from '@microsoft/sp-core-library';

// Used for property pane.
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PeopleSearchWebPartStrings';
import { PeopleSearch } from './components/PeopleSearch';
import { IPeopleSearchProps } from './components/IPeopleSearchProps';

import { MSGraphService } from '../../services/MSGraphService';
import { IMSGraphService } from '../../services/IMSGraphService';


export interface IPeopleSearchWebPartProps {
  title: string;
  pageSize: number;
}

export default class PeopleSearchWebPart extends BaseClientSideWebPart<IPeopleSearchWebPartProps> {

  public render(): void {
    //initializeIcons();

    // The Webpart's unique instance ID (GUID).
    const webpartInstanceId: string = this.context.instanceId;

    // The next 3 lines create a unique instance of the MS Graph Service.
    const serviceScopeName = `PeopleSearch-${webpartInstanceId}:IMSGraphService`;
    const msGraphServiceKey: ServiceKey<IMSGraphService> = ServiceKey.create<IMSGraphService>(serviceScopeName, MSGraphService);
    const msGraphSrvcInstance: IMSGraphService = this.context.serviceScope.consume(msGraphServiceKey);

    const element: React.ReactElement<IPeopleSearchProps> = React.createElement(
      // The root component.
      PeopleSearch,
      {
        title: this.properties.title,
        pageSize: this.properties.pageSize,
        webpartInstanceId: webpartInstanceId,
        msGraphSrvcInstance: msGraphSrvcInstance
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore-next-line: 'dataVersion' is defined as a property in class 'BaseClientSideWebPart<IPeopleSearchWebPartProps>', but is overridden here in 'PeopleSearchWebPart' as an accessor.
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('pageSize', {
                  label: strings.PageSizeFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}

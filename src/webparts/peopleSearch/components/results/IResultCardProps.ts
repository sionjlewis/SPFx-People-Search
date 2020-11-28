import { IMSGraphService } from '../../../../services/IMSGraphService';

export interface IResultCardProps { 
    userId: any; 
    fullName: string; 
    givenName: string;
    displayName: string;
    jobTitle: React.ReactNode;
    department: {}; 
    officeLocation: string;
    city: string;
    country: string;
    mail: string; 
    businessPhones: string[];
    mobilePhone: string;
    tenantName: string;
    msGraphSrvcInstance: IMSGraphService;
}
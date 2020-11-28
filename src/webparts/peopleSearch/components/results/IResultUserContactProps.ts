import { IMSGraphService } from '../../../../services/IMSGraphService';

export interface IResultUserContactProps { 
    userId: any; 
    fullName: string; 
    jobTitle: React.ReactNode;
    department: {};
    officeLocation: string;
    city: string;
    country: string;
    mail: string; 
    phone: string;
    mobile: string;
    openInWeb: boolean; 
    tenantName: string;
    msGraphSrvcInstance: IMSGraphService;
}
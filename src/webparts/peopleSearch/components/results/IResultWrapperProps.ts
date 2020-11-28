import { IMSGraphService } from '../../../../services/IMSGraphService';

export interface IResultWrapperProps {
    webpartInstanceId: string;
    msGraphSrvcInstance: IMSGraphService;
    tenantName: string;
    pageSize: number;
    setDisplayCount: React.Dispatch<React.SetStateAction<number>>;
    setNextLink: React.Dispatch<React.SetStateAction<string>>;
    searchQuery: string;
}
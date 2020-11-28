import { IMSGraphService } from '../../../services/IMSGraphService';


export interface IPeopleSearchProps {
  title: string;
  pageSize: number;
  webpartInstanceId: string;
  msGraphSrvcInstance: IMSGraphService;
}

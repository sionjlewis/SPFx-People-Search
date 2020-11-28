export interface IMSGraphService {
    getMyDetails(): Promise<JSON>;
    getAllUsers(): Promise<JSON>;
    getAllUsersExpanded(): Promise<JSON>;
    getFilteredUsersExpanded(top: number, search: string, orderby: string, nextLink: string): Promise<JSON>;
    getUserPresence(userId: string): Promise<JSON>;
    getUserPhoto(userId: string, imageSizeId: string): Promise<string>;
    getUserProperties(userId: string): Promise<JSON>;
    getUserCount(): Promise<JSON>;
}

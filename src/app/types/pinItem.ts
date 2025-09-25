export interface IPinItem { 
    pinId: string;
    imageData: {
        url: string;
        width: number;
        height: number;
    }
    title: string;
    description: string;
}

export interface IPinItemResponse {
    pins: IPinItem[];
    total: number;
    page: number;
    limit: number;
}

export interface IPinIdMap {
    [key: string]: IPinItem;
}
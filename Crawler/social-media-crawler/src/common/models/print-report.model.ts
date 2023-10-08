export interface PrintReportEntryModel {
    description: string;
    title: string;
    url: string;
    created: string;
    status?: string;
}

export interface PrintReportModel {
    id: string;
    data: any[]
}

export interface IJobRequest {
    _id?: string;
    button_text: string;
    is_hide: boolean;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}
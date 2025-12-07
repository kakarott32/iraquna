export interface IJobRequest {
    _id?: string;
    button_text: string;
    is_hide: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IJobRequestConfig {
    url: string;
    button_text: string;
    is_hide: boolean;
}


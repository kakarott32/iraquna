import type { IMediaImage, IMultiLanguageText } from "./global.interface";


export interface IProductManage {
    id: string;
    title?: IMultiLanguageText;
    items: IItems[];
}
export interface IItems {
    id: string;
    title?: IMultiLanguageText;
    stars: number;
    image: IMediaImage;
}
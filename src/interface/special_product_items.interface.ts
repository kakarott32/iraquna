import type { IMediaImage, IMultiLanguageText } from "./global.interface";


export interface ISpecialProductItems {
    id: string;
    title?: IMultiLanguageText;
    stars: number;
    image: IMediaImage;
}

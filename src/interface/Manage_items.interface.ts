import type { IMediaImage, IMediaVideo, IMultiLanguageText } from "./global.interface";


export interface IManageItems {
    title: IMultiLanguageText;
    images: IManageImages[];
}

export interface IManageImages {
    title: IMultiLanguageText;
    description: IMultiLanguageText;
    stars: number;
    weight?: number | null;
    image: IMediaImage;
}

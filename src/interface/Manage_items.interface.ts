import type { IMediaImage, IMediaVideo, IMultiLanguageText } from "./global.interface";


export interface IManageItems {
    title: IMultiLanguageText;
    images: IManageImages[];
}

export interface IManageImages {
    title: IMultiLanguageText;
    stars: number;
    weight?: number | null;
    weight_unite: IWeightUnit;
    image: IMediaImage;
    description: IMultiLanguageText;
}

interface IWeightUnit {
    ar: string;
    en: string;
    ku: string;
}


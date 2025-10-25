import type { IMediaImage, IMultiLanguageText } from "./global.interface";


export interface IGallery {
    title: IMultiLanguageText;
    images: IGalleryImages[];
}

export interface IGalleryImages {
    title: IMultiLanguageText;
    description: IMultiLanguageText;
    image: IMediaImage;
}

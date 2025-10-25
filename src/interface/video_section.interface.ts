import type { IMediaImage, IMediaVideo, IMultiLanguageText } from "./global.interface";


export interface IVideoSection {
    title?: IMultiLanguageText;
    description?: IMultiLanguageText;
    video: IMediaVideo;
    image_right_top: IMediaImage;
    image_right_bottom: IMediaImage;
    image_left_top: IMediaImage;
    image_left_bottom: IMediaImage;
}

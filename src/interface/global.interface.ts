
export interface IMediaVideo {
    id: string;
    url: string;
    duration: number;
}


export interface IMediaImage{
    id: string;
    url: string;
    width: number;
    height: number;
}


export type SupportedLanguage = 'ar' | 'en' | 'ku';

export interface IMultiLanguageText {
    ar?: string | null;   // Arabic
    en?: string | null;   // English  
    ku?: string | null;   // Kurdish
}
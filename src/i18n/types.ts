export interface Translation {
  welcome: string;
  clickMe: string;
  title: string;
}

export type TranslationKeys = keyof Translation;

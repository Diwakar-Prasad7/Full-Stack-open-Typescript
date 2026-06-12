export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export interface DiaryEntry {
    id: string;
    date: string;
    weather: Weather;
    visibility: Visibility;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'> & {
    comment: string;
};
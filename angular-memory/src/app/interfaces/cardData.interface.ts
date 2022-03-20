export interface CardData{
  imageId: string;
  state: 'default' | 'flipped' | 'matched'|'removed';
  number: string;
  color: string;
}

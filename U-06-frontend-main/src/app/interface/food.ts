export interface Food {
  uri: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  calories: number;
  totalTime: number;
  ingredients: string[];
  // other recipe properties...
}
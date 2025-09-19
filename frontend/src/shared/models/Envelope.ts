export type Envelope<T> = {
  result: T | null;
  errors: Array<{ code: string; message: string }>;
  timeGenerated: Date;
};

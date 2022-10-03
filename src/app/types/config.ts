export type Config = {
  rows: number;
  columns: number;
  cellSize: number;
  algorithm: 'huntAndKill' | 'recursiveBacktracking';
};

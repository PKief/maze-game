export type Algorithm = 'huntAndKill' | 'recursiveBacktracking';

export type Config = {
  rows: number;
  columns: number;
  cellSize: number;
  algorithm: Algorithm;
};

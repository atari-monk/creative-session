export interface IKeyboardObserver {
  onKeyPress(key: string): void;
  onKeyRelease(key: string): void;
}

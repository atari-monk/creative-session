export interface KeyboardObserver {
  onKeyPress(key: string): void;
  onKeyRelease(key: string): void;
}

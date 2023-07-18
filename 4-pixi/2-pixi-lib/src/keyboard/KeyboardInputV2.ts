import { IKeyboardObserver } from 'atari-monk-game-api-lib';

export class KeyboardInputV2 {
  private observers: Set<IKeyboardObserver>;

  constructor() {
    this.observers = new Set();
    this.initListeners();
  }

  private initListeners() {
    const keydownListener = (event: KeyboardEvent) => {
      this.notifyObserversKeyPress(event.key);
    };

    const keyupListener = (event: KeyboardEvent) => {
      this.notifyObserversKeyRelease(event.key);
    };

    window.addEventListener('keydown', keydownListener);
    window.addEventListener('keyup', keyupListener);

    // Clean up event listeners when the instance is no longer needed
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('keydown', keydownListener);
      window.removeEventListener('keyup', keyupListener);
    });
  }

  public addObserver(observer: IKeyboardObserver): void {
    this.observers.add(observer);
  }

  public removeObserver(observer: IKeyboardObserver): void {
    this.observers.delete(observer);
  }

  private notifyObserversKeyPress(key: string): void {
    for (const observer of this.observers) {
      observer.onKeyPress(key);
    }
  }

  private notifyObserversKeyRelease(key: string): void {
    for (const observer of this.observers) {
      observer.onKeyRelease(key);
    }
  }
}

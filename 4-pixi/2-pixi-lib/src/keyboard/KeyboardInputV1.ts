import { injectable } from 'inversify';
import { IKeyboardInput } from './IKeyboardInput';

@injectable()
export class KeyboardInputV1 implements IKeyboardInput {
  private keys: Set<string>;
  private debugMode: boolean;

  constructor(debugMode = false) {
    this.keys = new Set();
    this.debugMode = debugMode;
    this.initListeners();
  }

  private initListeners() {
    try {
      const keydownListener = (event: KeyboardEvent) => {
        this.keys.add(event.key);
        if (!this.debugMode) return;
        console.log('Key Pressed:', event.key);
      };

      const keyupListener = (event: KeyboardEvent) => {
        this.keys.delete(event.key);
      };

      window.addEventListener('keydown', keydownListener);
      window.addEventListener('keyup', keyupListener);

      window.addEventListener('beforeunload', () => {
        window.removeEventListener('keydown', keydownListener);
        window.removeEventListener('keyup', keyupListener);
      });
    } catch (error) {
      console.log('Error on init keyboard event listeners');
    }
  }

  public isKeyDown(key: string): boolean {
    return this.keys.has(key);
  }
}

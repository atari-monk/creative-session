export class KeyboardInputV1 {
  private keys: Set<string>;

  constructor() {
    this.keys = new Set();
    this.initListeners();
  }

  private initListeners() {
    const keydownListener = (event: KeyboardEvent) => {
      this.keys.add(event.key);
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
  }

  public isKeyDown(key: string): boolean {
    return this.keys.has(key);
  }
}

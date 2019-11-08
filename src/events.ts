export class NavigateEvent extends CustomEvent<string> {
  static eventName = 'navigate';
  constructor(path: string) {
    super(NavigateEvent.eventName, { bubbles: true, composed: true, detail: path });
  }
}

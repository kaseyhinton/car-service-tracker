import { LitElement, html, property, customElement, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { displayFlex, flexFactorAuto, horizontal, centerAligned } from '@collaborne/lit-flexbox-literals';

export class BasicSnackbar {
  _isComponent = false;
  open(message: string) {
    void message;
    console.warn('Missing import of cst-banner');
  }
}

export let CSTSnackbarSingleton = new BasicSnackbar();

@customElement('cst-snackbar')
export default class CSTSnackbarElement extends LitElement {
  @property({ type: String }) message: string = '';
  @property({ type: Boolean, reflect: true }) protected opened: boolean;
  @property({ type: Boolean, reflect: true }) protected closing: boolean;
  @property({ type: Boolean, reflect: true }) protected opening: boolean;
  _isComponent = true;

  private _animationTimer: number;
  private _animationFrame: number;
  private _resolve: { (value?: {} | PromiseLike<{}> | undefined): void; (): void };
  private _closeTimeoutHandle: number;

  constructor() {
    super();
    if (!CSTSnackbarSingleton || !CSTSnackbarSingleton._isComponent) {
      CSTSnackbarSingleton = this;
    } else {
      console.warn('More than one cst-banner-element has been used in this web application, consider removing one.');
    }
  }

  private handleAnimationTimerEnd_() {
    this.opening = false;
    this.closing = false;
  }

  private runNextAnimationFrame_(callback: () => void) {
    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = requestAnimationFrame(() => {
      this._animationFrame = 0;
      clearTimeout(this._animationFrame);
      this._animationFrame = window.setTimeout(callback, 0);
    });
  }

  close() {
    if (!this.opened) {
      return;
    }

    cancelAnimationFrame(this._animationFrame);
    this._animationFrame = 0;

    this.closing = true;
    this.opened = false;
    this.opening = false;
    clearTimeout(this._animationTimer);
    this._animationTimer = window.setTimeout(() => {
      this.handleAnimationTimerEnd_();
    }, 75);

    this._resolve();
  }

  open(message: string) {
    return new Promise(resolve => {
      //reset
      clearTimeout(this._closeTimeoutHandle);

      if (message) {
        this.message = message;
      }

      this._resolve = resolve;
      this.closing = false;
      this.opened = false;
      this.opening = true;

      this.runNextAnimationFrame_(() => {
        this.opened = true;
        this._animationTimer = window.setTimeout(() => {
          this.handleAnimationTimerEnd_();
        }, 150);
      });
    });
  }

  static styles = css`
    ${CSTStyles}
    :host {
      max-width: 280px;
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 16px;
      position: absolute;
      bottom: 16px;
      left: 16px;
      background-color: #fff;
      -webkit-box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transform: scale(0.8);
      -ms-transform: scale(0.8);
      transform: scale(0.8);
      opacity: 0;
    }

    :host([opening]),
    :host([opened]),
    :host([closing]) {
      display: flex;
    }

    :host([opening]) {
      -webkit-transition: opacity 75ms linear, -webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
      transition: opacity 75ms linear, -webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
      -o-transition: opacity 75ms linear, transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
      transition: opacity 75ms linear, transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
      transition: opacity 75ms linear, transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 150ms 0ms cubic-bezier(0, 0, 0.2, 1);
    }

    :host([closing]) {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
      -webkit-transition: opacity 75ms linear;
      -o-transition: opacity 75ms linear;
      transition: opacity 75ms linear;
    }

    :host([opened]) {
      -webkit-transform: scale(1);
      -ms-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }

    section {
      ${displayFlex}
      ${horizontal}
      ${centerAligned}
    }

    a.button {
      ${displayFlex}
      ${flexFactorAuto}
      user-select: none;
      padding: 8px 16px;
      margin: 0 0 0 16px;
      height: 16px;
      line-height: 16px;
    }
  `;

  render() {
    return html`
      <section ?hidden=${!this.opened}>
        ${this.message}
        <a
          class="button"
          @click=${e => {
            e.preventDefault();
            clearTimeout(this._closeTimeoutHandle);
            this.close();
          }}
          >Ok</a
        >
      </section>
    `;
  }
}

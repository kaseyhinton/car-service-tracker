import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, horizontal, centerAligned, flexFactorAuto } from '@collaborne/lit-flexbox-literals';
import { NavigateEvent } from '../../events';
import { settingsIcon } from '../../icons';
import '@amber-ds/components/button';

@customElement('cst-header')
export default class CSTHeaderElement extends LitElement {
  static styles = css`
    :host {
      ${displayFlex}
      ${horizontal}
      ${centerAligned}
      height: 55px;
      border-bottom: 1px solid #eee;
    }

    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    amber-button-contents {
        ${displayFlex}
        ${centerAligned}
        pointer-events: none;
    }

    spacer {
        ${displayFlex}
        ${flexFactorAuto}
    }

    amber-button {
        ${displayFlex}
    }
  `;

  render() {
    return html`
      <link href="https://unpkg.com/@amber-ds/visual@1.0.1/dist/index.css" rel="stylesheet" />

      <amber-button
        priority="tertiary"
        @click=${() => {
          this.dispatchEvent(new NavigateEvent('/'));
        }}
      >
        <amber-button-contents>
          <img src="images/icon.svg" />
          <div>Car Service Tracker</div>
        </amber-button-contents>
      </amber-button>
      <spacer></spacer>
      <amber-button
        priority="tertiary"
        @click=${() => {
          this.dispatchEvent(new NavigateEvent('/settings'));
        }}
      >
        ${settingsIcon}
      </amber-button>
    `;
  }
}

import { LitElement, customElement, html, css } from 'lit-element';
import { displayFlex, horizontal, centerAligned, flexFactorAuto } from '@collaborne/lit-flexbox-literals';
import CSTStyles from '../cst-styles/cst-styles';

@customElement('cst-header')
export default class CSTHeaderElement extends LitElement {
  static styles = css`
  ${CSTStyles}
    :host {
      ${displayFlex}
      ${horizontal}
      ${centerAligned}
      height: 55px;
      border-bottom: 1px solid #eee;
    }

    nav {
      ${displayFlex}
      ${flexFactorAuto}
      ${horizontal}
      margin: 0 24px;
    }

    spacer {
      ${displayFlex}
      ${flexFactorAuto}
    }
  `;

  render() {
    return html`
      <nav>
        <a href="/">
          Car Service Tracker
        </a>
        <spacer></spacer>
        <a href="/settings">
          Settings
        </a>
      </nav>
    `;
  }
}

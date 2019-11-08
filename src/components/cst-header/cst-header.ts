import { LitElement, customElement, html, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';

@customElement('cst-header')
export default class CSTHeaderElement extends LitElement {
  static styles = css`
    ${CSTStyles}
    :host {
      display: flex;
      align-items: center;
      height: 55px;
      border-bottom: 1px solid #eee;
    }

    nav {
      display: flex;
      flex: 1 1 auto;
      margin: 0 24px;
    }

    spacer {
      display: flex;
      flex: 1 1 auto;
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

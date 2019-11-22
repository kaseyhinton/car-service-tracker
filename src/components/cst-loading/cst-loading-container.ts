import { LitElement, html, property, css, customElement } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';

@customElement('cst-loading-container')
export default class CSTLoadingContainer extends LitElement {
  @property({ type: String }) message: string = 'Loading..';

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex: 1 1 auto;
      margin-top: 24px;
      flex-direction: column;
    }

    loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    loading-container small {
      margin-right: 16px;
    }
  `;

  render() {
    return html`
      <loading-container>
        <small>${this.message}</small>
        <slot></slot>
      </loading-container>
    `;
  }
}

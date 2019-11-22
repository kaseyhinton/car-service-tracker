import { LitElement, html, property, css } from 'lit-element';

export default class CSTLoadingContainer extends LitElement {
  @property({ type: String }) message: string = 'Loading..';

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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

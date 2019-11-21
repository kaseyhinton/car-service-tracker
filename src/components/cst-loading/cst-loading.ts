import { html, css, LitElement, customElement, property } from 'lit-element';

@customElement('cst-loading')
export default class CSTLoadingElement extends LitElement {
  @property({ type: Number, reflect: true }) size: number = 48;

  static styles = css`
    img {
      display: block;
    }
  `;

  render() {
    return html`
      <img src="images/circle-loader.svg" height=${this.size} width=${this.size} />
    `;
  }
}

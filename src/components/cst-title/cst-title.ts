import { LitElement, html, customElement, property, css } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import '@power-elements/lazy-image';

@customElement('cst-title')
export default class CSTTitle extends LitElement {
  @property({ type: String }) title: string;
  @property({ type: String }) subTitle: string;
  @property({ type: String }) imagePath: string;

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4rem;
    }

    h3 {
      margin: 0;
    }

    small {
      margin: 0 0 0 2px;
    }

    lazy-image {
      height: 100px;
      width: 150px;
    }

    header-text {
      display: flex;
      flex-direction: column;
      margin: 0 16px 0 0;
    }
  `;
  render() {
    return html`
      <header-text>
        <h3 class="title">
          ${this.title}
        </h3>
        <small ?hidden=${!this.subTitle}>${this.subTitle}</small>
      </header-text>
      <lazy-image src=${this.imagePath}></lazy-image>
    `;
  }
}

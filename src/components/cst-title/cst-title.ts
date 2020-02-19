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
      width: var(--lazy-image-width);
      height: var(--lazy-image-height);
      background-color: #fff;
      --lazy-image-fade-duration: 0.6s;
    }

    lazy-placeholder {
      background: #f5f5f5;
      width: var(--lazy-image-width);
      height: var(--lazy-image-height);
      border-radius: 8px;
    }

    header-text {
      display: flex;
      flex-direction: column;
      margin: 0 16px 0 0;
    }

    [aria-hidden] {
      display: none !important;
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
      <lazy-image fade src=${this.imagePath}>
        <lazy-placeholder slot="placeholder"></lazy-placeholder>
      </lazy-image>
    `;
  }
}

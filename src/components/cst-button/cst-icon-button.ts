import { LitElement, html, customElement, css, property } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { classMap } from 'lit-html/directives/class-map.js';

@customElement('cst-icon-button')
export default class CSTIconButton extends LitElement {
  @property({ type: Boolean, reflect: true }) fab: boolean = false;
  @property({ type: Boolean, reflect: true }) outline: boolean = false;
  @property({ type: String }) href: string;
  @property({ type: String }) icon: string;
  @property({ type: String }) alt: string;
  @property({ type: String }) title: string;

  static styles = css`
    ${CSTStyles}

    /* Shared */
    svg {
      align-self: center;
      width: 20px;
      height: 20px;
      fill: #fff;
      transition: 0.3s ease;
    }

    a {
      float: inherit;
    }

    /* Icon button */
    .default {
      display: flex;
      margin-left: 16px;
      opacity: 1;
      transition: 0.3s ease;
      padding-left: 12px;
      padding-right: 12px;
    }

    :host([outline]) .default > svg {
      fill: var(--app-primary-color);
    }

    :host([outline]) .default:hover > svg {
      fill: var(--app-hover-color);
    }

    /* Floating action button */
    .fab {
      align-items: center;
      justify-content: center;
      display: flex;
      border-radius: 50%;
      padding: 0;
      width: 48px;
      height: 48px;
    }

    .fab svg {
      margin: 0;
    }
  `;

  render() {
    const classes = {};
    if (!this.fab) {
      classes['default'] = true;
    } else {
      classes['fab'] = true;
    }

    if (this.outline) {
      classes['button-outline'] = true;
    }

    return html`
      <a href=${this.href} title=${this.title} alt=${this.alt} class="button ${classMap(classes)}">
        <svg viewBox="0 0 24 24">
          <path d=${this.icon} />
        </svg>
      </a>
    `;
  }
}

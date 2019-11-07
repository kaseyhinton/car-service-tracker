import { LitElement, html, query, property, customElement } from 'lit-element';
import '@amber-ds/components/banner';

export class BasicBanner {
  _isComponent = false;
  show(title: string, content: string, labels: string, state: BannerState = '') {
    console.warn('Missing import of cst-banner');
  }
  hide() {
    console.warn('Missing import of cst-banner');
  }
}

export let CSTBannerSingleton = new BasicBanner();

@customElement('cst-banner')
export default class CSTBanner extends LitElement {
  @query('amber-banner') banner;
  @property({ type: String }) content: string;
  @property({ type: String }) labels: string = 'Ok';
  @property({ type: String }) state: string = '';

  _isComponent = true;

  constructor() {
    super();
    if (!CSTBannerSingleton || !CSTBannerSingleton._isComponent) {
      CSTBannerSingleton = this;
    } else {
      console.warn('More than one cst-banner-element has been used in this web application, consider removing one.');
    }
  }

  show(title: string, content: string, labels: string, state: BannerState = '') {
    this.title = title;
    this.content = content;
    this.labels = labels;
    this.state = state;
    this.banner.show();
  }

  hide() {
    this.title = '';
    this.content = '';
    this.banner.hide();
  }

  render() {
    return html`
      <amber-banner .title=${this.title} .labels=${this.labels} .state=${this.state}>
        ${this.content}
      </amber-banner>
    `;
  }
}

type BannerState = '' | 'success' | 'error' | 'warning' | 'error';

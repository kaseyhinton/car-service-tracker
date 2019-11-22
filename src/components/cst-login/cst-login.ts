import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { GET } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { CSTSnackbarSingleton } from '../cst-snackbar/cst-snackbar';

@customElement('cst-login')
export default class CSTLogin extends LitElement {
  @property({ type: String }) username: string = '';
  @property({ type: String }) password: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;

  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

  public reset() {
    this.username = '';
    this.password = '';
  }

  public validate() {
    return Array.from(this.allInputs).every(element => {
      return element.reportValidity();
    });
  }

  private async _login() {
    if (!this.validate()) {
      CSTSnackbarSingleton.open('Please fill out each of the required fields');
      return;
    }

    this.isLoading = true;

    // Get user from db
    const result = await GET('users');
    if (result) {
      this.dispatchEvent(new NavigateEvent('/vehicles'));
    }

    this.isLoading = false;
  }

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      margin: 16px;
    }

    action-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    a.button {
      display: flex;
      align-items: center;
      align-self: flex-end;
    }

    a.button[disabled] {
      pointer-events: none;
      user-select: none;
    }
  `;
  render() {
    return html`
      ${this.isLoading
        ? html`
            <cst-loading-container>
              <cst-loading size="24"></cst-loading>
            </cst-loading-container>
          `
        : html`
            <cst-title imagePath="images/undraw_authentication.svg" title="Login"></cst-title>
            <form>
              <label for="username">Username</label>
              <input
                required
                id="username"
                type="text"
                autocomplete="off"
                @input=${event => {
                  this.username = event.target.value;
                }}
                .value=${this.username}
              />

              <label for="password">Password</label>
              <input
                required
                id="password"
                type="password"
                autocomplete="off"
                @input=${event => {
                  this.password = event.target.value;
                }}
                .value=${this.password}
              />
              <action-container>
                <a href="/create-account">
                  Create Account
                </a>

                <a class="button" ?disabled=${this.isLoading} @click=${this._login}>
                  Login
                </a>
              </action-container>
            </form>
          `}
    `;
  }
}

import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { GET } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import { CSTSnackbarSingleton } from '../cst-snackbar/cst-snackbar';

@customElement('cst-create-account')
export default class CSTCreateAccount extends LitElement {
  @property({ type: String }) username: string = '';
  @property({ type: String }) password: string = '';
  @property({ type: String }) confirmPassword: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;

  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

  public reset() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
  }

  public validate() {
    return Array.from(this.allInputs).every(element => {
      return element.reportValidity();
    });
  }

  private async _createAccount() {
    if (!this.validate()) {
      CSTSnackbarSingleton.open('Please fill out each of the required fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      CSTSnackbarSingleton.open('Passwords do not match');
      return;
    }

    this.isLoading = true;

    // Get user from db
    const result = await GET('users');
    if (result) {
      this.dispatchEvent(new NavigateEvent('/login'));
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
            <cst-title imagePath="images/undraw_mobile_login.svg" title="Create Account"></cst-title>
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

              <label for="confirmPassword">Confirm Password</label>
              <input
                required
                id="confirmPassword"
                type="password"
                autocomplete="off"
                @input=${event => {
                  this.confirmPassword = event.target.value;
                }}
                .value=${this.confirmPassword}
              />

              <action-container>
                <a href="/login">
                  Already have an account?
                </a>

                <a class="button" ?disabled=${this.isLoading} @click=${this._createAccount}>
                  Create Account
                </a>
              </action-container>
            </form>
          `}
    `;
  }
}

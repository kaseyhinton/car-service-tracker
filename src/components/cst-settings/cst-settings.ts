import { LitElement, html, customElement, css, property, queryAll } from 'lit-element';
import CSTStyles from '../../styles/cst-styles/cst-styles';
import { GET, getApiUrl, getJsonboxKeyFromUrl, updateJsonboxKey } from '../../utilities/api';
import { NavigateEvent } from '../../utilities/events';

import '../cst-title/cst-title';
import '../cst-loading/cst-loading';
import '../cst-loading/cst-loading-container';
import '../cst-button/cst-icon-button';
import { Car } from '../cst-list/cst-list';
import { backupIcon } from '../../utilities/icons';
import dayjs from 'dayjs/esm';

@customElement('cst-settings')
export default class CSTSettingsElement extends LitElement {
  @property({ type: String }) jsonboxKey: string = '';
  @property({ type: Boolean }) isLoading: boolean = false;
  @property({ type: Object }) car: Car;
  @queryAll('input') allInputs: NodeListOf<HTMLInputElement>;

  firstUpdated() {
    this._getKey();
  }

  private async _getKey() {
    const apiUrl = getApiUrl() || '';
    this.jsonboxKey = getJsonboxKeyFromUrl(apiUrl);
  }

  public validate() {
    return Array.from(this.allInputs).every((element) => {
      return element.reportValidity();
    });
  }

  private async _save() {
    if (!this.validate()) {
      return;
    }

    updateJsonboxKey(this.jsonboxKey);
    this.dispatchEvent(new NavigateEvent('/'));
  }

  private async _downloadBackupClicked(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isLoading = true;
    const result = await GET('');
    this._downloadObjectAsJson(result, `CST-Backup-${dayjs().format('MM-DD-YYYY')}`);
    this.isLoading = false;
  }

  private _downloadObjectAsJson(exportObj, exportName) {
    /* https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser */
    var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  static styles = css`
    ${CSTStyles} :host {
      display: flex;
      flex-direction: column;
      margin: 16px;
    }

    cst-icon-button {
      float: left;
      margin-left: 0;
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
            <cst-title imagePath="images/undraw_set_preferences_kwia.svg" title="Settings"></cst-title>

            <form>
              <label for="jsonboxkey">Jsonbox key</label>
              <input
                required
                pattern="[a-zA-Z0-9_]{20,}"
                title="alphanumeric characters & _. At least 20 characters long."
                id="jsonboxkey"
                autocomplete="off"
                @input=${(event) => {
                  this.jsonboxKey = event.target.value;
                }}
                .value=${this.jsonboxKey}
              />
              <label for="backup">Create a backup</label>
              <cst-icon-button
                href="#"
                id="backup"
                @click=${this._downloadBackupClicked}
                icon=${backupIcon}
                title="Backup Data"
                alt="Backup Data"
              ></cst-icon-button>
            </form>
            <a class="button" ?disabled=${this.isLoading} @click=${this._save}> ${this.isLoading ? html` <cst-loading size="24"></cst-loading> ` : 'Save'} </a>
          `}
    `;
  }
}

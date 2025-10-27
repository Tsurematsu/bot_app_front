import { LitElement, css, html, unsafeCSS, type CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./calendario-layout-client.css?inline"
@customElement('calendario-layout-client')
export class CalendarioLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
        
        `;
    }
}

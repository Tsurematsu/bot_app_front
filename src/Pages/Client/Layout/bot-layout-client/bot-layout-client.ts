import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./bot-layout-client.css"
@customElement('bot-layout-client')
export class BotLayoutClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
            
        `;
    }
}

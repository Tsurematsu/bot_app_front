import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "./admin.css?inline"
export default function admin(SetUrl, GetUrl){
    return html`<admin-el .setUrl=${SetUrl} .getUrl=${GetUrl}></admin-el>`
}
@customElement('admin-el')
export class AdminClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() private setUrl = (url)=>{};
    @property() private getUrl = ()=>{};
    render() {
        return html`
            <h1>admin</h1>
        `;
    }
    onChangePage(){this.setUrl('/')}
}

import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from "./userItem.css?inline"
export default function userItem(setPanel, userName){
    return html`
        <user_item-el .setPanel=${setPanel} .userName=${userName}></user_item-el>
    `
}
@customElement('user_item-el')
export class Index extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property()
    private setPanel = (id)=>{}
    @property()
    private userName = ""
    render() {
        return html`
            <li @click=${()=>this.setPanel(this.userName)} class="user-item">
                <img class="perfil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhM1JKELkCcPmNDujzjzHtcs0OWn5UcjjCG-9V5HiJSMLAgbx8Wrw8h3f0lhIBv_65FPFi0yZVu8uVKI1obC412iYLiOjwkutF2EGi8mc5Af55yOlcoZKj0th7npBIVzEYBKdqi6xVifYuiJauE8MFr13m-gfHmuEHlY5bWdJUhwg3edC12CMYO-UechRFCEXlxKA8V3D5_YrcxfqeJDmo44HjDxRfn7Z6ylNkqOtku7u0weQV2uaHc_mE4EpsBtkz2_5yYDl6yi8"
                alt="${this.userName}" class="avatar">
                <div class="user-info">
                <span>Carlos Mendoza</span>    
                <span>Administrador</span>
                </div>
                <img width="30" src="/public/flecha-next.png" alt="">
            </li>
        `;
    }
}

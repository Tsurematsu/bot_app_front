import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import images from '../../../../../images';

@customElement('user-item-component')
export class UserItemComponent extends LitElement {
    static styles = css`
        .perfil{
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .user-item{
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            flex-direction: row;
            padding: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .user-info{
            width: 100%;
            display: flex;
            flex-direction: column;
        }
    `
    @property() userName = "Juan"
    @property() data = {}
    @property() clickItem = (_x)=>{}
    render() {
        return html`
            <li @click=${()=>this.clickItem(this.data)} class="user-item">
                <img class="perfil" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhM1JKELkCcPmNDujzjzHtcs0OWn5UcjjCG-9V5HiJSMLAgbx8Wrw8h3f0lhIBv_65FPFi0yZVu8uVKI1obC412iYLiOjwkutF2EGi8mc5Af55yOlcoZKj0th7npBIVzEYBKdqi6xVifYuiJauE8MFr13m-gfHmuEHlY5bWdJUhwg3edC12CMYO-UechRFCEXlxKA8V3D5_YrcxfqeJDmo44HjDxRfn7Z6ylNkqOtku7u0weQV2uaHc_mE4EpsBtkz2_5yYDl6yi8"
                alt="username" class="avatar">
                <div class="user-info">
                <span>${this.userName}</span>    
                <span>Activo</span>
                </div>
                <img width="30" src="${images.flechaNext}" alt="">
            </li>
        `;
    }
}

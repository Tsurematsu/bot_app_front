import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './client.css?inline'
import chatbots from './chatbots';
import credenciales from './credenciales';
import configuracion from './configuracion';
export default function client(SetUrl, GetUrl){
    return html`
        <client-el .setUrl=${SetUrl} .getUrl=${GetUrl}></client-el>
    `
}
@customElement('client-el')
export class ClientClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property()
    private setUrl = (url)=>{};
    @property() 
    private getUrl = ()=>{};

    @state()
    private page = 0

    private pages = [
        chatbots,
        credenciales,
        configuracion,
    ]

    private setPage = (index)=>{
        localStorage.setItem('appSelect', index);
        this.page = index;
    }

    constructor(){
        super()
        this.page = Number(localStorage.getItem('appSelect'));
    }

    render() {
        return html`
            <div id="body" class="dark">
                <div class="design-root">
                    <main class="main">
                        ${this.pages[this.page](this.setUrl)}
                    </main>
                    <footer class="footer">
                    <div class="footer-menu">
                        <div @click=${()=>this.setPage(0)} class="footer-item ${this.page==0?'active':''}">
                            <div><img src="/public/chatbot.png" alt=""></div>
                            <p>Chatbots</p>
                        </div>
                        <div @click=${()=>this.setPage(1)} class="footer-item ${this.page==1?'active':''}">
                            <div><img src="/public/llave.png" alt=""></div>
                            <p>Credenciales</p>
                        </div>
                        <div @click=${()=>this.setPage(2)} class="footer-item ${this.page==2?'active':''}">
                            <div><img class="ajustesIcon" src="/public/ajuste.png" alt=""></div>
                            <p>Settings</p>
                        </div>
                    </div>
                    </footer>
                </div>

            </div>
        `;
    }
}

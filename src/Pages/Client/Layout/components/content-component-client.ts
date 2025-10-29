import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import styles from "./content-component-client.css?inline"
import images from '../../../../images';
import { getStorage, setStorage } from '../../../../Helpers/helperStorage';
@customElement('content-component-client')
export class ContentComponentClient extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    @property() setPanel = (_x)=>{}
    
    @state() page = getStorage("selectNav")  || 0;

    private selectBot = ()=>{
        this.page = 0
        setStorage("selectNav", this.page)
        setStorage('navigate', "bots")
        this.setPanel("bots")
    }
    private selectCalendar = ()=>{
        this.page = 1
        setStorage("selectNav", this.page)
        setStorage('navigate', "calendar")
        this.setPanel("calendar")
        
    }
    private selectNotify = ()=>{
        this.page = 2
        setStorage("selectNav", this.page)
        setStorage('navigate', "notify")
        this.setPanel("notify")

    }
    private selectFacture = ()=>{
        this.page = 3
        setStorage("selectNav", this.page)
        setStorage('navigate', "facture")
        this.setPanel("facture")

    }
    private selectSettings = ()=>{
        this.page = 4
        setStorage("selectNav", this.page)
        setStorage('navigate', "config")
        this.setPanel("config")

    }
    render() {

        return html`
            <div id="body" class="dark">
                <div class="design-root">
                    <main class="main">
                        <slot></slot>
                    </main>
                    <footer class="footer">
                        <div class="footer-menu">
                            <div @click=${this.selectBot} class="footer-item ${this.page == 0 ? 'active' : ''}">
                                <div><img src="${images.chatbot}" alt=""></div>
                                <p>Chatbots</p>
                            </div>
                            <div @click=${this.selectCalendar} class="footer-item ${this.page == 1 ? 'active' : ''}">
                                <div><img src="${images.calendario}" alt=""></div>
                                <p>Agenda</p>
                            </div>
                            <div @click=${this.selectNotify} class="footer-item ${this.page == 2 ? 'active' : ''}">
                                <div><img src="${images.notificacion}" alt=""></div>
                                <p>Notificaciones</p>
                            </div>
                            <div @click=${this.selectFacture} class="footer-item ${this.page == 3 ? 'active' : ''}">
                                <div><img src="${images.factura}" alt=""></div>
                                <p>Plan</p>
                            </div>
                            <div @click=${this.selectSettings} class="footer-item ${this.page == 4 ? 'active' : ''}">
                                <div><img class="ajustesIcon" src="${images.ajuste}" alt=""></div>
                                <p>Settings</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        `;
    }
}

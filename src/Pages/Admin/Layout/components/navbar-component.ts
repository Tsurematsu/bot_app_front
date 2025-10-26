import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import images from '../../../../images';

@customElement('navbar-component')
export class NavbarComponent extends LitElement {
    static styles = css`
        .nav {
            display: flex;
            flex-direction: column;
            position: sticky;
            bottom: 0;
            background-color: rgba(16, 25, 34, 0.534);
            backdrop-filter: blur(4px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding: 0.75rem 0;
        }

        .container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .nav-links {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            gap: 10px;
        }

        .nav-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            height: 60px;
            width: 100%;
            max-width: 100px;
            text-decoration: none;
            color: white;
            &:active{
                background-color: #002142;
            }
            
        }

        .active{
            color: rgb(47, 140, 216);
        }

        .nav-link .label {
            font-size: 0.9rem;
        }

    `
    @property() setTitle = (_x)=>{}
    @property() setPanel = (_x)=>{}
    @state() selectButton=0
    showUsers(){
        this.setPanel("users")
        this.setTitle("Usuarios")
        this.selectButton = 0
    }
    showCredencial(){
        this.setPanel("credencial")
        this.setTitle("Generar código de acceso")
        this.selectButton = 1
    }
    showConfig(){
        this.setPanel("config")
        this.setTitle("Configuration")
        this.selectButton=2
    }

    render() {
        return html`
            <nav class="nav">
                <div class="container">
                    <div class="nav-links">
                        <div @click=${this.showUsers} class="nav-link ${this.selectButton==0?"active":""}">
                            <img width="30" src="${images.editar}" alt="">
                            <span class="label">Usuarios</span>
                        </div>
                        <div @click=${this.showCredencial} class="nav-link ${this.selectButton==1?"active":""}">
                                <img width="30" src="${images.tarjetaDeIdentificacion}" alt="">
                                <span class="label">Credenciales</span>
                        </div>
                        <div @click=${this.showConfig} class="nav-link ${this.selectButton==2?"active":""}">
                            <img width="30" src="${images.ajuste}" alt="">
                            <span class="label">Configuración</span>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }
}

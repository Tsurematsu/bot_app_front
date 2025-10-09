import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from "./config_service.css?inline"

export default function config_service(){
        return html`
            <config_service-el></config_service-el>
        `
}

@customElement('config_service-el')
export class config_serviceClass extends LitElement {
    static styles = css`${unsafeCSS(styles)}`
    render() {
        return html`
         <div class="container">
            <header class="header">
                <h1>Administración</h1>
            </header>

            <main class="main">
            <h2>Configuraciones técnicas</h2>
            <div class="admin-settings">

                <!-- Horario de servicio -->
                <div class="admin-item time-range">
                <div class="label">Horario de servicio</div>
                <div class="time-inputs">
                    <input type="time" value="08:00">
                    <span>a</span>
                    <input type="time" value="18:00">
                </div>
                </div>

                <!-- Activar/Desactivar servicio -->
                <div class="admin-item">
                <div class="label">Servicio activo</div>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                </label>
                </div>

                <!-- Modo mantenimiento -->
                <div class="admin-item">
                <div class="label">Modo mantenimiento</div>
                <label class="switch">
                    <input type="checkbox">
                    <span class="slider"></span>
                </label>
                </div>

                <!-- Ver logs de error -->
                <div class="admin-item log-link">
                <div class="label">Ver logs de error</div>
                <button class="log-button">
                    <span class="material-symbols-outlined">description</span> Ver logs
                </button>
                </div>

                <!-- Reiniciar sistema -->
                <div class="admin-item">
                <div class="label">Reiniciar servicio</div>
                <button class="action-button warning">Reiniciar</button>
                </div>

                <!-- Actualizar sistema -->
                <div class="admin-item">
                    <div class="label">Actualizar sistema</div>
                    <button class="action-button">Buscar actualizaciones</button>
                </div>

                <div class="settings-block logout-block">
                    <button class="logout-btn">🔓 Cerrar Sesión</button>
                </div>

            </div>
            </main>
        </div>
        `;
    }
}

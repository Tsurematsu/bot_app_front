import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import images from '../../../../../../images';

@customElement('modal-process-bot')
export class ModalProcessBot extends LitElement {
    static properties = {
        open: { type: Boolean },
        title: { type: String },
        message: { type: String }
    };

    static styles = css`
    :host {
      display: contents;
    }

    #imageInfo{
        width: 130px;
        height: auto;
        border-radius: 30px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 10, 30, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      padding: 20px;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: all;
    }

    .modal-content {
        position: relative;
        left: -20px;
        top: -60px;
        background: rgba(15, 35, 70, 0.85);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(100, 150, 255, 0.3);
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5),
                    inset 0 1px 0 rgba(255, 255, 255, 0.1);
        
        transform: scale(0.9);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .modal-overlay.open .modal-content {
      transform: scale(1);
    }

    .modal-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
    }

    .modal-title {
      color: #e0f0ff;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
    }

    .close-button {
      background: rgba(100, 150, 255, 0.2);
      border: 1px solid rgba(100, 150, 255, 0.3);
      border-radius: 8px;
      color: #a0c5ff;
      cursor: pointer;
      padding: 8px 12px;
      font-size: 20px;
      transition: all 0.2s ease;
    }

    .close-button:hover {
      background: rgba(100, 150, 255, 0.3);
      border-color: rgba(100, 150, 255, 0.5);
      color: #c0d5ff;
    }

    .modal-body {
      color: #b0d0ff;
      font-size: 16px;
      line-height: 1.6;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
    }

    .modal-footer {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn {
      padding: 10px 24px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: linear-gradient(135deg, rgba(70, 130, 255, 0.8), rgba(50, 100, 200, 0.8));
      border: 1px solid rgba(100, 150, 255, 0.4);
      color: #ffffff;
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, rgba(80, 140, 255, 0.9), rgba(60, 110, 210, 0.9));
      box-shadow: 0 4px 16px rgba(70, 130, 255, 0.4);
    }
    `;

    @state() public open = false;
    @state() public title = 'Información';
    @state() public image = images.ajuste;
    @state() public message = 'Este es un mensaje informativo.';
    

    render() {
        return html`
            <div class="modal-overlay ${this.open ? 'open' : ''}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title">${this.title}</h2>
                    </div>
                    <div class="modal-body">
                        <slot>${this.message}</slot>
                        <img id="imageInfo" src="${this.image}" alt="">
                    </div>
                </div>
            </div>
        `;
    }
}

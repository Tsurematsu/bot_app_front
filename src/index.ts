import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import "./Pages/Home/page-home";
import "./Pages/Client/page-client";
import "./Pages/Admin/page-admin";
import "./Pages/Error/page-error";
import "./Pages/Admin/Layout/layout-panel";
import "./Pages/Client/Layout/layout-panel-client";

export class AppRoot extends LitElement {
  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet!);

    router.setRoutes([
      { path: '/', component: "page-home" },
      { path: '/client', component: "page-client" },
      { path: '/client/start', component: "layout-panel-client" },
      { path: '/admin', component: "page-admin" },
      { path: '/admin/start', component: "layout-panel" },
      { path: '(.*)', component: 'page-error' },
    ]);
  }

  render() {
    return html` <main id="outlet"></main>`;
  }
}

customElements.define('app-root', AppRoot);

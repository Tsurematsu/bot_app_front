import { LitElement, css, html, unsafeCSS, type CSSResultGroup } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import styles from './app.css?inline'
import login from '../login'
import admin from '../admin'
import AccessClient from '../Access'
import page404 from '../htmlCodes/page404'
import client from '../client'
import Request from '../Request'

@customElement('app-el')
export class appClass extends LitElement {
  static styles = css`${unsafeCSS(styles)}`
  @state()
  private current = "/"
  private setUrl = (url)=>{
    window.location.search = url.slice(1)
    this.current = url
  }
  private getUrl = ()=>this.ofRoute()
  private routes = {
    "/login":login,
    "/":login,
    "/admin":admin,
    "/request":Request,
    "/client":client,
    "/access":AccessClient,
  }

  render() {
    this.ofRoute()
    if (!this.routes[this.current]) return page404();
    return this.routes[this.current](this.setUrl, this.getUrl);
  }

  ofRoute(){
    const hash = window.location.search || '';
    const url = '/' + hash.slice(1)
    this.current = url
    return this.current
  }
}
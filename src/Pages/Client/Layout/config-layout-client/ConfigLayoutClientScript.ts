import { Router } from "@vaadin/router";
import Fetch from "../../../../Helpers/herlperFetch";

export interface dataResponse {
    empresa_nombre: string,
    empresa_correo: string,
    empresa_descripcion: string,
    empresa_prompt: string,
    empresa_example_responses: Record<string, any>,
    empresa_productos: Record<string, any>,
    empresa_page_request_products: string,
    empresa_pdf_data: string
}

export default class ConfigLayoutClientScript{
    public static async logout(){
        const res = await Fetch.get("/client/logout")
        console.log(res);
        Router.go("/client")
    }
    public static async loadData(setConfig){
        const res = await Fetch.get('/client/config')
        const data = res.data as dataResponse 
        setConfig(data)
        console.log(data);
    }
    public static async saveData(e:Event){
        e.preventDefault()
    }
}
import { Router } from "@vaadin/router";
import Fetch from "../../../../Helpers/herlperFetch";
import type { dataResponse } from "./config-layout-client";
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
    }
    public static async saveData(data){
        const res = await Fetch.post('/client/config', {
            empresa_nombre: data.empresa_nombre, 
            empresa_correo: data.empresa_correo, 
            empresa_descripcion: data.empresa_descripcion, 
            empresa_prompt: data.empresa_prompt, 
            empresa_example_responses: data.empresa_example_responses,  
            empresa_productos: data.empresa_productos,  
            empresa_page_request_products: data.empresa_page_request_products,
            empresa_pdf_data: data.empresa_pdf_data
        })

    }
}
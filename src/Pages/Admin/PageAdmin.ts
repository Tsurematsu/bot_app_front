import { Router } from "@vaadin/router";
import { helperFormInput } from "../../Helpers/helperForm";
import Fetch from "../../Helpers/herlperFetch";

export default class PageAdmin {
    public static async onLoadPage() {
        if (!await Fetch.get("/")) {console.clear(); console.log("El back no esta iniciado") };
        
    }
    public static async loginButton(inputs, e:Event) {
        const element = e.target as HTMLButtonElement
        element.disabled = true
        const data = helperFormInput(inputs);
        const res = await Fetch.post("/auth/admin", data)
        if (res.success) Router.go("/admin/start")
        console.log(res);
        element.disabled = false
    }
}   
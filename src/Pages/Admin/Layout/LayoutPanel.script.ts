import { Router } from "@vaadin/router";
import { deleteStorage, getStorage, setStorage } from "../../../Helpers/helperStorage";
import Fetch from "../../../Helpers/herlperFetch";

export default class StartPanelScript{
    public static async onValidUser(setStatus, statusInstant){
        const res = await Fetch.get("/admin")
        console.log(res);
        
        return
        const cache = getStorage('access')
        if (cache && cache=="admin") {
            statusInstant(true)
            const res = await Fetch.get("/admin")
            if (res.success) return 
            deleteStorage('access')
            setStatus(false)
            return Router.go("/admin")
        }
        if(!cache){
            statusInstant(false)
            const res = await Fetch.get("/admin")
            if (res.success) {
                setStorage("access", "admin")
                setStatus(true)
                return   
            }  
            return Router.go("/admin")
        }
        return Router.go("/")
    }
}
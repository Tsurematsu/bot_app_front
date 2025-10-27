import { Router } from "@vaadin/router"
import { deleteStorage, getStorage, setStorage } from "../../../Helpers/helperStorage"
import Fetch from "../../../Helpers/herlperFetch"

export default class LayoutPanelClientScript {
    public static async onValidUser(setStatus, statusInstant){
        const cache = getStorage('access')
        if (cache && cache=="client") {
            statusInstant(true)
            const res = await Fetch.get("/client")
            if (res.success) return 
            deleteStorage('access')
            setStatus(false)
            return Router.go("/client")
        }
        if(!cache){
            statusInstant(false)
            const res = await Fetch.get("/client")
            if (res.success) {
                setStorage("access", "client")
                setStatus(true)
                return   
            }  
            return Router.go("/client")
        }
        return Router.go("/")
    }
}
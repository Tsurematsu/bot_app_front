import { getStorage, setStorage } from "../../../../Helpers/helperStorage";
import Fetch from "../../../../Helpers/herlperFetch";

export default class UsersPanelScript{
    public static async loadClients(setInitListUsers, setListUsers){
        const endpoint = "/admin/listClient"
        const localName = "listUsers"
        const cache = getStorage(localName)
        if (cache) {
            setInitListUsers(cache)
            const res = await Fetch.get(endpoint)
            if (res.success) {
                setListUsers(res.users)
                setStorage(localName, res.users)
            }
        } else {
            setInitListUsers([])
            const res = await Fetch.get(endpoint)
            if (res.success) {
                setStorage(localName, res.users)
                setListUsers(res.users)
            }  
        }
    }
}
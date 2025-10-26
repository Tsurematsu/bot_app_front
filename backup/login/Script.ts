import FETCH from "../tools/FETCH";
import FORM from "../tools/FORM";
export default class Script{
    public static async Auth(){
        const response = await FETCH.post("/action/home")
        FETCH.post("/action/home").then(r=>{if (r.success) window.location.href = "?admin"})
    }
    public static async Login(e:Event){
        const data = FORM(e);
        const response = await FETCH.post("/auth/login", data)
        if (response.validPassword) return window.location.href = "?admin"
    }
}
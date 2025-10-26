import Fetch from "../../Helpers/herlperFetch";

export default class PageClientScript{
    public static async sendEmail(email, panelCode, disableEmail){
        const url = window.location.origin.includes("localhost") ? "https://example.com" : `${window.location.origin}/client`;   
        try {
            disableEmail(true)
            const data = {
                "user_email": email,
                "url": `${url}?__token__`
            }
            const response = await Fetch.post('/auth/email', data)
            console.log(response);
            // if (response.success) return panelCode(true)
            setTimeout(() => {disableEmail(false)}, 1000);
        } catch (error) {
            
        }
    }

    public static async onLoad(){
        const token = window.location.search.slice(1)
        if (token) {
            const res = await Fetch.post("/auth/token", {token})
            console.log(res);
            
        }
    }
}
import FETCH from "../tools/FETCH";

export  default class  Script{
    public static  async request(email, panelStatus, disableSendEmail){
        const url = window.location.origin.includes("localhost") ? "https://example.com" : `${window.location.origin}/?request`;   
        try {
            const data = {
                "email": email,
                "url": `${url}#__token__`
            }
            disableSendEmail(true)
            const response = await FETCH.post('/auth/make_access_code', data)
            console.log(response);
            if (response.success) return panelStatus(true)
            // panelStatus(true)
            setTimeout(() => {disableSendEmail(false)}, 1000);
        } catch (error) {
            
        }
    }
}
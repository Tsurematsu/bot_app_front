import FETCH from "../tools/FETCH";

export  default class  Script{
    public static  async request(email, panelStatus){
        
        try {
            const data = {
                "email": email,
                "url": `${window.location.href}#__token__`
            }
            console.log(data);
            // const response = await FETCH.post(('/auth/make_access_code'))

        } catch (error) {
            
        }
    }
}
import { helperFormInput } from "../../../../../Helpers/helperForm";
import Fetch from "../../../../../Helpers/herlperFetch";
import type { point_bot_WhatsApp_create, point_bot_WhatsApp_status } from "../../../../../server/point.whatsapp";
import type { ModalAuthDevice } from "./modal-auth-device/modal-auth-device";

export default class script{
    public static async createBot(modalAuthDevice : ModalAuthDevice, typeBot, success, inputs: NodeListOf<HTMLInputElement>){
        if (typeBot == "WhatsApp") {
            const data = helperFormInput(inputs)
            const resCreate : point_bot_WhatsApp_create = await Fetch.post("/bot/WhatsApp/create", data)
            let codeInterval = null
            let bot_process = null
            const cancelAction = async ()=>{
                if (codeInterval) clearInterval(codeInterval)
                console.log("iniciando cancelación");
                // const res = await Fetch.post('/bot/WhatsApp/cancel', {bot_process});
                // console.log(res);
                modalAuthDevice.open = false
            }
            const actionSuccess = async ()=>{
                if (codeInterval) clearInterval(codeInterval)
                modalAuthDevice.open = false
                success()
            }
            console.log({resCreate});
            
            if (resCreate.success) {
                bot_process = resCreate.bot_process
                modalAuthDevice.open = true;
                let initStarted = false
                codeInterval = setInterval(async () => {
                    const resStatus : point_bot_WhatsApp_status = await Fetch.post('/bot/WhatsApp/status', {bot_process});
                    if (!resStatus.success) await cancelAction() 
                    if (!initStarted) {
                        modalAuthDevice.config = {
                            code: resStatus.result.code,
                            imageBase64: "",
                            starting: false
                        }
                        if (resStatus.result.app=="on") initStarted = true;
                        return
                    }
                    modalAuthDevice.config = {
                        code: "",
                        imageBase64: "",
                        starting: true
                    }
                    if (!modalAuthDevice.open) await cancelAction() 
                    if (resStatus.result.listen == "running") await actionSuccess()
                }, 500);    
            }
        }
        
    }
}
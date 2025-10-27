import type { ModalAuthDevice } from "./modal-auth-device/modal-auth-device";

export default class script{
    public static async createBot(modalAuthDevice : ModalAuthDevice, typeBot, success){
        if (typeBot == "WhatsApp") {
            modalAuthDevice.open = true
            modalAuthDevice.config = {
                code:"",
                imageBase64:""
            }
            console.log({typeBot});
        }
        
    }
}
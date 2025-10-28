import { getStorage, setStorage } from "../../../../Helpers/helperStorage";
import Fetch from "../../../../Helpers/herlperFetch";
export interface pointBot {
    "id": number,
    "user_id": string,
    "bot_process": string,
    "bot_type": ManageBotsBotType,
    "bot_status": string,
    "bot_phone": string,
    "bot_email": string,
    "bot_password": string
}

export interface ManageBotsBotType {
  MarketPlace: boolean;
  Whatsapp: boolean;
  Instagram: boolean;
}

export default class script{
    public static async getBots(dinamoList, staticList){
        if (getStorage("listBots")) staticList(getStorage("listBots"));
        const res = await Fetch.get('/bot/list');
        if (!res.success) return
        const bots : pointBot[] = res.getBots;
        dinamoList(bots)
        setStorage("listBots", bots)
        return bots
    }
}
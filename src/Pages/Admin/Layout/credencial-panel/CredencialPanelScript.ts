import { helperFormInput } from "../../../../Helpers/helperForm";
import Fetch from "../../../../Helpers/herlperFetch";

export default class CredencialPanelScript{
    public static async addUser(inputs: NodeListOf<HTMLInputElement>, keyList, output: HTMLInputElement){
        const data = helperFormInput(inputs)
        data['keyApiList'] = keyList
        data['url'] = `${window.location.origin}/client?__token__`
        const res = await Fetch.post("/admin/createClient", data)
        if (res.success) {
            output.value = res.url
        }
    }
}
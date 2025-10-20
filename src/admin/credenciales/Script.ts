import FORM from "../../tools/FORM"
import FETCH from "../../tools/FETCH";
import { FORM_elements } from "../../tools/FORM";
export default class Script{
    public static async makeAcces(e){
        const data = FORM(e)
        const elements = FORM_elements(e)
        const response = await FETCH.post('/action/makeClient', data)
        if (!response.token) {

            return
        }
        const url = `${window.location.origin}/?access#${response.token}`
        elements['token'].value = url
    }

    public static async copy(e:Event) {
        const elements = e.target as HTMLElement
        const parent = elements.parentElement.parentElement
        const input = parent.querySelector("input")
        await navigator.clipboard.writeText(input.value)
    }
}
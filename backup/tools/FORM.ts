export default function FORM(e:Event){
    const button:HTMLElement = e.target as HTMLElement
    const parent = button.parentElement
    const input = parent.querySelectorAll("input")
    const data = {}
    const elements = {}
    input.forEach((element)=>{
        data[element.name]=element.value
        elements[element.name] = element
    })
    return data
}

export function FORM_elements(e:Event){
    const button:HTMLElement = e.target as HTMLElement
    const parent = button.parentElement
    const input = parent.querySelectorAll("input")
    const data = {}
    input.forEach((element)=>{
        data[element.name] = element
    })
    return data
}
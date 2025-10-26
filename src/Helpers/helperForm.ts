export function helperFormInput(inputs: NodeListOf<HTMLInputElement>){
    const data = {}
    inputs.forEach((element)=>{
        data[element.name]=element.value
    })
    return data
}
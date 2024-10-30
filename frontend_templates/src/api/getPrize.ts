import { baseUrl } from "../content/content"

export async function getPrize(code: string) {
    try {
        const result = await fetch(`${baseUrl}/obtener_premio?codigo_campana=${code}`)
        const data = await result.json()
        console.log(data)
        return data
    } catch (error) {
        console.error(error)
    }



    return
}
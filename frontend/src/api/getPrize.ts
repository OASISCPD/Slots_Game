import { baseUrl } from "../content/content"

export async function getPrize(code: string) {
    try {
        const result = await fetch(`${baseUrl}/obtener_premio?codigo_campana=${code}`, {
            credentials: 'include' as RequestCredentials,
            mode: "cors" as RequestMode,
            redirect: 'follow' as RequestRedirect
        })
        return result
    } catch (error) {
        console.error(error)
        return
    }
}
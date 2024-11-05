import { baseUrl } from "../content/content";

export async function fetchMailEnviado(): Promise<string | null> {
    const response = await fetch(`${baseUrl}/mail_enviado`, {
        credentials: 'include' as RequestCredentials,
        mode: "cors" as RequestMode,
        redirect: 'follow' as RequestRedirect
    });
    const result = await response.json();
    return result.email;
}
export function getDomainMail(domain: string) {
    const text: string = domain === 'PILAR' ? 'Oasis Pilar' : domain === 'ZARATE' ? 'Oasis Zarate' : domain === 'SALTA' ? 'Nuevo Casino Alberdi' : 'error'
    return text
}
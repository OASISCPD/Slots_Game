import { baseUrl } from "./credentials";

export async function fetchMailEnviado(): Promise<string | null> {
    const response = await fetch(`${baseUrl}/mail_enviado`, {
        credentials: 'include' as RequestCredentials,
        mode: "cors" as RequestMode,
        redirect: 'follow' as RequestRedirect
    });
    const result = await response.json();
    return result.email;
}
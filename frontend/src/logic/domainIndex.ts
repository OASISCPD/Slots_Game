import { domain } from "../content/content";

// Función para cambiar el favicon según el dominio
function changeFavicon(domain: string): void {
    let faviconLink: HTMLLinkElement | null = document.getElementById('dynamic-favicon') as HTMLLinkElement;
    if (!faviconLink) {
        console.error('Favicon link element not found');
        return;
    }

    // Seleccionar el favicon según el valor de la variable 'domain'
    switch (domain) {
        case 'PILAR':
            faviconLink.href = '/images/pilar/indexLogo.png';
            break;
        case 'ZARATE':
            faviconLink.href = '/images/zarate/indexLogo.png';
            break;
        case 'SALTA':
            faviconLink.href = '/images/salta/indexLogo.png';
            break;
        default:
            console.error('Domain not recognized. Default favicon will be used.');
            faviconLink.href = '/images/defaultFavicon.png'; // Favicon por defecto
            break;
    }
}

// Llamar a la función para cambiar el favicon
changeFavicon(domain);
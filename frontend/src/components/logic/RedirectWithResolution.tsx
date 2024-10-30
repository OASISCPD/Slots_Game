import { useMediaQuery } from 'react-responsive'
import { Home } from '../home/mobile/Home';
import { propDomain } from '../../content/content';
import { HomeDesktop } from '../home/desktop/HomeDesktop';

export function RedirectByResolution({ domain }: propDomain) {
    const isMobile = useMediaQuery({ maxWidth: 639 }); //hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })// desde sm hasta md
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    return (
        <>
            {isMobile && <Home domain={domain} />}
            {isTablet && <Home domain={domain} />}
            {isDesktop && <HomeDesktop domain={domain} />}
        </>
    )
}
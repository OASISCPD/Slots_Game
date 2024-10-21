import { useMediaQuery } from "react-responsive"
import { LoadingWrapper } from "../components/loadings/LoadingWrapper"
import { HomeMobileV2 } from '../components/mobile/HomeMobileV2'
import { HomeTabletV1 } from '../components/tablet/HomeTabletV1'
import { HomeDesktopV1 } from '../components/desktop/HomeDesktopV1'

export function PageHome() {
    //detectar diferentes resolucioes
    const isMobile = useMediaQuery({ maxWidth: 639 })//hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })//hasta lg
    const isDesktop = useMediaQuery({ minWidth: 1024 })
    return (
        <>
            {isMobile && (
                <LoadingWrapper HomeComponent={HomeMobileV2} />
            )}
            {isTablet && (
                <LoadingWrapper HomeComponent={HomeTabletV1} />
            )}
            {isDesktop && (
                <LoadingWrapper HomeComponent={HomeDesktopV1} />
            )}
        </>
    )
}
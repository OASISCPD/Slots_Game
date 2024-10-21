import { useMediaQuery } from "react-responsive"
import { HomeMobile } from "../mobile/HomeMobile"
/* import { HomeMobileV2 } from "../../pages/HomeMobileV2" */
/* import { LoadingWrapper } from "../loadings/LoadingWrapper" */

export function ViewLogic() {
    //detectar diferentes resolucioes
    const isMobile = useMediaQuery({ maxWidth: 639 })//hasta sm
    const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 })//hasta lg
    const isDesktop = useMediaQuery({ minWidth: 1024 })

    return (
        <>
            {isMobile && (
                /*  <LoadingWrapper HomeComponent={ } /> */
                <>
                </>
            )}
            {isTablet && (
                <HomeMobile />
            )}
            {isDesktop && (
                <HomeMobile />
            )}
        </>
    )
}
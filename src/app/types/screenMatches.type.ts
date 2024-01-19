enum screens {
    isMobile = 'isMobile',
    isTablet = 'isTablet',
    isDesktop = 'isDesktop'
}

export type screenMatches = {
    [key in screens]: boolean;
};
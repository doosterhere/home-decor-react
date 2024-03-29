import React, {FC, useEffect, useRef, useState} from 'react';

import {IconName} from "../../types";

type IconType = {
    name: IconName;
    width?: string;
    height?: string;
    needHover?: boolean;
    needParentHover?: never;
} | {
    name: IconName;
    width?: string;
    height?: string;
    needHover?: never;
    needParentHover?: boolean;
};

export const Icon: FC<IconType> =
    ({
         name,
         width,
         height,
         needHover,
         needParentHover
     }) => {
        const ref = useRef<SVGSVGElement>(null);
        const [hovered, setHovered] = useState(false);

        const mouseIn = () => {
            setHovered(true);
        }

        const mouseOut = () => {
            setHovered(false);
        }

        useEffect(() => {
            const svg = ref.current;

            if (needHover) {
                svg?.addEventListener('mouseenter', mouseIn);
                svg?.addEventListener('mouseleave', mouseOut);
            }

            if (needParentHover) {
                svg?.parentNode?.addEventListener('mouseenter', mouseIn);
                svg?.parentNode?.addEventListener('mouseleave', mouseOut);
            }

            return () => {
                if (needHover) {
                    svg?.removeEventListener('mouseenter', mouseIn);
                    svg?.removeEventListener('mouseleave', mouseOut);
                }

                if (needParentHover) {
                    svg?.parentNode?.removeEventListener('mouseenter', mouseIn);
                    svg?.parentNode?.removeEventListener('mouseleave', mouseOut);
                }
            }
        }, [needHover, needParentHover]);

        if (!needHover && !needParentHover) {
            return (
                <svg className={`icon icon-${name}`} style={{width, height}} ref={ref}>
                    <use
                        xlinkHref={`/images/sprite.svg#${name}`}
                    ></use>
                </svg>
            );
        }

        return (
            <svg className={`icon icon-${name}`} style={{width, height}} ref={ref}>
                <use
                    style={{display: hovered ? 'none' : 'block'}}
                    xlinkHref={`/images/sprite.svg#${name}`}
                />
                <use
                    style={{display: hovered ? 'block' : 'none'}}
                    xlinkHref={`/images/sprite.svg#${name}-hovered`}
                />
            </svg>
        );
    };
import React, {FC, useEffect, useRef, useState} from 'react';

import {IconName} from "../../types/icon-name.type";

type Icon = {
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

const Icon: FC<Icon> = ({
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
        if (needHover) {
            ref.current?.addEventListener('mouseenter', mouseIn);
            ref.current?.addEventListener('mouseleave', mouseOut);

            return () => {
                ref.current?.removeEventListener('mouseenter', mouseIn);
                ref.current?.removeEventListener('mouseleave', mouseOut);
            };
        }

        if (needParentHover) {
            ref.current?.parentNode?.addEventListener('mouseenter', mouseIn);
            ref.current?.parentNode?.addEventListener('mouseleave', mouseOut);

            return () => {
                ref.current?.parentNode?.removeEventListener('mouseenter', mouseIn);
                ref.current?.parentNode?.removeEventListener('mouseleave', mouseOut);
            };
        }
    }, []);

    if (!needHover && !needParentHover) {
        return (
            <svg className={`icon icon-${name}`} style={{width, height}} ref={ref}>
                <use
                    xlinkHref={`${process.env.PUBLIC_URL}/images/sprite.svg#${name}`}
                ></use>
            </svg>
        );
    }

    return (
        <svg className={`icon icon-${name}`} style={{width, height}} ref={ref}>
            <use
                style={{display: hovered ? 'none' : 'block'}}
                xlinkHref={`${process.env.PUBLIC_URL}/images/sprite.svg#${name}`}
            />
            <use
                style={{display: hovered ? 'block' : 'none'}}
                xlinkHref={`${process.env.PUBLIC_URL}/images/sprite.svg#${name}-hovered`}
            />
        </svg>
    );
};

export default Icon;
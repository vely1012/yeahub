import { type CSSProperties, type ComponentPropsWithoutRef } from 'react';
import RawYeahubLogo from '@/assets/icons/yeahub-logo.svg?react';
import RawYeahubTitleLogo from '@/assets/icons/yeahub-title-logo.svg?react';

export interface YeahubLogoProps extends ComponentPropsWithoutRef<typeof RawYeahubLogo> {
    main?: string;
    secondary?: string;
}

export function YeahubLogo({ 
    main = '#4600E9', 
    secondary = 'white', 
    style,
    ...rest 
}: YeahubLogoProps) {
    return (
        <RawYeahubLogo 
            style={{ 
                '--logo-bg': main, 
                '--logo-tree-col': secondary,
                ...style 
            } as CSSProperties}
            {...rest} 
        />
    );
}

export interface YeahubTitleLogoProps extends ComponentPropsWithoutRef<typeof RawYeahubTitleLogo> {
    color?: string;
}

export function YeahubTitleLogo({ 
    color = 'black', 
    style,
    ...rest 
}: YeahubTitleLogoProps) {
    return (
        <RawYeahubTitleLogo 
            style={{ 
                '--color': color,
                ...style 
            } as CSSProperties}
            {...rest} 
        />);
}
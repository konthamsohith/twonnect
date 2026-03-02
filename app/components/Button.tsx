import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', fullWidth = false, className = '', ...props }, ref) => {

        const baseClass = 'btn';
        const variantClass = `btn-${variant}`;
        const sizeClass = `btn-${size}`;
        const widthClass = fullWidth ? 'btn-full-width' : '';

        return (
            <button
                ref={ref}
                className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

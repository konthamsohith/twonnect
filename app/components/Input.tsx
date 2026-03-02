import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
        return (
            <div className={`input-wrapper ${fullWidth ? 'full-width' : ''} ${className}`}>
                {label && <label className="input-label">{label}</label>}
                <input
                    ref={ref}
                    className={`base-input ${error ? 'input-error' : ''}`}
                    {...props}
                />
                {error && <span className="error-message">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

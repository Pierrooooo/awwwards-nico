import React from 'react';

interface LineWrapperProps {
    desc: string;
    className?: string;
}

export const lineWrapper: React.FC<LineWrapperProps> = ({ desc, className }) => {
    return (
        <>
            {desc.split('\n').map((line, index) => (
                <span key={index} className={className}>
                    {line}
                    <br />
                </span>
            ))}
        </>
    );
};
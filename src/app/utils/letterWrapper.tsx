import React from 'react';

interface LetterWrapperProps {
    title: string;
    spaceClassName?: string;
    letterClassName?: string;
}

export const LetterWrapper: React.FC<LetterWrapperProps> = ({
    title = '',
    spaceClassName,
    letterClassName = 'letter',
}) => {
    return (
        <>
            {title.split('').map((char, index, arr) => {
                if (char !== ' ') {
                    const previousChar = arr[index - 1];
                    const spanClass = previousChar === ' ' ? spaceClassName : '';
                    const combinedClassName = `${letterClassName} ${spanClass}`.trim();
                    return (
                        <span key={index} className={combinedClassName || undefined}>
                            {char}
                        </span>
                    );
                }
                return null;
            })}
        </>
    );
};
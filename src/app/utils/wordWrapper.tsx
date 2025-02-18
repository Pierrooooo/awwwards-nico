import React from 'react';
import { LetterWrapper } from './letterWrapper';

interface WordWrapperProps {
    title: string;
    wordClassName?: string;
    spaceClassName?: string; // Pass this for LetterWrapper
    letterWrapper?: boolean; // Enable LetterWrapper functionality
}

export const WordWrapper: React.FC<WordWrapperProps> = ({
    title = '',
    wordClassName,
    spaceClassName,
    letterWrapper = false,
}) => {
    return (
        <>
            {title.split(' ').map((word, index) => (
                <span key={index} className={wordClassName || 'word'}>
                    {letterWrapper ? (
                        <LetterWrapper title={word}/>
                    ) : (
                        word
                    )}
                </span>
            ))}
        </>
    );
};

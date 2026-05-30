import { useState, useRef, useEffect } from 'react';
import ArrowSvg from '@/assets/icons/menu-arrow.svg?react';
import './FormatedAnswerWidget.css';

interface FormatedAnswerWidgetProps {
    content: string;
    maxHeight?: number;
    omitToggle?: boolean;
    defaultExpanded?: boolean;
}

function FormatedAnswerWidget({ 
    content, 
    maxHeight = 300, 
    omitToggle = false,
    defaultExpanded = false 
}: FormatedAnswerWidgetProps) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [needsExpand, setNeedsExpand] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current && !omitToggle) {
            const isOverflowing = contentRef.current.scrollHeight > maxHeight;
            setNeedsExpand(isOverflowing);
        }
    }, [content, maxHeight, omitToggle]);

    if (!content) return null;

    if (omitToggle) {
        return (
            <div className="formated-answer">
                <div 
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="formated-answer__html-content"
                />
            </div>
        );
    }

    // Если кнопка не нужна (контент помещается) — показываем без маски и без ограничения высоты
    const shouldShowMask = needsExpand && !isExpanded;

    return (
        <div className="formated-answer">
            <div 
                className={`formated-answer__text ${shouldShowMask ? 'collapsed' : 'expanded'}`}
                style={{ maxHeight: shouldShowMask ? `${maxHeight}px` : 'none' }}
            >
                <div 
                    ref={contentRef}
                    dangerouslySetInnerHTML={{ __html: content }}
                    className="formated-answer__html-content"
                />
            </div>
            {needsExpand && (
                <button 
                    className="formated-answer__toggle-btn"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Свернуть' : 'Развернуть'}
                    <ArrowSvg className={`formated-answer__arrow ${isExpanded ? 'expanded' : ''}`} />
                </button>
            )}
        </div>
    );
}

export default FormatedAnswerWidget;
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { type IQuestion, useGetQuestionBySlugQuery } from "@/shared/api/baseApi";
import { useState, type MouseEvent } from 'react';
import FormatedAnswerWidget from '@/widgets/FormatedAnswerWidget/FormatedAnswerWidget';
import useQueueNavigation from './lib/useQueueNavigation';
import AsidePanel from '@/shared/ui/AsidePanel/AsidePanel';

import ArrowSvg from '@/assets/icons/menu-arrow.svg?react';
import ForwardArrowSvg from '@/assets/icons/forward-arrow.svg?react';
import DiplomaIcon from '@/assets/icons/diploma-icon.svg?react';

import TelegramIcon from '@/assets/social-media/Telegram_white.svg?react'
import YoutubeIcon from '@/assets/social-media/Youtube.svg?react'
import ProfileIcon from '@/assets/social-media/Profile.svg?react'

import QuestionMeta from '@/widgets/QuestionMeta/QuestionMeta';

import "./ExactQuestionPage.css";


export interface QuestionsQueue {
    currentIndex: number;
    slugsMap: Map<number, string[]>
    titleOrDescription: string,
    filters: Record<string, any>;
    pagination: {
        page: number;
        total: number;
        limit: number;
        totalPages: number;
    };
}

export interface ExactQuestionLocationState {
    question?: IQuestion;
    queue?: QuestionsQueue;
}

function ExactQuestionPage() {
    const navigate = useNavigate();
    const { questionSlug: slug } = useParams<{ questionSlug: string }>();
    const locationState = useLocation().state as ExactQuestionLocationState;
    const { question: passedQuestion, queue: initialQueue } = locationState ?? {};
    const { data: fetchedQuestion, isLoading: isQuestionLoading } = useGetQuestionBySlugQuery(slug!, {
        skip: !!passedQuestion,
    });

    const [metaAcitve, setMetaActive] = useState(false);


    const question = passedQuestion || fetchedQuestion;
    
    const { 
        nextArgs, 
        prevArgs, 
        isNextPageLoading, 
        isPrevPageLoading,
        isNextDisabled,
        isPrevDisabled 
    } = useQueueNavigation(initialQueue, slug);

    const backHandler = (e: MouseEvent) => {
        e.preventDefault();
        navigate(-1);
    };

    const prevQuestionHandler = () => {
        if (prevArgs) {
            navigate(...prevArgs);
        }
    };

    const nextQuestionHandler = () => {
        if (nextArgs) {
            navigate(...nextArgs);
        }
    };

    if (!passedQuestion && isQuestionLoading) {
        return <div className="question-page wrapper">Загрузка вопроса...</div>;
    }

    if (!question) {
        return <div className="question-page wrapper">Вопрос не найден</div>;
    }

    return (
        <div className="question-page wrapper">
            <a className="question-page__back-link" onClick={backHandler}>
                <ForwardArrowSvg className="arrow" />Назад
            </a>
            <main className="question-page__content">
                <div className={`question-part ${question.imageSrc ? "question-part_title" : ""}`}>
                    {question.imageSrc && (
                        <img src={question.imageSrc} alt="" className="question__title-image" />
                    )}
                    <div className="question__title-container">
                        <h2 className="question__title">
                            <button type="button" className="question__toggle-meta-btn" onClick={() => setMetaActive(prev => !prev)}>
                                <DiplomaIcon width="20px" height="20px" className="question__diploma-icon" style={{ color: "var(--black700)" }} />
                            </button>
                            {question.title}
                        </h2>
                        <h3 className="question__sub-title">{question.description}</h3>
                    </div>
                </div>

                <div className="question-part question-part_navigation">
                    <button
                        type="button"
                        className="question__nav-btn question__nav-btn_prev"
                        onClick={prevQuestionHandler}
                        disabled={isPrevDisabled && !isPrevPageLoading}
                    >
                        <ArrowSvg className="question__nav-arrow" />
                        {isPrevPageLoading ? "Загрузка..." : "Предыдущий"}
                    </button>
                    <button
                        type="button"
                        className="question__nav-btn question__nav-btn_next"
                        onClick={nextQuestionHandler}
                        disabled={isNextDisabled && !isNextPageLoading}
                    >
                        {isNextPageLoading ? "Загрузка..." : "Следующий"}
                        <ArrowSvg className="question__nav-arrow" />
                    </button>
                </div>

                <div className="question-part">
                    <h2 className="question-part__heading">Краткий ответ</h2>
                    {/* <MarkdownRenderer content={question.shortAnswer}/> */}
                    {/* <p dangerouslySetInnerHTML={{__html: question.shortAnswer}}></p> */}
                    <FormatedAnswerWidget content={question.shortAnswer} omitToggle />
                </div>
                <div className="question-part">
                    <h2 className="question-part__heading">Развернутый ответ</h2>
                    <FormatedAnswerWidget content={question.longAnswer} />
                </div>
                <GuruQuestionPart />
            </main>
            <AsidePanel active={metaAcitve} setActive={setMetaActive}>
                    <div className="question-part question-part_meta">
                        <QuestionMeta question={question} />
                    </div>
                {/* <GuruQuestionPart /> */}
            </AsidePanel>
        </div>
    );
}

function GuruQuestionPart() {
    return (
        <div className="question-part question-part_guru">
            <div className="guru__icon">
                <img className="guru__icon-image" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" />
            </div>
            <h4 className="guru__name">Руслан Куянец</h4>
            <span className="guru__position">Python Guru</span>
            <p className="guru__text">Guru - это эксперты Yeahub, которые помогают развивать комьюнити</p>
            <div className="guru__media-links-container">
                <a href="#" className="guru__media-link"><TelegramIcon /></a>
                <a href="#" className="guru__media-link"><YoutubeIcon /></a>
                <a href="#" className="guru__media-link"><ProfileIcon /></a>
            </div>
        </div>
    )
}

export default ExactQuestionPage;
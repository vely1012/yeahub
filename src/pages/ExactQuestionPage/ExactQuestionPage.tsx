import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { type IQuestion, useGetQuestionBySlugQuery } from "@/shared/api/baseApi";
import ArrowSvg from '@/assets/icons/menu-arrow.svg?react'
import ForwardArrowSvg from '@/assets/icons/forward-arrow.svg?react'
import DiplomaIcon from '@/assets/icons/diploma-icon.svg?react'
import { type MouseEvent } from 'react';

import "./ExactQuestionPage.css"

interface ExactQuestionLocationState {
    question?: IQuestion,
    queue?: {
        currentIndex: number,
        slugs: string[]
    } 
}

function ExactQuestionPage() {
    const navigate = useNavigate();
    const { questionSlug: slug } = useParams<{ questionSlug: string }>();
    const { question: passedQuestion, queue } = useLocation().state ?? {} as ExactQuestionLocationState;
    const { data: fetchedQuestion, isLoading } = useGetQuestionBySlugQuery(slug!, {
        skip: !!passedQuestion,
    });

    let question = passedQuestion || fetchedQuestion;


    const backHandler = function(e: MouseEvent) {
        e.preventDefault();

        if(!queue) {
            navigate("/questions");
        }
    }

    const prevQuestionHandler = function() {
        const location = "../" + queue!.slugs[queue!.currentIndex - 1]
        const state: ExactQuestionLocationState = { queue: { ...queue, currentIndex: queue.currentIndex - 1 } }
        navigate(location, { state: state, replace: true })
    }

    const nextQuestionHandler = function() {
        const location = "../" + queue!.slugs[queue!.currentIndex + 1]
        const state: ExactQuestionLocationState = { queue: { ...queue, currentIndex: queue.currentIndex + 1 } }
        navigate(location, { state: state, replace: true })
    }

    // for testing with image, cause most q's have none
    // question = { ...question, imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/960px-Flag_of_France.svg.png" }

    if (!passedQuestion && isLoading) {
        return <div>Загрузка вопроса...</div>;
    }

    if (!question) {
        return <div>Вопрос не найден</div>;
    }

    return (
        <div className="question-page wrapper">
            <a className="question-page__back-link" onClick={backHandler}><ForwardArrowSvg className="arrow"/>Назад</a>
            <div className={`question-part ${question.imageSrc ? "question-part_title" : ""}`}>
                <img src={question.imageSrc??"null"} alt="" className="question__title-image" />
                <div className="question__title-container">
                    <h2 className="question__title">
                        <button type="button" className="question__toggle-meta-btn">
                            <DiplomaIcon width="20px" height="20px" className="question__diploma-icon" style={{ color: "var(--black700)"}}/>
                        </button>
                        {question.title}
                    </h2>
                    <h3 className="question__sub-title">{question.description}</h3>
                </div>
            </div>
            <div className="question-part question-part_navigation">
                <button type="button" className="question__nav-btn question__nav-btn_prev" onClick={prevQuestionHandler} disabled={!queue || queue.currentIndex === 0}><ArrowSvg className="question__nav-arrow" />Пердыдущий</button>
                <button type="button" className="question__nav-btn question__nav-btn_next" onClick={nextQuestionHandler} disabled={queue && queue.currentIndex !== queue.slugs.length - 1}>Следующий <ArrowSvg className="question__nav-arrow" /></button>  
            </div>
            <div className="question-part">
                <p>{question.shortAnswer}</p>
            </div>
        </div>
    );
}

export default ExactQuestionPage
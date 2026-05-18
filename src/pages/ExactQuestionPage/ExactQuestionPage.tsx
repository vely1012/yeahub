import { useParams, useLocation } from 'react-router-dom';
import { type IQuestion, useGetQuestionByIdQuery } from "@/shared/api/baseApi";
import ArrowSvg from '@/assets/icons/menu-arrow.svg?react'
import DiplomaIcon from '@/assets/icons/diploma-icon.svg?react'

import "./ExactQuestionPage.css"

function ExactQuestion() {
    const { questionId: id } = useParams<{ questionId: string }>();
    const location = useLocation();

    const passedQuestion = (location.state as IQuestion) || null;

    const { data: fetchedQuestion, isLoading } = useGetQuestionByIdQuery(id!, {
        skip: !!passedQuestion,
    });

    let question = passedQuestion || fetchedQuestion;

    if (!passedQuestion && isLoading) {
        return <div>Загрузка вопроса...</div>;
    }

    if (!question) {
        return <div>Вопрос не найден</div>;
    }

    // for testing with image, cause most q's have none
    // question = { ...question, imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/960px-Flag_of_France.svg.png" }

    return (
        <div className="question-page">
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
                <button type="button" className="question__nav-btn question__nav-btn_prev"><ArrowSvg className="question__nav-arrow" />Пердыдущий</button>
                <button type="button" className="question__nav-btn question__nav-btn_next">Следующий <ArrowSvg className="question__nav-arrow" /></button>  
            </div>
            <div className="question-part">
                <p>{question.shortAnswer}</p>
            </div>
        </div>
    );
}

export default ExactQuestion
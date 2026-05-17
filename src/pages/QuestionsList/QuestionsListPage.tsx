import { useGetQuestionsQuery } from "@/shared/api/baseApi";
import { useState, type CSSProperties } from "react";
import DropArrow from '@/assets/icons/menu-arrow.svg?react'
import ForwardArrow from '@/assets/icons/forward-arrow.svg?react'
import { Link } from "react-router-dom";
import { type IQuestion } from "@/shared/api/baseApi";
import Filters from "@/shared/ui/Filters/Filters";

import './QuestionsListPage.css'

function QuestionsList() {
    // const [filters, setFilters] = useState({
    //     skills: ['React', 'JavaScript', 'Redux']
    // });

    const filters = { skills: ['JavaScript', 'React']};
    const [activeQuestionId, setActiveQuestionId] = useState<null | number>(null);

    const QuestionsQuery = useGetQuestionsQuery({ page: 2 });

    // console.log(JSON.stringify(questions, null, 4))

    if(QuestionsQuery.status === 'pending') {
        return <h2>spinner</h2>
    }

    return (
        <div className="questions-container">
            <main className="questions">
                <h2 className="questions__header">Вопросы {filters.skills.join(', ')}</h2>
                <hr className="question__hr"/>
                <div className="questions__container">
                    {
                        QuestionsQuery.currentData.data.map((q: IQuestion) =>
                            <div key={"question_" + q.id} className={"question " + (q.id === activeQuestionId ? "question_active":"")}>
                                <div className="question__title-wrapper" onClick={() => setActiveQuestionId(prev => prev == q.id ? null : q.id)}>
                                    <span className="question__title-mark">●</span>
                                    <h3 className="question__title">{q.title}</h3>
                                    <DropArrow className="question__title-arrow" />
                                </div>
                                <div className="question__answer">
                                    {/* <div className="question__data-row">
                                    </div> */}
                                    <span className="question__badge" style={{'--content' : `"${q.rate}"`} as CSSProperties}>Рейтинг:</span>
                                    <span className="question__badge" style={{'--content' : `"${q.rate}"`} as CSSProperties}>Сложность:</span>
                                    {q.imageSrc ? <img src={q.imageSrc} /> : null}
                                    <p className="question__short-answer">{q.shortAnswer}</p>
                                    <Link to={q.slug} state={q} className="question__details-link" style={{ color: "var(--purp700)"}}>Подробнее <ForwardArrow /></Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            </main>
            <Filters />
        </div>
    )
}

export default QuestionsList
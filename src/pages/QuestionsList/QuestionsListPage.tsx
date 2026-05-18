import { useGetQuestionsQuery } from "@/shared/api/baseApi";
import { useRef, useState, type CSSProperties } from "react";
import DropArrow from '@/assets/icons/menu-arrow.svg?react'
import ForwardArrow from '@/assets/icons/forward-arrow.svg?react'
import { Link } from "react-router-dom";
import { type IQuestion } from "@/shared/api/baseApi";
import Filters from "@/shared/ui/Filters/Filters";

import './QuestionsListPage.css'

function QuestionsList() {
    const filters = { skills: ['JavaScript', 'React']};
    const [activeQuestionId, setActiveQuestionId] = useState<null | number>(null);
    const filtersRef = useRef<HTMLElement | null>(null);

    // const QuestionsQuery = useGetQuestionsQuery({ page: 2 });
    const QuestionsQuery = useGetQuestionsQuery({});

    if(QuestionsQuery.status === 'pending') {
        return <h2>spinner</h2>
    }

    return (
        <div className="questions-page-container wrapper">
            <main className="questions">
                <h2 className="questions__header">
                    <p className="questions__header-text">Вопросы {filters.skills.join(', ')}</p>
                    <button type="button" className="questions__toggle-filters-btn" onClick={() => { (filtersRef.current as HTMLElement).classList.add("filters_active") }} />
                    </h2>
                <hr className="questions__hr"/>
                <div className="questions__content">
                    {
                        QuestionsQuery.currentData.data.map((q: IQuestion) =>
                            <div key={"question_" + q.id} className={"question " + (q.id === activeQuestionId ? "question_active":"")}>
                                <div className="question__title-wrapper" onClick={() => setActiveQuestionId(prev => prev == q.id ? null : q.id)}>
                                    <span className="question__title-mark">●</span>
                                    <h3 className="question__title">{q.title}</h3>
                                    <DropArrow className="question__title-arrow" />
                                </div>
                                <div className="question__answer">
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
            <aside className="filters__container">
                <Filters ref={filtersRef} />
            </aside>
        </div>
    )
}

export default QuestionsList
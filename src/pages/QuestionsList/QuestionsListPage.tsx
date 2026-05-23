import { useGetQuestionsQuery } from "@/shared/api/baseApi";
import { useState, type CSSProperties } from "react";
import DropArrow from '@/assets/icons/menu-arrow.svg?react'
import ForwardArrow from '@/assets/icons/forward-arrow.svg?react'
import { Link } from "react-router-dom";
import { type IQuestion } from "@/shared/api/baseApi";
import Filters from "@/widgets/Filters/Filters";
import { usePage } from "@/shared/ui/Pagination/usePage";
import Pagination from "@/shared/ui/Pagination/Pagination";
import { useQuestionFilters, type QuestionFilters } from "@/shared/lib/useFilters";

import './QuestionsListPage.css'

function QuestionsListPage() {
    const [activeQuestionId, setActiveQuestionId] = useState<null | number>(null);

    const [filtersActive, setFiltersActive] = useState(false);
    const { page } = usePage();
    const { filters } = useQuestionFilters();

    const queryParams: Partial<QuestionFilters> & { page: number } = { page };
    for (const [key, value] of Object.entries(filters)) {
        if (value && (!Array.isArray(value) || value.length > 0)) {
            (queryParams as any)[key] = value;
        }
    }

    // const QuestionsQuery = useGetQuestionsQuery({ page });
    // const QuestionsQuery = useGetQuestionsQuery({ page, ...filters });
    // const QuestionsQuery = useGetQuestionsQuery({ page, skills: [] });
    const QuestionsQuery = useGetQuestionsQuery(queryParams);

    if (QuestionsQuery.status === 'pending') {
        return <h2>spinner</h2>
    }
    if (QuestionsQuery.status === 'rejected') {
        return <h2>{JSON.stringify(QuestionsQuery.error, null, 4)}</h2>
    }

    const { limit, total } = QuestionsQuery.currentData;

    return (
        <div className="questions-page-container wrapper">
            <main className="questions">
                <h2 className="questions__header">
                    <p className="questions__header-text">Вопросы {filters.skills.join(', ')}</p>
                    <button type="button" className="questions__toggle-filters-btn" onClick={() => setFiltersActive(prev => !prev)} />
                </h2>
                <hr className="questions__hr" />
                <div className="questions__content">
                    {
                        QuestionsQuery.currentData.data.map((q: IQuestion, i: number) =>
                            <div key={"question_" + q.id} className={"question " + (q.id === activeQuestionId ? "question_active" : "")}>
                                <div className="question__title-wrapper" onClick={() => setActiveQuestionId(prev => prev == q.id ? null : q.id)}>
                                    <span className="question__title-mark">●</span>
                                    <h3 className="question__title">{q.title}</h3>
                                    <DropArrow className="question__title-arrow" />
                                </div>
                                <div className="question__answer">
                                    <span className="question__badge" style={{ '--content': `"${q.rate}"` } as CSSProperties}>Рейтинг:</span>
                                    <span className="question__badge" style={{ '--content': `"${q.rate}"` } as CSSProperties}>Сложность:</span>
                                    {q.imageSrc ? <img src={q.imageSrc} /> : null}
                                    <p className="question__short-answer">{q.shortAnswer}</p>
                                    <Link to={q.slug} state={{ question: q, queue: { currentIndex: i, slugs: QuestionsQuery.currentData.data.map(({ slug }: IQuestion) => slug) } }} className="question__details-link">Подробнее <ForwardArrow /></Link>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Pagination limit={limit} total={total} />
            </main>
            <aside className="filters__container">
                <Filters active={filtersActive} setActive={setFiltersActive} />
            </aside>
        </div>
    )
}

export default QuestionsListPage
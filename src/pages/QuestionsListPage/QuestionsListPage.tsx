import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


import { useGetQuestionsQuery } from "@/shared/api/baseApi";
import { useDeferredValue, useState } from "react";
import DropArrow from '@/assets/icons/menu-arrow.svg?react'
import ForwardArrow from '@/assets/icons/forward-arrow.svg?react'
import { Link } from "react-router-dom";
import { type IQuestion } from "@/shared/api/baseApi";
import Filters from "@/widgets/Filters/Filters";
import { usePage } from "@/shared/ui/Pagination/usePage";
import Pagination from "@/shared/ui/Pagination/Pagination";
import { useQuestionFilters } from "@/shared/lib/useFilters";
import useQuestionSearch from "@/shared/lib/useQuestionSearch";
import type { ExactQuestionLocationState } from "../ExactQuestionPage/ExactQuestionPage";

import './QuestionsListPage.css'
import AsidePanel from "@/shared/ui/AsidePanel/AsidePanel";
import StatBadge from "@/shared/ui/StatBadge/StatBadge";
import FormatedAnswerWidget from '@/widgets/FormatedAnswerWidget/FormatedAnswerWidget';

function QuestionsListPage() {
    const [skills, setSkills] = useState<string[]>([]);
    const [filtersActive, setFiltersActive] = useState(false);

    return (
        <div className="questions-page-container wrapper">
            <main className="questions">
                <h2 className="questions__header">
                    <p className="questions__header-text">Вопросы{skills.length > 0 ? (": " + skills.join(', ')) : ""}</p>
                    <button type="button" className="questions__toggle-filters-btn" onClick={() => setFiltersActive(prev => !prev)} />
                </h2>
                <hr className="questions__hr" />
                <QuestionsListPage.QuestionsContent />
            </main>
            <AsidePanel active={filtersActive} setActive={setFiltersActive}>
                <Filters setSkills={setSkills} />
            </AsidePanel>
        </div>
    )
}

QuestionsListPage.QuestionsContent = function () {
    const { page } = usePage();
    const [activeQuestionId, setActiveQuestionId] = useState<null | number>(null);

    const { filters } = useQuestionFilters();
    const { questionSearch } = useQuestionSearch();
    const titleOrDescription = useDeferredValue(questionSearch);

    const QuestionsQuery = useGetQuestionsQuery({ ...filters, page, titleOrDescription });

    if (QuestionsQuery.status === 'pending') {
        return (
            <div className="questions__content">
                {Array(10).fill(null).map((_, index) => (
                    <div key={index} className="question">
                        <div className="question__title-wrapper">
                            <span className="question__title-mark">●</span>
                            <div style={{ flex: 0.6 }}>
                                <Skeleton />
                            </div>
                            <div style={{ marginLeft: "auto", aspectRatio: 1, width: "1em" }}>
                                <Skeleton />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (QuestionsQuery.status === 'rejected') {
        return <h2>{JSON.stringify(QuestionsQuery.error, null, 4)}</h2>
    }

    const { limit, total } = QuestionsQuery.currentData;

    return <>
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
                            <StatBadge label="Рейтинг:" stat={q.rate.toString()} />
                            <StatBadge label="Сложность:" stat={q.complexity.toString()} />

                            {q.imageSrc ? <img src={q.imageSrc} /> : null}
                            {/* <p className="question__short-answer">{q.shortAnswer}</p> */}
                            <FormatedAnswerWidget content={q.shortAnswer} maxHeight={100} />
                            <Link
                                className="question__details-link"
                                to={q.slug}
                                state={{
                                    question: q,
                                    queue: {
                                        currentIndex: i,
                                        titleOrDescription,
                                        slugsMap: (() => {
                                            const initialSlugsMap = new Map<number, string[]>();
                                            initialSlugsMap.set(page, QuestionsQuery.currentData.data.map(({ slug }: IQuestion) => slug));

                                            return initialSlugsMap
                                        })(),
                                        filters: filters,
                                        pagination: {
                                            page,
                                            total,
                                            limit,
                                            totalPages: Math.ceil(total / limit)
                                        }
                                    }
                                } as ExactQuestionLocationState}
                            >
                                Подробнее <ForwardArrow />
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
        <Pagination limit={limit} total={total} />
    </>
}

export default QuestionsListPage
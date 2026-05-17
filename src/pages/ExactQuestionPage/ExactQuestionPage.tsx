import { useParams, useLocation } from 'react-router-dom';
import { type IQuestion, useGetQuestionByIdQuery } from "@/shared/api/baseApi";

import "./ExactQuestionPage.css"

function ExactQuestion() {
    const { questionId: id } = useParams<{ questionId: string }>(); // ← ID из URL
    const location = useLocation();

    const passedQuestion = (location.state as IQuestion) || null;

    // 2. RTK Query хук с условием: не запрашивать, если данные уже есть
    const { data: fetchedQuestion, isLoading } = useGetQuestionByIdQuery(id!, {
        skip: !!passedQuestion, // ← пропускаем запрос, если данные переданы
    });

    // 3. Выбираем источник данных: переданные > загруженные
    const question = passedQuestion || fetchedQuestion;

    if (!passedQuestion && isLoading) {
        return <div>Загрузка вопроса...</div>;
    }

    // 5. Обработка отсутствия данных
    if (!question) {
        return <div>Вопрос не найден</div>;
    }

    return (
        <div className="question">
            <h2>{question.title}</h2>
            <div className="content">
                <p>{question.shortAnswer}</p>
            </div>
        </div>
    );
}

export default ExactQuestion
import { Link } from "react-router-dom"

function HomePage() {
    return (
        <div style={{ padding: "30px"}}>
            Главная страница всё ещё находится в разработке, но Вы можете ознакомиться с <Link to="/questions" style={{ color: "var(--purp700)"}}>базой вопросов с собеседований</Link>
        </div>
    )
}

export default HomePage
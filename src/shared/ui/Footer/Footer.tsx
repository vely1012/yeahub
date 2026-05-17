import { Link } from 'react-router-dom';

import './Footer.css'
import { YeahubTitleLogo } from '../YeahubLogos/YeahubLogos';

function Footer() {
    return (
        <footer className="footer section-with-bg">
            {/* <h2 className="footer-title">Yehub</h2> */}
            <YeahubTitleLogo className="footer__logo" color="white" />
            <h3 className="footer__sub-title">Выбери, каким будет IT завтра, вместе с нами</h3>
            <p className="footer__text gray-text">YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.</p>
            <hr className='footer__line'/>
            <div className="footer__lower-sec gray-text">
                <span className="footer__copyrights">© 2024 YeaHub</span>
                <Link to="/documents" className='footer__to-documents'>Документы</Link>
                <span className="footer__luring-text">Ищите нас и в других соцсетях @yeahub_it</span>
                <a href="" className="footer__external-link"></a>
                <a href="" className="footer__external-link"></a>
                <a href="" className="footer__external-link"></a>
                <a href="" className="footer__external-link"></a>
                <a href="" className="footer__external-link"></a>
            </div>
        </footer>
    )
}

export default Footer
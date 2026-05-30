import { YeahubTitleLogo } from '../../shared/ui/Logo/YeahubLogos';
import './Footer.css'

function Footer() {
    return (
        <footer className="footer section-with-bg wrapper">
            <YeahubTitleLogo className="footer__logo" color="white" width="100px" />
            <h3 className="footer__sub-title">Выбери, каким будет IT завтра, вместе с нами</h3>
            <p className="footer__text">YeaHub — это полностью открытый проект, призванный объединить и улучшить IT-сферу. Наш исходный код доступен для просмотра на GitHub. Дизайн проекта также открыт для ознакомления в Figma.</p>
            <hr className='footer__line' />
            <div className="footer__lower-sec gray-text">
                <span className="footer__copyrights">© 2024 YeaHub</span>
                <a href="#" className='footer__to-documents'>Документы</a>
                <span className="footer__luring-text">Ищите нас и в других соцсетях @yeahub_it</span>
                <div className="footer__external-links">
                    <a href="#" className="footer__external-link"><img src="/social-media/Figma.svg" alt="" /></a>
                    <a href="#" className="footer__external-link"><img src="/social-media/Github_white.svg" alt="" /></a>
                    <a href="#" className="footer__external-link"><img src="/social-media/Telegram_white.svg" alt="" /></a>
                    <a href="#" className="footer__external-link"><img src="/social-media/tik_tok.svg" alt="" /></a>
                    <a href="#" className="footer__external-link"><img src="/social-media/Youtube.svg" alt="" /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
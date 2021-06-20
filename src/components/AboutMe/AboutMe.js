import "../AboutMe/AboutMe.css";
import myfoto from "../../images/1623159816160.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <div className="about-me__container">
                <h2 className="about-me__title">Студент</h2>
                <div className="about-me__line"></div>
                <div className="about-me__main">
                    <div className="about-me__textblock">
                        <h3 className="about-me__name">Павел</h3>
                        <p className="about-me__specialty">Фронтенд-разработчик, 36 лет</p>
                        <p className="about-me__details">
                            Я родился и живу в Тюмени, закончил ТюмГНГУ. Женат. Есть дочь. Люблю путешествовать(есть большая мечта посетить Северную Америку), прогулки пешком и на велосипеде. С 2007 года работаю в гостиничном бизнесе.
                            Недавно начал кодить. Прохожу курс по веб-разработке, ищу работу фронтенд-разработчиком.
                        </p>
                        <div className="about-me__links">
                            <a href="https://github.com/PavelKuzmichev/" className="about-me__link" target="_blank">
                                Github
                            </a>
                            <a href="https://t.me/PaulPhink" className="about-me__link" target="_blank">
                                Telegram
                            </a>
                        </div>
                    </div>
                    <img className="about-me__fotoblock" alt="Фото" src={myfoto}></img>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;

import classes from '../mainPage.module.scss'

export default function ArticleCard({image, date, title, desc}){
    return(
        <>
            <div className={classes.card}>
                <div className={classes.image}>
                    <img src={image} alt="" />
                </div>
                <div className={classes.con}>
                    <div>
                        <div className={classes.date}>
                            <p>{date}</p>
                        </div>
                        <div className={classes.text}>
                            <p>{title}</p>
                            <p>{desc}</p>
                        </div>
                    </div>
                    <div className={classes.more}>
                        <button type="button"><p>Подробнее</p></button>
                    </div>
                </div>
            </div>
        </>
    )
}
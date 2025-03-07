import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './jobsPage.module.scss';
import right_arrowG from './img/chevronRight.svg';

import Header from '../header/header';
import Footer from '../footer/footer';
import JobsCards from './jobsCards';

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/jobs")  
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error("Ошибка загрузки вакансий:", error));
    }, []);

    return (
        <>
            <Header/>
            <main className={classes.main_jobs_Page}>
                <section className={classes.sect_title}>
                    <div className={classes.cont_return_link}>
                        <Link className={classes.return_link} to="/">Главная</Link>
                        <img src={right_arrowG} alt="" />
                        <p>Вакансии</p>
                    </div>
                    <h1>Вакансии</h1>
                </section>

                <section className={classes.sect_cards}>
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <JobsCards
                                key={job.id}
                                postName={job.postname}
                                post={job.post}
                                duties={job.duties}
                                conditions={job.conditions}
                            />
                        ))
                    ) : (
                        <p>Загрузка вакансий...</p>
                    )}
                </section>
            </main>
            <Footer/>
        </>
    );
}

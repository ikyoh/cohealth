import React from 'react'
import { NavLink } from 'react-router-dom'
import Pict1 from '../assets/svg/undraw_doctors_hwty.svg'
import Pict2 from '../assets/svg/undraw_process_re_gws7.svg'
import Pict3 from '../assets/svg/undraw_calendar_re_ki49.svg'
import FrontLayout from '../layouts/FrontLayout'

const Homepage = () => {

    const PageContent = () => {

        return (
            <>
                <div className='mt-12 mb-24 md:mt-0'>
                    <div className='container max-w-6xl text-2xl font-bold leading-relaxed'>
                        <p className='text-center'>
                            Cohealth vous accompagne dans la conception d’outils dédiés aux professionnels de santé.
                            Nous plaçons notre volonté de répondre aux attentes des praticiens et notre expérience dans le médical au service de vos projets.
                        </p>
                    </div>
                </div>
                <div className='container max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28'>
                    <div className='md:w-1/3 flex flex-col gap-5'>
                        <h1 className='uppercase'>Vous êtes professionnel de santé ?</h1>
                        <p className='text-3xl font-bold leading-tight'>
                            L’innovation et la collaboration pour tous
                        </p>
                        <p className='text-xl leading-tight'>
                            Quelle que soit la taille de votre structure nous saurons vous apporter des solutions efficientes et adaptées aux équipes thérapeutiques. Pour que chaque médecins, soignants et autres professionnels de santé puisse se concentrer sur l’essentiel, le patient.                        </p>
                    </div>
                    <div className=''>
                        <img src={Pict1} alt="React pict" className='w-[250px] md:w-[400px]' />
                    </div>
                </div>
                <div className='container flex justify-center py-16'>
                    <NavLink to='/registration'>
                        <button className="button-submit flex justify-center h-10 items-center w-36">
                            Je m'inscris !
                        </button>
                    </NavLink>
                </div>
                <div className='container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 my-24'>
                    <div className='order-last md:order-none'>
                        <img src={Pict2} alt="React pict" className='w-[250px] md:w-[400px]' />
                    </div>
                    <div className='md:w-1/3 flex flex-col gap-5'>
                        <h1 className='uppercase'>Coordination autour du patient</h1>
                        <p className='text-3xl font-bold leading-tight'>
                            Visez l’excellence pour les parcours patients
                        </p>
                        <p className='text-xl leading-tight'>
                        La coordination des soins est un enjeu majeur des prises en charge pluridisciplinaires. La communication et l’organisation sont les piliers d’un travail collaboratif réussi.                        </p>
                    </div>
                </div>
                <div className='container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 my-24'>
                    <div className='md:w-1/3 flex flex-col gap-5'>
                        <h1 className='uppercase'>Une activité maîtrisée</h1>
                        <p className='text-3xl font-bold leading-tight'>
                            Le numérique tout simplement
                        </p>
                        <p className='text-xl leading-tight'>
                            Parce qu’aujourd’hui le numérique est une évidence, nous souhaitons qu’il soit disponible pour tous et le plus simplement possible. Nos solutions à l’ergonomie soignée, pensées également pour un usage nomade et sécurisé sont hébergées en Suisse                        </p>
                    </div>
                    <div className='order-last md:order-none'>
                        <img src={Pict3} alt="React pict" className='w-[250px] md:w-[400px]' />
                    </div>
                </div>
                <div className='bg-action min-h-[300px] py-10'>
                    <div className="container max-w-4xl flex flex-col items-center gap-5 px-10 md:px-0">
                        <div className='text-3xl font-bold text-center'>
                            Contactez nous
                        </div>
                        <div className='h-1 mx-auto bg-white w-3/6 md:w-1/6 opacity-50 my-0 py-0 rounded-full'></div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium facilis rem tempora fugiat ad minus omnis fugit, officiis magni nihil eligendi dicta facere ducimus, optio, incidunt corporis quasi sint labore!
                        </p>
                        <div>infos@cohealth.ch</div>
                    </div>
                </div>




            </>
        )
    }

    return (
        <FrontLayout>
            <PageContent />
        </FrontLayout>
    )


}

export default Homepage
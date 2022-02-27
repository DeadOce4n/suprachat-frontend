import React from 'react'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Hero from '../components/Hero'
import Button from '../components/Button'

const NotFoundPage = () => {
  return (
    <>
      <Seo title='Oops! Página no encontrada 😔' />
      <section>
        <Container className='split'>
          <Hero>
            <h1 style={{ alignSelf: 'start' }}>Oops!</h1>
            <p>
              Lo sentimos, la página que buscas no existe{' '}
              <span role='img' aria-label='Pensive emoji'>
                😔
              </span>{' '}
              Pero no te desanimes, haz click en el botón de abajo para volver
              al inicio, o en cualquiera de los enlaces de la barra superior
              para ir a alguna otra página.
            </p>
            <Button onClick={() => navigate('/')} primary>
              Ir al inicio
            </Button>
          </Hero>
          <StaticImage
            src='../images/empty.webp'
            alt='Vacío'
            title='En esta página no hay nada | Imagen de sheetalmulay.com'
            placeholder='blurred'
          />
        </Container>
      </section>
    </>
  )
}

export default NotFoundPage

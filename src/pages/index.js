import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import AppContext from '../components/AppContext'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Hero from '../components/Hero'
import Button from '../components/Button'

const IndexPage = () => {
  const context = useContext(AppContext)
  return (
    <>
      <Seo
        title='Inicio'
        description='SupraChat es un chat gratis sin registro y en español para conocer personas de todo el mundo. Nuestro vicio es chatear.'
      />
      <section>
        <Container className='split'>
          <Hero>
            <h1>Chatea gratis con gente de todo el mundo</h1>
            <p>Totalmente gratis y sin registro. Para siempre! Pero si decides registrarte, podrás obtener grandes beneficios 👀</p>
            <div className='buttons'>
              {context.user.isAuthenticated
                ? null
                : <Button
                    primary
                    onClick={() => navigate('/registro')}
                  >
                  Registrarse
                  </Button>}
              <Button
                {...{ primary: context.user.isAuthenticated }}
                onClick={() => navigate('/chat')}
              >
                ¡Chatea ya!
              </Button>
            </div>
          </Hero>
          <StaticImage
            src='../images/astronaut.webp'
            alt='Astronauta flotando'
            title='Astronauta flotando'
            placeholder='blurred'
            objectFit='scale-down'
          />
        </Container>
      </section>
    </>
  )
}

export default IndexPage

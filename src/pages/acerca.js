import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Seo from '../components/Seo'
import Container from '../components/Container'

const TeamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  @media only screen and (min-width: 40em) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const MemberCard = styled.div`
  max-width: 300px;
  color: var(--color-bg-${props => props.theme.theme});
  background-color: var(--color-fg-accent-${props => props.theme.theme});
  border-radius: 15px;
  .gatsby-image-wrapper {
    border-radius: 15px;
    margin: 4rem 4rem 0;
  }
`

const MemberInfo = styled.div`
  font: 400 1em var(--font-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 3rem 4rem;
  .nick { font: 700 1em var(--font-secondary); }
  .email { font: 400 1em var(--font-mono); }
`

const AcercaPage = () => {
  return (
    <>
      <Seo
        title='Acerca de SupraChat'
        description='SupraChat es un chat IRC gratuito y sin registro obligatorio donde puedes entrar a platicar con personas de todo el mundo sobre cualquier cosa que te imagines.'
      />
      <section>
        <Container className='narrow'>
          <h1>Acerca de SupraChat</h1>
          <p>
            SupraChat es un chat IRC gratuito y sin registro obligatorio donde
            puedes entrar a platicar con personas de todo el mundo sobre
            cualquier cosa que te imagines.
          </p>
          <p>
            Quién sabe, quizá el amor que tanto has buscado te está esperando
            aquí 🥰, no lo sabrás si no entras a <Link to='/chat'>chatear</Link>{' '}
            justo ahora 👀.
          </p>
          <h2>Conoce a nuestro equipo</h2>
          <TeamContainer>
            <MemberCard>
              <StaticImage
                src='../images/deadocean.png'
                alt='DeadOcean: Administrador del servidor'
                placeholder='blurred'
              />
              <MemberInfo>
                <span className='nick'>DeadOcean</span>
                <span>Administrador</span>
                <span className='email'>admin@suprachat.net</span>
              </MemberInfo>
            </MemberCard>
            <MemberCard>
              <StaticImage
                src='../images/gusy.jpeg'
                alt='Gusy: Operadora del servidor'
                placeholder='blurred'
              />
              <MemberInfo>
                <span className='nick'>Gusy</span>
                <span>Operadora</span>
                <span className='email'>gusy@suprachat.net</span>
              </MemberInfo>
            </MemberCard>
            <MemberCard>
              <StaticImage
                src='../images/aldo.jpeg'
                alt='Rey: Operador del servidor'
                layout='constrained'
                placeholder='blurred'
              />
              <MemberInfo>
                <span className='nick'>Rey</span>
                <span>Operador</span>
                <span className='email'>rey@suprachat.net</span>
              </MemberInfo>
            </MemberCard>
          </TeamContainer>
          <p>
            Siéntete con la confianza de contactar a cualquiera de ellos si
            tienes algun problema o inquietud acerca del chat, ellos harán todo
            lo que puedan para ayudarte!
          </p>
        </Container>
      </section>
    </>
  )
}

export default AcercaPage

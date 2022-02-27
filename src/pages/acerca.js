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
  padding: 4rem 3rem;
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
                <span>DeadOcean</span>
                <span>Administrador</span>
                <span>admin@suprachat.net</span>
              </MemberInfo>
            </MemberCard>
            <MemberCard>
              <StaticImage
                src='../images/gusy.jpeg'
                alt='Gusy: Operadora del servidor'
                placeholder='blurred'
              />
              <MemberInfo>
                <span>Gusy</span>
                <span>Operadora</span>
                <span>gusy@suprachat.net</span>
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
                <span>Rey</span>
                <span>Operador</span>
                <span>rey@suprachat.net</span>
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

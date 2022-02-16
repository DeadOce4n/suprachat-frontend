import React from 'react'
import Seo from '../components/Seo'
import Container from '../components/Container'

const ReglasPage = () => {
  return (
    <>
      <Seo
        title='Reglamento del chat'
        description='Reglamento de SupraChat, el mejor chat en español gratis y sin registro.'
      />
      <section>
        <Container className='narrow'>
          <h1>Reglamento del chat</h1>
          <p>
            A continuación te mostramos el reglamento del servidor, estas reglas
            aplican globalmente a todas las actividades que se realicen en
            SupraChat. Los operadores de salas, además de hacer cumplir sus
            propios reglamentos internos, deben hacer cumplir también este
            reglamento.
          </p>
          <h2>1. Tratar a todos con respeto</h2>
          <h2>
            2. Evitar el uso de nicks inapropiados en salas donde no esté
            explícitamente permitido
          </h2>
          <h2>3. Está estrictamente prohibido hacer spam de otros chats</h2>
          <h2>
            4. De igual manera, está estrictamente prohibido hacer spam de este
            chat en otros chats
          </h2>
          <h2>
            5. Se sancionará a todo aquel que inunde las salas con mensajes
            repetitivos y molestos
          </h2>
          <h2>
            6. Está estrictamente prohibido enviar contenido inapropiado en
            salas donde no esté explícitamente permitido
          </h2>
          <h2>
            7. Sumado a la regla anterior, compartir contenido ilegal será
            sancionado con expulsión permanente y denuncia policíaca
          </h2>
          <h2>
            8. En caso de sufrir acoso de parte de otro usuario es necesario
            acudir directamente con los operadores del servidor con pruebas en
            mano
          </h2>
          <h2>
            9. Cada sala tiene su temática, evita hacer comentarios fuera de
            lugar y/o arruinar el ambiente
          </h2>
        </Container>
      </section>
    </>
  )
}

export default ReglasPage

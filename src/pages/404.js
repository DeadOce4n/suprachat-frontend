import React from 'react'
import { navigate } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage = () => {
  return (
    <container>
      <div className='container'>
        <div className='split'>
          <div className='hero notfound'>
            <div className='hero-text'>
              <h1>Oops!</h1>
              <p>
                Lo sentimos, la página que buscas no existe{' '}
                <span role='img' aria-label='Pensive emoji'>
                  😔
                </span>{' '}
                Pero no te desanimes, haz click en el botón de abajo para volver
                al inicio, o en cualquiera de los enlaces de la barra superior
                para ir a alguna otra página.
              </p>
              <button
                onClick={() => navigate('/')}
                style={{ width: '100%', textAlign: 'center' }}
              >
                Ir al inicio
              </button>
            </div>
          </div>
          <div className='img-container'>
            <StaticImage
              src='../images/empty.jpeg'
              alt='Vacío'
              title='En esta página no hay nada'
              placeholder='blurred'
            />
          </div>
        </div>
      </div>
    </container>
  )
}

export default NotFoundPage

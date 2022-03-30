import React, { useContext, useState, useEffect, useRef } from 'react'
import { navigate } from 'gatsby'
import { useForm } from 'react-hook-form'
import AppContext from './AppContext'
import styled from 'styled-components'
import Container from './Container'
import Form, { Select } from './form/Form'
import Button from './Button'
import Icofont from './Icofont'
import userService from '../services/user'
import Seo from './Seo'
import storageAvailable from '../utils/storageAvailable'

const countries = [
  'Albania',
  'Alemania',
  'Andorra',
  'Angola',
  'Antigua y Barbuda',
  'Arabia Saudita',
  'Argelia',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaiyán',
  'Bahamas',
  'Bahrein',
  'Bangladesh',
  'Barbados',
  'Belarús',
  'Belice',
  'Benin',
  'Bhután',
  'Bolivia',
  'Bosnia y Herzegovina',
  'Botswana',
  'Brasil',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Bélgica',
  'Cabo Verde',
  'Camboya',
  'Camerún',
  'Canadá',
  'Chad',
  'Chequia',
  'Chile',
  'China',
  'Chipre',
  'Colombia',
  'Comoras',
  'Congo',
  'Corea del Norte',
  'Corea del Sur',
  'Costa Rica',
  'Croacia',
  'Cuba',
  "Côte d'Ivoire",
  'Dinamarca',
  'Djibouti',
  'Dominica',
  'Ecuador',
  'Egipto',
  'El Salvador',
  'Emiratos Árabes Unidos',
  'Eritrea',
  'Eslovaquia',
  'Eslovenia',
  'España',
  'Estados Unidos',
  'Estonia',
  'Eswatini',
  'Etiopía',
  'Fiji',
  'Filipinas',
  'Finlandia',
  'Francia',
  'Gabón',
  'Gambia',
  'Georgia',
  'Ghana',
  'Granada',
  'Grecia',
  'Guatemala',
  'Guinea',
  'Guinea Ecuatorial',
  'Guinea-Bissau',
  'Guyana',
  'Haití',
  'Honduras',
  'Hungría',
  'India',
  'Indonesia',
  'Iraq',
  'Irlanda',
  'Irán',
  'Islandia',
  'Islas Cook',
  'Islas Feroe',
  'Islas Marshall',
  'Islas Salomón',
  'Israel',
  'Italia',
  'Jamaica',
  'Japón',
  'Jordania',
  'Kazajstán',
  'Kenya',
  'Kirguistán',
  'Kiribati',
  'Kuwait',
  'Laos',
  'Lesotho',
  'Letonia',
  'Liberia',
  'Libia',
  'Lituania',
  'Luxemburgo',
  'Líbano',
  'Macedonia del Norte',
  'Madagascar',
  'Malasia',
  'Malawi',
  'Maldivas',
  'Malta',
  'Malí',
  'Marruecos',
  'Mauricio',
  'Mauritania',
  'Micronesia',
  'Mongolia',
  'Montenegro',
  'Mozambique',
  'Myanmar',
  'México',
  'Moldavia',
  'Mónaco',
  'Namibia',
  'Nauru',
  'Nepal',
  'Nicaragua',
  'Nigeria',
  'Niue',
  'Noruega',
  'Nueva Zelandia',
  'Níger',
  'Omán',
  'Pakistán',
  'Palau',
  'Panamá',
  'Papua Nueva Guinea',
  'Paraguay',
  'Países Bajos',
  'Perú',
  'Polonia',
  'Portugal',
  'Qatar',
  'Reino Unido',
  'República Centroafricana',
  'República Democrática del Congo',
  'República Dominicana',
  'Rumania',
  'Russia',
  'Rwanda',
  'Saint Kitts y Nevis',
  'Samoa',
  'San Marino',
  'San Vicente y las Granadinas',
  'Santa Lucía',
  'Santo Tomé y Príncipe',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leona',
  'Singapur',
  'Siria',
  'Somalia',
  'Sri Lanka',
  'Sudáfrica',
  'Sudán',
  'Sudán del Sur',
  'Suecia',
  'Suiza',
  'Surinam',
  'Tailandia',
  'Tanzania',
  'Tayikistán',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad y Tabago',
  'Turkmenistán',
  'Turquía',
  'Tuvalu',
  'Túnez',
  'Ucrania',
  'Uganda',
  'Uruguay',
  'Uzbekistán',
  'Vanuatu',
  'Venezuela',
  'Viet Nam',
  'Yemen',
  'Zambia',
  'Zimbabwe'
]

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  margin-top: 2rem;
  & > *:last-child {
    max-width: 60rem;
    margin-right: auto;
  }
  @media only screen and (min-width: 40em) {
    flex-direction: row;
  }
`

const UserAvatar = styled.div`
  position: relative;
  width: 100%;
  align-self: center;
  img {
    overflow: hidden;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 7px solid var(--color-fg-${props => props.theme.theme});
    pointer-events: none;
  }
  .update-picture {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: var(--color-fg-accent-${props => props.theme.theme});
    color: var(--color-bg-${props => props.theme.theme});
    font-size: 44px;
    cursor: pointer;
    &:active {
      transform: scale(0.95);
    }
  }
`

const UserInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  h1 {
    text-align: center;
  }
  @media only screen and (min-width: 40em) {
    max-width: 25rem;
    padding-right: 2rem;
  }
`

const Settings = () => {
  const baseUrl = process.env.GATSBY_API_URL

  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    setValue: setInfoValue,
    watch: watchInfo,
    formState: { errors: errorsInfo }
  } = useForm({
    defaultValues: {
      country: countries[Math.floor(Math.random() * (countries.length - 1))],
      about: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const {
    register: registerPicture,
    handleSubmit: handleSubmitPicture,
    setValue: setPictureValue
  } = useForm({
    defaultValues: {
      picture: null
    }
  })

  const password = useRef({})
  password.current = watchInfo('password')

  const passwordsAreEqual = value => value === password.current || 'Las contraseñas no coinciden.'

  const { user, setUser, setNotification } = useContext(AppContext)
  const [pictureUrl, setPictureUrl] = useState(null)

  useEffect(() => {
    if (userService.isLoggedIn()) {
      const user = userService.getStoredUser()
      setUser(user)
      if (user.country) { setInfoValue('country', user.country) }
      if (user.about) { setInfoValue('about', user.about) }
      setPictureUrl(`${baseUrl}/users/${user.nick}/picture`)
    } else {
      navigate('/app/login')
    }
  }, [])

  const onSubmitInfo = async data => {
    const formData = {
      country: data.country,
      about: data.about
    }
    if (data.password.length > 0) {
      formData.password = data.password
    }
    const { token, nick } = user
    try {
      const response = await userService.update(nick, formData, token)
      if (response.error) {
        throw new Error(response.error)
      }
      setInfoValue('password', '')
      setInfoValue('passwordConfirm', '')
      const updatedUser = { ...user, ...response }
      setUser(updatedUser)
      if (storageAvailable('localStorage')) {
        localStorage.setItem('storedUser', JSON.stringify(updatedUser))
      }
      setNotification({
        message: 'Cambios guardados correctamente 🎉',
        error: false
      })
    } catch (e) {
      setNotification({ message: 'Error al guardar los cambios 😔', error: true })
    }
    setTimeout(() => {
      setNotification({ message: '', error: false })
    }, 3000)
  }

  const onSubmitPicture = async data => {
    try {
      const { token, nick } = user
      const picture = data.picture[0]
      const formData = new FormData()
      formData.append('file', picture)
      await userService.updatePicture(formData, nick, token)
      setPictureUrl(URL.createObjectURL(picture))
      setNotification({
        message: 'Imagen actualizada correctamente 🎉',
        error: false
      })
    } catch (e) {
      setNotification({ message: 'Error al subir imagen 😔', error: true })
    }
    setTimeout(() => {
      setNotification({ message: '', error: false })
    }, 3000)
    setPictureValue(null)
  }

  const onPictureChange = event => {
    if (event.target.files.length > 0) {
      handleSubmitPicture(onSubmitPicture)()
    }
  }

  return (
    <>
      <Seo title={`Editar perfil: ${user.nick}`} />
      <section>
        <Container>
          <UserContainer>
            <UserInfo>
              <UserAvatar>
                <img
                  src={pictureUrl}
                  alt={user.nick}
                />
                <Form>
                  <label htmlFor='upload-picture' className='file-input'>
                    <div className='update-picture'>
                      <Icofont className='icofont-ui-camera' />
                    </div>
                  </label>
                  <input
                    id='upload-picture'
                    type='file'
                    accept='image/*'
                    {...registerPicture('picture', {
                      onChange: onPictureChange,
                      validate: {
                        justOne: selected => selected?.length === 1 || 'No se ha seleccionado imagen.',
                        fileSize: selected => selected[0]?.size <= 3000000 || 'Imagen demasiado grande.'
                      }
                    })}
                  />
                </Form>
              </UserAvatar>
              <h1>{user.nick}</h1>
            </UserInfo>
            <Form onSubmit={handleSubmitInfo(onSubmitInfo)}>
              <Select
                label='¿De qué país eres?'
                {...registerInfo('country')}
              >
                {countries.map(country => (
                  <option key={country}>{country}</option>
                ))}
              </Select>
              <label htmlFor='about'>Cuéntanos más sobre ti:</label>
              <textarea rows='3' maxLength='300' {...registerInfo('about')} />
              <label htmlFor='password'>Nueva contraseña:</label>
              <input type='password' {...registerInfo('password', { minLength: { value: 8, message: 'Deben ser 8 caracteres o más.' } })} />
              {errorsInfo.password && <span className='error'>{errorsInfo.password.message || 'Este campo es obligatorio.'}</span>}
              <label htmlFor='passwordConfirm'>Confirmar contraseña:</label>
              <input type='password' {...registerInfo('passwordConfirm', { validate: v => passwordsAreEqual(v) })} />
              {errorsInfo.passwordConfirm && <span className='error'>{errorsInfo.passwordConfirm.message || null}</span>}
              <Button type='submit' primary>
                Guardar cambios
              </Button>
            </Form>
          </UserContainer>
        </Container>
      </section>
    </>
  )
}

export default Settings

import React from 'react'
import Seo from '../components/Seo'
import Container from '../components/Container'

const ManualPage = () => {
  return (
    <>
      <Seo
        title='Manual de usuario'
        description='Manual de usuario de SupraChat, el mejor chat en español gratis y sin registro.'
      />
      <section>
        <Container className='narrow'>
          <h1>Manual de usuario de SupraChat</h1>
          <p>
            Ya que SupraChat es un chat del tipo <strong>IRC</strong>, muchas de
            las funciones se realizan a través de comandos, todos ellos (menos
            los del <a href='#bot'>bot</a>) comienzan con una
            <code>/</code>. Para enviar un comando simplemente se envía como
            cualquier otro mensaje en el chat.
          </p>
          <h2>Índice</h2>
          <ul className='compact'>
            <li>
              <a href='#comandos-basicos'>Comandos básicos</a>
            </li>
            <li>
              <a href='#registrar-nicks'>Registrar nicks</a>
            </li>
            <li>
              <a href='#registrar-salas'>Registrar salas</a>
            </li>
            <li>
              <a href='#privilegios'>Privilegios</a>
            </li>
            <li>
              <a href='#bot'>Bot de moderación: SupraBot</a>
            </li>
            <li>
              <a href='#entrar-por-fuera'>Entrar por fuera de la web</a>
            </li>
          </ul>
          <h2 id='comandos-basicos'>Comandos básicos</h2>
          <p>
            A continuación se muestran algunos de los comandos básicos y sus
            funciones:
          </p>
          <ul>
            <li>
              <code>/nick</code>: con este comando puedes cambiar tu nick a
              algún otro que no esté en uso.
              <strong>OJO</strong>: este comando solamente puede ser utilizado
              por usuarios registrados.
              <br />
              <span className='example'>
                Ejemplo: <code>/nick DeadOcean</code>
              </span>
            </li>
            <li>
              <code>/join</code>: con este comando te puedes unir a una sala en
              la que aún no estés.
              <br />
              <span className='example'>
                Ejemplo: <code>/join #radionautica</code>
              </span>
            </li>
            <li>
              <code>/part</code>: con este comando te sales de la sala que
              actualmente estás mirando.
              <br />
              <span className='example'>
                Ejemplo: <code>/part #radionautica</code>
              </span>
            </li>
            <li>
              <code>/query</code>: con este comando puedes abrir una
              conversación privada con otro usuario.
              <br />
              <span className='example'>
                Ejemplo: <code>/query DeadOcean</code>
              </span>
            </li>
          </ul>
        </Container>
      </section>
      <section>
        <Container className='narrow'>
          <h2 id='registrar-nicks'>Registrar nicks</h2>
          <p>
            Si quieres que nadie más pueda usar tu nick, puedes registrarlo con
            el siguiente comando:
          </p>
          <pre>
            <code>
              /ns register &lt;nick&gt; &lt;contraseña&gt; &lt;correo&gt;
            </code>
          </pre>
          <p>Por ejemplo:</p>
          <pre>
            <code>/ns register DeadOcean pass123 admin@suprachat.net</code>
          </pre>
          <p>
            Por favor, evita registrar varios nicks con varios correos
            distintos, de ser descubierto se darán de baja TODAS las cuentas
            asociadas. En su lugar, puedes <strong>agrupar</strong>
            varios nicks a tu cuenta para que puedas cambiar entre ellos cuando
            quieras; para ello simplemente te pones el nick que quieres agrupar
            (por ejemplo <code>/nick DeadOcean</code>) y luego escribes el
            siguiente comando:
          </p>
          <pre>
            <code>/ns group</code>
          </pre>
        </Container>
      </section>
      <section>
        <Container className='narrow'>
          <h2 id='registrar-salas'>Registrar salas</h2>
          <p>
            Registrar una sala te otorga el beneficio de que solamente tú y tu
            gente de confianza puedan administrarlo, los únicos requisitos son:
            tener un nick registrado, que nadie haya registrado antes esa sala,
            y que tengas <a href='#privilegios'>privilegios</a> de operador en
            la sala. Se hace con el siguiente comando:
          </p>
          <pre>
            <code>/cs register &lt;sala&gt;</code>
          </pre>
          <span className='example'>
            Ejemplo: <code>/cs register #radionautica</code>
          </span>
          <p>
            Una vez que hayas registrado tu sala, puedes otorgar privilegios
            administrativos a cualquier usuario que sea de tu confianza. En la
            siguiente sección se describen los distintos modos (privilegios) que
            existen y cómo otorgarlos, ya sea de manera temporal o permanente.
          </p>
        </Container>
      </section>
      <section>
        <Container className='narrow'>
          <h2 id='privilegios'>Privilegios</h2>
          <p>
            Los usuarios de una sala pueden tener distintos privilegios, los
            cuales se representan con un símbolo delante de su nick. A
            continuación se explica cada símbolo y su significado.
          </p>
          <ul>
            <li>
              <code>+</code>: este símbolo significa que el usuario tiene{' '}
              <strong>voz</strong> en la sala. Por ejemplo, si{' '}
              <code>+DeadOcean</code> está en la sala, significa que{' '}
              <code>DeadOcean</code>
              tiene <strong>voz</strong> en dicha sala. Los usuarios con{' '}
              <strong>voz</strong> pueden hablar en las salas moderadas. Este
              privilegio se otorga con el modo <strong>+v</strong>.
            </li>
            <li>
              <code>%</code>: este símbolo significa que el usuario es un{' '}
              <em>halfop</em> (semi-operador) de la sala. Por ejemplo, si{' '}
              <code>%DeadOcean</code> está en la sala, significa que{' '}
              <code>DeadOcean</code>
              es un <em>halfop</em> en dicha sala. Los usuarios con este símbolo
              pueden <em>kickear</em> (sacar de la sala) a otros usuarios, pero
              no pueden <em>bannearlos</em> (vetarlos), además pueden otorgar
              <strong>voz</strong> a otros usuarios. Este privilegio se otorga
              con el modo <strong>+h</strong>.
            </li>
            <li>
              <code>@</code>: este símbolo significa que el usuario es un{' '}
              <strong>operador</strong> de la sala. Por ejemplo, si{' '}
              <code>@DeadOcean</code> está en la sala, significa que{' '}
              <code>DeadOcean</code>
              es un <strong>operador</strong> de dicha sala. Los{' '}
              <strong>operadores</strong> pueden cambiar todos los modos de la
              sala, <em>bannear/kickear</em> usuarios y dar/quitar privilegios
              de operador a otros usuarios en la sala. Este privilegio se otorga
              con el modo <strong>+o</strong>.
            </li>
            <li>
              <code>&amp;</code>: este símbolo significa que el usuario es un{' '}
              <strong>administrador</strong> de la sala. Por ejemplo, si{' '}
              <code>&amp;DeadOcean</code> está en la sala, significa que{' '}
              <code>DeadOcean</code>
              es un <strong>administrador</strong> de la sala. Los{' '}
              <strong>administradores</strong> son iguales a los{' '}
              <strong>operadores</strong>, pero los{' '}
              <strong>operadores (@)</strong> no pueden <em>kickear</em>
              ni quitar sus privilegios a los <strong>administradores</strong>.
              Este privilegio se otorga con el modo <strong>+a</strong>.
            </li>
            <li>
              <code>~</code>: este símbolo significa que el usuario es un{' '}
              <strong>fundador</strong> de la sala. Por ejemplo, si{' '}
              <code>~DeadOcean</code> está en la sala, significa que{' '}
              <code>DeadOcean</code> es un <strong>fundador</strong> de la sala.
              Los <strong>fundadores</strong> tienen control administrativo
              total de la sala, pueden realizar cualquier acción y modificar los
              privilegios del resto de usuarios en la sala. Este privilegio se
              otorga con el modo <strong>+q</strong>.
            </li>
          </ul>
          <h3>Privilegios temporales</h3>
          <p>
            Para otorgar permisos temporales en una sala en la que tienes acceso
            administrativos es tan fácil como correr el siguiente comando:
          </p>
          <pre>
            <code>/mode &lt;sala&gt; &lt;modo&gt; &lt;nick&gt;</code>
          </pre>
          <span className='example'>
            Ejemplo: <code>/mode #radionautica +o DeadOcean</code>
          </span>
          <h3>Privilegios permanentes</h3>
          <p>
            Otorgar privilegios es igual de sencillo, y esto le permitirá a tus
            usuarios de confianza obtener privilegios automáticamente al entrar
            a la sala, sin necesidad de que lo hagas manualmente cada vez que
            entren. Se hace con el siguiente comando:
          </p>
          <pre>
            <code>/cs amode &lt;sala&gt; &lt;modo&gt; &lt;nick&gt;</code>
          </pre>
          <span className='example'>
            Ejemplo: <code>/cs amode #radionautica +a DeadOcean</code>
          </span>
        </Container>
      </section>
      <section>
        <Container className='narrow'>
          <h2 id='bot'>Bot de moderación: SupraBot</h2>
          <p>
            SupraChat cuenta con un bot de moderación con varias funciones
            interesantes: si eres <strong>&</strong>o mayor en una sala, puedes
            invitarlo a la sala y activar las funciones que desees usar en dicha
            sala.
            <strong>OJO</strong>, los comandos del bot comienzan con{' '}
            <code>!</code>, no con <code>/</code>. Las funciones del bot son las
            siguientes:
          </p>
          <h3>Moderación de palabras</h3>
          <p>
            Si esta función está activada, los usuarios <strong>&</strong> o
            superiores podrán agregar palabras a la lista negra, y si algún
            usuario dice alguna palabra que se encuentre en la lista, SupraBot
            le
            <em>muteará</em> durante dos minutos, es decir, el usuario no podrá
            hablar durante dos minutos. Los comandos de esta función son los
            siguientes:
          </p>
          <ul>
            <li>
              <code>!bw activar</code>: con este comando se activa la moderación
              de palabras en la sala.
            </li>
            <li>
              <code>!bw mostrar</code>: con este comando se muestra en la sala
              la lista de palabras prohibidas.
            </li>
            <li>
              <code>!bw agregar &lt;palabra&gt;</code>: con este comando se
              agrega una palabra a la lista negra de la sala.
              <br />
              <span className='example'>
                Ejemplo: <code>!bw agregar menso</code>
              </span>
            </li>
            <li>
              <code>!bw borrar &lt;palabra&gt;</code>: con este comando se borra
              la palabra indicada de la lista negra de la sala.
              <br />
              <span className='example'>
                Ejemplo: <code>!bw borrar bobo</code>
              </span>
            </li>
            <li>
              <code>!bw desactivar</code>: con este comando se desactiva la
              moderación de nicks en la sala.
            </li>
          </ul>
          <h3>Moderación de nicks</h3>
          <p>
            Si esta función está activada, los usuarios <strong>&</strong> o
            superiores podrán agregar nicks a la lista negra, y si un usuario
            con uno de los nicks prohibidos entra a la sala, SupraBot lo
            <em>kickeará</em> automáticamente, es decir, el usuario no podrá
            entrar a la sala hasta que se coloque un nick que no se encuentre en
            la lista negra de esa sala. Incluso si un usuario que ya se
            encuentra dentro de la sala se cambia el nick a uno que se
            encuentrae en la lista, SupraBot también lo <em>kickeará</em>. Los
            comandos de esta función son los siguientes:
          </p>
          <ul>
            <li>
              <code>!bn activar</code>: con este comando se activa la moderación
              de nicks en la sala.
            </li>
            <li>
              <code>!bn mostrar</code>: con este comando se muestra en la sala
              la lista de nicks prohibidos.
            </li>
            <li>
              <code>!bn agregar &lt;nick&gt;</code>: con este comando se agrega
              un nick a la lista negra de la sala.
              <br />
              <span className='example'>
                Ejemplo: <code>!bn agregar DeadOcean</code>
              </span>
            </li>
            <li>
              <code>!bn borrar</code>: con este comando se borra el nick
              indicado de la lista negra de la sala.
              <br />
              <span className='example'>
                Ejemplo: <code>!bn borrar DeadOcean</code>
              </span>
            </li>
            <li>
              <code>!bn desactivar</code>: con este comando se desactiva la
              moderación de nicks en la sala.
            </li>
          </ul>
          <h3>Gestión de reglamento de sala</h3>
          <p>
            SupraBot también tiene la capacidad de almacenar el reglamento de tu
            sala registrada y mostrarlo a los usuarios cuando estos lo
            requieran. Es posible agregar, modificar y borrar las reglas y no
            hay límite de reglas que se pueden agregar. Los comandos de esta
            función son los siguientes:
          </p>
          <ul>
            <li>
              <code>!rg activar</code>: con este comando se activa la gestión de
              reglamento en la sala.
            </li>
            <li>
              <code>!rg mostrar</code>: con este comando se envían las reglas de
              la sala al usuario por mensaje privado.
            </li>
            <li>
              <code>!rg agregar &lt;número&gt; &lt;descripción&gt;</code>: con
              este comando se agrega una regla al reglamento de la sala. Nótese
              que es <strong>obligatorio</strong> indicar el número de regla.
              <br />
              <span className='example'>
                Ejemplo: <code>!rg agregar 1 Respetar a todos por igual.</code>
              </span>
            </li>
            <li>
              <code>!rg modificar &lt;número&gt; &lt;descripción&gt;</code>: con
              este comando se puede modificar la descripción de la regla
              indicada. Es necesario que exista una regla con el número indicado
              para poder modificarla.
              <br />
              <span className='example'>
                Ejemplo:{' '}
                <code>!rg modificar 1 No causar molestias a los usuarios.</code>
              </span>
            </li>
            <li>
              <code>!rg borrar &lt;número&gt;</code>: con este comando se puede
              borrar la regla indicada. Una vez borrada, es imposible recuperar
              esa regla, por lo que se tendrá que crear de nuevo.
              <br />
              <span className='example'>
                Ejemplo: <code>!rg borrar 1</code>
              </span>
            </li>
          </ul>
        </Container>
      </section>
      <section>
        <Container className='narrow'>
          <h2 id='entrar-por-fuera'>Entrar por fuera de la web</h2>
          <p>
            Algunas personas prefieren usar su propio cliente IRC en lugar de
            entrar siempre por la web, así que aquí les dejamos los datos
            necesarios para conectarse:
          </p>
          <ul className='compact'>
            <li>
              Servidor: <code>irc.vicio.chat</code>
            </li>
            <li>
              Puerto: <code>6697</code>
            </li>
            <li>
              Conexión segura/SSL: <code>True</code>
            </li>
            <li>
              Método de autenticación: <code>SASL</code>
            </li>
          </ul>
          <p>
            Recomendamos encarecidamente el método de autenticación{' '}
            <code>SASL</code> en lugar del viejo
            <code>NickServ</code>, ya que con <code>SASL</code> podrás
            conectarte desde varios dispositivos al mismo tiempo, siempre y
            cuando utilices la misma cuenta en todos ellos 😉.
          </p>
        </Container>
      </section>
    </>
  )
}

export default ManualPage

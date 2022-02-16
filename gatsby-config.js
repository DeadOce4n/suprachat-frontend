require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    siteUrl: 'https://suprachat.net',
    url: 'https://suprachat.net',
    titleTemplate: '%s | SupraChat: nuestro vicio es chatear 💬',
    description:
      'SupraChat es un chat gratis sin registro y en español para conocer personas de todo el mundo. Nuestro vicio es chatear.',
    image: '/astronaut.webp'
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SupraChat',
        short_name: 'SupraChat',
        start_url: '/',
        background_color: '#001233',
        theme_color: '#ffe66d',
        display: 'standalone',
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    }
  ]
}

import autoprefixer from 'autoprefixer';
module.exports = {
  siteMetadata: {
    title: `Ghulam Hussain`,
    subtitle: `Full Stack Developer`
  },
  plugins: [
    {
      // Pull wordpress content from API
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'dfjames.press',
        protocol: 'https',
        hostingWPCOM: false,
        useACF: true,
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems
        verboseOutput: false
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Ghulam Hussain - Full Stack Developer',
        short_name: 'Ghulam Hussain',
        start_url: '/',
        background_color: '#111111',
        theme_color: '#111111',
        display: 'minimal-ui'
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/images/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-NDXSQ5N',
        includeInDevelopment: false
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `tomato`,
        // Disable the loading spinner.
        showSpinner: true
      }
    },
    {
      // Does both SASS
      resolve: `gatsby-plugin-postcss-sass`,
      options: {
        postCssPlugins: [
          autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })
        ]
      }
    }
  ]
};

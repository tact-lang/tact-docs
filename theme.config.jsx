export default {
    logo: <span>TACT Documentation</span>,
    defaultTheme: 'dark',
    project: {
        link: 'https://github.com/ton-community/tact',
    },
    feedback: {
        content: null
    },
    footer: {
        text: <span>
          MIT {new Date().getFullYear()} © <a href="https://github.com/ton-community" target="_blank">TON Community</a>.
        </span>,
      },
      useNextSeoProps() {
          return {
            titleTemplate: '%s – TACT'
          }
      },
}
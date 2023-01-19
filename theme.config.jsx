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
  head: () => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta
        name="description"
        content="TACT Language Documentation"
      />

      <meta
        name="og:title"
        content="TACT Language Documentation"
      />
      <meta
        name="og:description"
        content="Language reference and guides for TACT"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ex3ndr"></meta>

      <meta name="apple-mobile-web-app-title" content="TACT" />

      <script
        lang="javascript"
        dangerouslySetInnerHTML={{
          __html: `if (!window.localStorage.getItem("theme_default")) {
            window.localStorage.setItem("theme", "dark");
            window.localStorage.setItem("theme_default", "dark");
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
          }`,
        }}
      />;
    </>
  )
}
export default {
  logo: <span>lawson.</span>,
  docsRepositoryBase: "https://github.com/Farbyte/lawson/tree/main/",
  project: {
    link: "https://github.com/Farbyte/lawson",
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Lawson.'
    }
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://law-son.vercel.app" target="_blank">
          lawson.
        </a>
      </span>
    )
  },
  faviconGlyph: "⚖️",  
};

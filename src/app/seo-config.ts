import { DefaultSeoProps } from 'next-seo';

const defaultSEOConfig: DefaultSeoProps = {
    titleTemplate: '%s | Augustin Verissimo',
    defaultTitle: 'Augustin Verissimo - Portfolio',
    description: "En recherche d'une alternance pour septembre 2025 en tant que développeur web. ",
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://www.augustin-verissimo.fr/',
        siteName: 'Augustin Verissimo',
        profile: {
            firstName: 'Augustin',
            lastName: 'Verissimo',
            username: 'augustinverissimo',
        },
    },
    additionalLinkTags: [
        {
            rel: 'me',
            href: 'https://github.com/gus5900000',
        },
        {
            rel: 'me',
            href: 'https://www.linkedin.com/in/augustin-verissimo-a48b95231/',
        },
    ],
};

export default defaultSEOConfig;
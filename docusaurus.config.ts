import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


function removeUnlistedRawItems(items) {
  return items.filter(item => {
    const frontMatter: object = item.frontMatter;
    if(!frontMatter)return true;
    if(!("unlisted" in frontMatter))return true;

    if(frontMatter.unlisted === true)return false;
  })
}

// TODO: you'd have to recursively search pages and categories for each category that is unlisted
//        for now, you have to set all subcategories and subpages with `unlisted: true`
function removeUnlistedRawCategories(categories) {
  Object.keys(categories).forEach(category => {
    const customProps: object = categories[category].customProps;
    if(!customProps)return;
    if(!("unlisted" in customProps))return;
    if(customProps.unlisted === true)delete categories[category];
  });
}

const config: Config = {
  title: 'IPW CloudOps',
  tagline: 'Kubernetes > All',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ipw-cloudops.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'IPW-CloudOps', // Usually your GitHub org/user name.
  projectName: 'course', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator: async ({ defaultSidebarItemsGenerator, ...args }) => {
            removeUnlistedRawCategories(args.categoriesMetadata);
            args.docs = removeUnlistedRawItems(args.docs);
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sidebarItems;
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/IPW-CloudOps/course/tree/master/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/k8s_logo.jpg',
    navbar: {
      title: 'IPW CloudOps',
      logo: {
        alt: 'IPW CloudOps',
        src: 'img/k8s_logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/IPW-CloudOps/course',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/category/overview',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'Twitter',
        //       href: 'https://twitter.com/docusaurus',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} IPW CloudOps, Built with Docusaurus.</br>Disclaimer:</br>The Kubernetes logo is property of The Linux Foundation. Its use here is for educational purposes only and does not imply affiliation or endorsement. This course is an independent resource, not certified or officially associated with Kubernetes. We claim no ownership over the Kubernetes logo or name. For official information, visit kubernetes.io.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash"]
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
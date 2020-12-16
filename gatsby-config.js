module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Inter"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [require(`tailwindcss`)(`./tailwind.config.js`)],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: { tailwind: true },
    },
  ],
}

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ["Inter"]
        }
      }
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "DADAPI",
        fieldName: "dad",
        url: "https://icanhazdadjoke.com/graphql",
        refetchInterval: 15,
      },
    },
  ]
}
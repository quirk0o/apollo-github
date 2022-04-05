require("dotenv").config()

module.exports = {
  schema: "schema.graphql",
  extensions: {
    endpoints: {
      default: {
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`,
        },
      },
    },
  },
}

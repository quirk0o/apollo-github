function getConfigOption(name, defaultValue = undefined) {
  const value = process.env[`REACT_APP_${name}`]

  if (value !== undefined) {
    return value
  } else if (defaultValue !== undefined && typeof defaultValue === "string") {
    return defaultValue
  } else {
    throw new Error(`Missing configuration REACT_APP_${name}`)
  }
}

const apiUrl = () => "https://api.github.com/graphql"
const accessToken = () => getConfigOption("GITHUB_ACCESS_TOKEN")

export const config = {
  apiUrl,
  accessToken,
}

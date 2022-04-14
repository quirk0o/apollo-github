import "styles/reset.css"
import "styles/index.css"

import React from "react"
import { createRoot } from "react-dom/client"

import { App } from "./app"

if (process.env.NODE_ENV === "development") {
  const { worker } = require("api/mocks/browser")
  worker.start()
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)

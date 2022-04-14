import { addMocksToSchema } from "@graphql-tools/mock"
import { buildClientSchema, graphql as graphqlRequest } from "graphql"
import { graphql, setupWorker } from "msw"

import * as introspectionResult from "./graphql.schema.json"

const schema = buildClientSchema(introspectionResult)
const schemaWithMocks = addMocksToSchema({ schema })

export const worker = setupWorker(
  graphql.operation(async (req, res, ctx) => {
    const payload = await graphqlRequest({
      schema: schemaWithMocks,
      source: req.body.query,
      variableVaues: req.variables,
    })

    return res(ctx.data(payload.data), ctx.errors(payload.errors))
  })
)

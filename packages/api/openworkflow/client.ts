import { BackendPostgres } from "openworkflow/postgres";
import { BackendSqlite } from "openworkflow/sqlite";
import { OpenWorkflow } from "openworkflow";

export const backend =
  process.env["NODE_ENV"] === "production"
    ? await BackendPostgres.connect(process.env["OPENWORKFLOW_POSTGRES_URL"])
    : BackendSqlite.connect("openworkflow/backend.db");
export const ow = new OpenWorkflow({ backend });

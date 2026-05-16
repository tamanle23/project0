import type { InferSelectModel } from "drizzle-orm";
import type { entities, attributes, resourceObjects, resourceValues, tags } from "./schema.sqlite";


export type EntityRow = InferSelectModel<typeof entities>;
export type AttributeRow = InferSelectModel<typeof attributes>;
export type ResourceRow = InferSelectModel<typeof resourceObjects>;
export type ValueRow = InferSelectModel<typeof resourceValues>;
export type TagRow = InferSelectModel<typeof tags>;

import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { Schema } from "./pb-types";

export type PocketBaseClient = TypedPocketBase<Schema>;
const PB_URL = import.meta.env?.VITE_PB_URL;
export const pb = new TypedPocketBase<Schema>(PB_URL);

export type CollectionName = keyof Schema;

export function getFileURL({
  collection_id_or_name,
  file_name,
  record_id,
  fallback = "",
}: {
  collection_id_or_name?: CollectionName;
  record_id?: string;
  file_name?: string;
  fallback?: string;
}) {
  if (!collection_id_or_name || !file_name || !record_id) {
    return fallback;
  }
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME?thumb=100x300

  return `${PB_URL}/api/files/${collection_id_or_name}/${record_id}/${file_name}`;
}

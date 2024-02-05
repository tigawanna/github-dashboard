import PocketBase, { OAuth2AuthConfig} from "pocketbase";
import { GithubOauthResponseType } from "./types";
import { tryCatchWrapper } from "@/utils/helpers/async";
import { RequestContext } from "rakkasjs";
import { TypedPocketBase } from "typed-pocketbase";
import { Schema } from "./database";

export type PocketBaseClient = TypedPocketBase<Schema>;

export interface OauthResponseManualTypes {
  token: string;
  record: RecordManualTypes;
  meta: MetaManualTypes;
}

export interface RecordManualTypes {
  id: string;
  collectionId: string;
  collectionName: string;
  username: string;
  verified: boolean;
  emailVisibility: boolean;
  email: string;
  created: string;
  updated: string;
  accessToken: string;
}

export interface MetaManualTypes {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  accessToken: string;
  refreshToken: string;
  rawUser: {}
}

const RAKKAS_PB_URL = import.meta.env.RAKKAS_PB_URL;

export async function triggerOuathLogin(pb:PocketBaseClient,options: OAuth2AuthConfig) {
  return await tryCatchWrapper<GithubOauthResponseType>(
    // @ts-expect-error
    pb.collection("github_oauth").authWithOAuth2(options) as any,
  );
}

export async function oneClickOauthLogin(pb:PocketBase,options: OAuth2AuthConfig) {
  try {
    // const authData = await pb.collection('pocketbook_user').authWithOAuth2({ provider});
    const authData = await pb
      .collection("github_oauth")
      .authWithOAuth2<RecordManualTypes>(options);
      console.log(" ===== oneClickOauthLogin ====== ", authData);
   const updated_user =   await pb.collection("github_oauth").update(authData.record.id, {
        accessToken: authData?.meta?.accessToken,
        avataUrl: authData?.meta?.avatarUrl,
      })
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    return updated_user
  } catch (error) {
    throw error;
  }
}

type CollectionName = keyof Schema;

export function getFileURL({
  collection_id_or_name,
  file_name,
  record_id,
}: {
  collection_id_or_name?: CollectionName;
  record_id?: string;
  file_name?: string;
}) {
  if (!collection_id_or_name || !file_name || !record_id) {
    return "";
  }
  // http://127.0.0.1:8090/api/files/COLLECTION_ID_OR_NAME/RECORD_ID/FILENAME?thumb=100x300
  return `${RAKKAS_PB_URL}/api/files/${collection_id_or_name}/${record_id}/${file_name}`;
}

export async function serverSidePocketBaseInstance(
  ctx: RequestContext<unknown>,
) {
  try {
    const pb_cookie = ctx.request.headers.get("cookie") ?? "";
    const pb = new PocketBase(
      RAKKAS_PB_URL,
    ) as PocketBaseClient;
    pb.authStore.loadFromCookie(pb_cookie);
    return pb;
  } catch (error) {
    throw error;
  }
}
export async function serverSideAdminPocketBaseInstance(
  ctx: RequestContext<unknown>,
) {
  try {
    const pb = new PocketBase(
      import.meta.env.RAKKAS_PB_URL,
    ) as PocketBaseClient;
    await pb.admins.authWithPassword(
      import.meta.env.RAKKAS_ADMIN_USERNAME,
      import.meta.env.RAKKAS_ADMIN_PASSWORD,
    );
    return pb;
  } catch (error) {
    throw error;
  }
}

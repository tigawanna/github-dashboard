import { envVariables } from "@/env";
import PocketBase, { OAuth2AuthConfig } from "pocketbase";
import { savePAT } from "../viewer/use-viewer";


export const pb = new PocketBase(envVariables.VITE_PB_URL);


export async function oneClickOauthLogin(
  pb: PocketBase,
  options: OAuth2AuthConfig,
) {
  try {
    const authData = await pb
      .collection("github_oauth")
      .authWithOAuth2<RecordManualTypes>(options);
    // console.log(" ===== oneClickOauthLogin ====== ", authData);
    const updated_user = await pb
      .collection("github_oauth")
      .update(authData.record.id, {
        accessToken: authData?.meta?.accessToken,
        avataUrl: authData?.meta?.avatarUrl,
      });

    if(authData.meta?.accessToken){
        savePAT(authData.meta?.accessToken);        
    }  
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false });

    return updated_user;
  } catch (error) {
    throw error;
  }
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
  rawUser: {};
}

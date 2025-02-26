export function humanReadableGQLError(error:Error){
if(error.message.includes("INSUFFICIENT_SCOPES")){
 return `Your current token doen't have enough scopes to perform this action ,\n
   consider logging out and logging back in with sufficient scopes\n
   scope 'repo' required to star \n
   scope 'delete_repo' required to delete your repositories
  `
}
}

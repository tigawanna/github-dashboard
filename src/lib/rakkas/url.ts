//  recieve a url , save its pathname and serch params into the redirect search param
export function redirectURLWithSechParams(url: URL, to: string) {
  const return_to = to + url.search;
  url.searchParams.set("redirect", return_to);
  return url;
}

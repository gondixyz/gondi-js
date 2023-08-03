// export const AUTH_API = process.env.NEXT_PUBLIC_GRAPHQL_API ?? `https://api.gondi.xyz/graphql`;
// export const API =
//   process.env.NEXT_PUBLIC_LENDING_GRAPHQL_API ?? `https://api.gondi.xyz/lending/graphql`;

const gondiUrl = () => process.env.GONDI_URL ?? "https://api.gondi.xyz";
export const authApiUrl = () => `${gondiUrl()}/graphql`;
export const apiUrl = () => `${gondiUrl()}/lending/graphql`;

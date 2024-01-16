const gondiUrl = () => process.env.GONDI_URL ?? 'https://api.gondi.xyz';
export const authApiUrl = () => `${gondiUrl()}/graphql`;
export const apiUrl = () => `${gondiUrl()}/lending/graphql`;

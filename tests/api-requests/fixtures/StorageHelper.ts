export function createLocalStorage(token: string) {
  return {
    cookies: [],
    origins: [
      {
        origin: process.env.ORIGIN!,
        localStorage: [
          { name: "qa-dojo.token", value: token },
          { name: "qa-dojo.theme", value: "light" },
        ],
      },
    ],
  };
}

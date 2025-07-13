import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const res = await fetch("/portfolio.json");
  return await res.json();
};

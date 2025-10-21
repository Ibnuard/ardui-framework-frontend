import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const secureNavigate = (
  router: AppRouterInstance,
  path: string,
  currentPath: string,
  setState: ({ from }: { from: string }) => void
) => {
  setState({ from: currentPath });
  router.push(path);
};

import { useRouter } from 'next/navigation';

export const useRouterNavigation = () => {
  const router = useRouter();

  const navigate = (path: string) => {
    router.push(path);
  };

  const replaceTo = (path: string) => {
    router.replace(path);
  };

  const goBack = () => {
    router.back();
  };

  const refresh = () => router.refresh();

  return { navigate, replaceTo, goBack, refresh };
};

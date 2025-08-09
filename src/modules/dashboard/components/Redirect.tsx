import { use, type FC } from 'react';

interface Props {
  getDestinationUrl: Promise<string | undefined>;
}

export const Redirect: FC<Props> = ({ getDestinationUrl }) => {
  const url = use(getDestinationUrl);

  if (url) {
    window.location.replace(url);
    return null;
  }

  return <div>Show Error</div>;
};

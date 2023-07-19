import { useRouter } from 'next/router';
import BaseLayout from '../../components/layout';
import Module from '../../components/front-modules/animated-glow';

export default function Page() {
  const router = useRouter();
  return (
    <BaseLayout
      title= 'Animated Glow'
      description={ `Animated Glow created by Sébastien Gillig` }>
      <Module />
    </BaseLayout>
  );
}
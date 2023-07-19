import BaseLayout from '../../components/layout';
import Module from '../../components/front-modules/animated-glow';

export default function Page() {
  return (
    <BaseLayout
      title= 'Animated Glow Button'
      description={ `Animated Glow Button coded by Sébastien Gillig` }>
      <Module />
    </BaseLayout>
  );
}
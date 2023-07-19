import GlowGrad from '../../components/front-modules/glowing-gradient';
import BaseLayout from '../../components/layout';

export default function Page(){
  return(
    <BaseLayout
      title="Glowing Border"
      description='Glowing Border created by Sébastien Gillig'>
      <GlowGrad />
    </BaseLayout>
  )
}
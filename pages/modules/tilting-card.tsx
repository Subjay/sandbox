import TiltCard from "../../components/front-modules/tilting-card";
import BaseLayout from "../../components/layout";

export default function Page(): JSX.Element{
  return(
    <BaseLayout
      title="Tilting card effect"
      description="Tilting card effect coded by Sébastien Gillig">
        <TiltCard />
    </BaseLayout>
  );
}
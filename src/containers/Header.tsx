// components
import Wrapper from 'components/header/Wrapper'
import Layout, { AutoLayout } from 'components/header/Layout'
import ControlBtn from 'components/header/ControlBtn'

const Header = ({
  onNavToggle, 
  onOptionToggle, 
  onLearningToggle
}: Props) => {
  return (
    <Wrapper>
      <Layout>
        <AutoLayout>
          <div>
            <ControlBtn message="Contents" onClick={onNavToggle} />
            <ControlBtn message="Setting" onClick={onOptionToggle} />
            <ControlBtn message="Highlights" onClick={onLearningToggle} />
          </div>
        </AutoLayout>
      </Layout>
    </Wrapper>
  );
}

interface Props {
  onNavToggle: (value?: boolean) => void;
  onOptionToggle: (value?: boolean) => void;
  onLearningToggle: (value?: boolean) => void;
}

export default Header
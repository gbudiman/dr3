import React from 'react';
import { useSelector } from 'react-redux';
import SkillContainer from '../components/skillgrids/SkillContainer';
import StatSkill from '../components/statskills/StatSkill';
import StrainPicker from '../components/strains/StrainPicker';
import XpBar from '../components/xpbars/XpBar';
import LoadingOverlay from 'react-loading-overlay'
import Loader from 'react-spinners/RingLoader'
import './styles.scss';

const Page = () => {
  const { isLoading } = useSelector(
    state => ({
      isLoading: state.characters.isLoading,
    })
  )
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<Loader color={'#ccc'} size={60} />}
      fadeSpeed={100}
      text='Fetching Character Data...'
    >
      <div className='builder'>
        <div className='container'>
          <StrainPicker />
          <XpBar />
          <StatSkill />
          <SkillContainer />
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default React.memo(Page);
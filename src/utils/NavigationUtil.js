import React from 'react';
import CharacterPage from '../components/CharacterPage/CharacterPage';
import SkillPage from '../components/SkillPage/SkillPage';
import FeedbackPage from '../components/FeedbackPage/FeedbackPage';
import StatUtil from './StatUtil';
import StrainUtil from './StrainUtil';
import SkillUtil from './SkillUtil';

export function switchTab(su) {
  switch (su.tab) {
    case 0: return <CharacterPage />;
    case 1: return <SkillPage />;
    case 2: return <FeedbackPage />;
    default: return <CharacterPage />;
  }
};

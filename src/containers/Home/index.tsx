import {List} from 'immutable';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  CatFact,
  fetchCatFactsRequest,
  getCatFacts,
  isLoadingCatFacts,
} from '../../store/reducers/cats';
import {ApplicationState} from '../../store/reducers/rootReducer';

interface DispatchProps {
  fetchCatFactsRequest: typeof fetchCatFactsRequest;
}

interface StateProps {
  catFacts: ImmutableMap<CatFact>;
  isLoadingCatFacts: boolean;
}

export type HomeProps = DispatchProps & StateProps;

const Home: React.FC<HomeProps> = ({
  fetchCatFactsRequest,
  catFacts,
  isLoadingCatFacts,
}) => {
  useEffect(() => {
    fetchCatFactsRequest({
      animal_type: 'cat',
      amount: 1,
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>

      <p>
        {isLoadingCatFacts ? 'Loading...' : `Fact: ${catFacts.get('text')}`}
      </p>
    </div>
  );
};

export default connect(
  (state: ImmutableMap<ApplicationState>) => {
    return {
      catFacts: getCatFacts(state),
      isLoadingCatFacts: isLoadingCatFacts(state),
    };
  },
  {
    fetchCatFactsRequest,
  },
)(Home);

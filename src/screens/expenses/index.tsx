import React, {useRef, useState} from 'react';

import Comment from './comment';
import Detail from './detail';
import List from './list';
import Language from './language';
import {Transition, Transitioning} from 'react-native-reanimated';
import globalStyles from '@Config/styles';
import {Loading} from '@Components/usefulComponents';
import {useFetchExpensesQuery} from '@Features/expense/expense-api-slice';

export interface IndexProps {
  page?: string;
  onChangePage?: (a?: string, b?: Record<string, string>) => void;
  onClose?: () => void;
  onRestart: () => void;
  initialValues: any;
  data: any;
}

export default function Component({}) {
  const [pageData, setPageData] = useState({});
  const ref = useRef() as any;
  const [currentPage, setCurrentPage] = useState('lang');
  const {data, isLoading} = useFetchExpensesQuery({}) as any;

  let PageComponent: any;

  switch (currentPage) {
    case 'lang':
      PageComponent = Language;
      break;
    case 'main':
      PageComponent = List;
      break;
    case 'detail':
      PageComponent = Detail;
      break;
    case 'comment':
      PageComponent = Comment;
      break;
    default:
      PageComponent = List;
  }

  /**
   * It changes the current page and updates the page data
   * @param {string} page - The page to change to.
   * @param params - Record<string, string> = {}
   */
  const _changePage = (page: string, params: Record<string, string> = {}) => {
    const updatedPageData = {...pageData, ...params};
    setPageData(updatedPageData);
    setCurrentPage(page);
    ref?.current.animateNextTransition();
  };

  /**
   * _onRestart is a function that sets the pageData state to the params object and sets the currentPage
   * state to 'main'
   * @param params - {
   */
  const _onRestart = async (params = {}) => {
    setPageData({...params});
    setCurrentPage('main');
  };

  /**
   * It sets the pageData to an empty object.
   */
  const _onClose = async () => {
    setPageData({});
  };

  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={250} />
      <Transition.Change durationMs={50} />
      <Transition.In type="fade" durationMs={250} />
    </Transition.Sequence>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Transitioning.View
      ref={ref}
      style={globalStyles.layoutStyles.wrapper}
      transition={transition}>
      {PageComponent && (
        <PageComponent
          page={currentPage}
          onChangePage={_changePage}
          onClose={_onClose}
          onRestart={_onRestart}
          initialValues={pageData}
          data={data?.expenses ?? []}
        />
      )}
    </Transitioning.View>
  );
}

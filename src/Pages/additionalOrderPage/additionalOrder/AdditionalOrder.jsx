import {useState} from 'react';
import {Button, Label} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import AddOrder from './components/AddOrder';
import History from './components/History';

const AdditionalOrder = () => {
  const [index, setIndex] = useState(0);

  const data = [
    {
      id: 0,
      title: '주문 추가',
      component: <AddOrder />,
    },

    {
      id: 1,
      title: '추가 히스토리',
      component: <History />,
    },
  ];
  return (
    <div>
      <h1>추가 주문</h1>
      <LabelWrap>
        {data.map(item => (
          <Label
            key={item.id}
            content={item.title}
            color={index === item.id ? 'blue' : 'grey'}
            size="big"
            style={{cursor: 'pointer'}}
            onClick={() => setIndex(item.id)}
          />
        ))}
        {data
          .filter(item => index === item.id)
          .map(el => (
            <div key={el.id}>{el.component}</div>
          ))}
      </LabelWrap>
    </div>
  );
};

export default AdditionalOrder;

const LabelWrap = styled.div`
  margin-top: 24px;
`;

import EmptyState from 'modules/common/components/EmptyState';
import { __ } from 'modules/common/utils';
import { IDeal } from 'modules/deals/types';
import { ITicket } from 'modules/tickets/types';
import React, { useState } from 'react';
import { BoardItem, ItemContainer } from '../styles/rightMenu';
import { IItem, IOptions } from '../types';

type ItemProps = {
  item: IDeal | IItem | ITicket;
  sendToBoard: (item: any) => void;
  remove: (item: any) => void;
  type: string;
  options: IOptions;
};

function ArchivedItem(props: ItemProps) {
  const [ showPopup, setVisibility ] = useState(false);
  const { options, item, type } = props;
  
  const toggleVisibility = () => {
    setVisibility(!showPopup)
  }

  const remove = () => {
    props.remove(item);
  }

  const sendBack = () => {
    props.sendToBoard(item);
  }

  const renderActions = () => {
    return (
      <>
        <span onClick={sendBack}>{__('Send to Board')}</span>
        {' - '}
        <span onClick={remove}>{__('Delete')}</span>
      </>
    )
  }

  if(type === 'item') {
    const Component = options.Item;
    return (
      <ItemContainer>
        <Component 
          onClick={toggleVisibility} 
          isFormVisible={showPopup} 
          item={item} 
          options={options}
          portable={true}
          beforePopupClose={toggleVisibility}
        />
        {renderActions()}
      </ItemContainer>
    );
  }

  return (
    <ItemContainer>
      <BoardItem>{item.name}</BoardItem>
      {renderActions()}
    </ItemContainer>
  );
}

type Props = {
  items: IItem[];
  sendToBoard: (item: any) => void;
  remove: (item: any) => void;
  type: string;
  options: IOptions;
};

type State = {
  showForm: boolean;
};

class ArchivedItems extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false
    };
  }

  openForm = () => {
    this.setState({ showForm: true});
  }

  render() {
    if (!this.props.items || this.props.items.length === 0) {
      return (
        <EmptyState
          text="There aren’t any archived items."
          icon="archive-alt"
        />
      );
    }

    const { options, remove, sendToBoard, type, items } = this.props;
    return (
      <>
        {items.map(item => (
          <ArchivedItem
            options={options}
            key={item._id}  
            item={item} 
            remove={remove}
            sendToBoard={sendToBoard}
            type={type}
          />
        ))}
      </>
    );
  }
}

export default ArchivedItems;

import { Fragment } from 'react';

import { useAppSelector } from '../hooks';
import AddCell from './addCell';
import CellListItem from './cellListItem';

function CellList() {
  const cells = useAppSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );

  return (
    <div className="">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {cells.map((cell) => (
        <Fragment key={cell.id}>
          <CellListItem cell={cell} />
          <AddCell previousCellId={cell.id} />
        </Fragment>
      ))}
    </div>
  );
}

export default CellList;

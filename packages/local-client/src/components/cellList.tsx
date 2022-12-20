import { Fragment, useEffect } from 'react';

import { useAppSelector, useAction } from '../hooks';
import AddCell from './addCell';
import CellListItem from './cellListItem';

function CellList() {
  const cells = useAppSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useAction();

  useEffect(() => {
    fetchCells();
  }, []);

  return (
    <div className="mx-6">
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

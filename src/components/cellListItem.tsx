import { FC } from 'react';
import { Cell } from '../redux';
import ActionBar from './actionBar';
import CodeCell from './codeCell';
import TextEditor from './textEditor';

interface ICellListItem {
  cell: Cell;
}

const CellListItem: FC<ICellListItem> = ({ cell }) => {
  return (
    <div className="relative">
      <ActionBar id={cell.id} />
      {cell.type === 'code' ? (
        <>
          <div className="h-8 w-full bg-[#37414b]"></div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <TextEditor cell={cell} />
      )}
    </div>
  );
};

export default CellListItem;

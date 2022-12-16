import { FC } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';

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
          <AnimateSharedLayout>
            <motion.div layout>
              <div className="h-8 w-full bg-[#37414b]"></div>
              <CodeCell cell={cell} />
            </motion.div>
          </AnimateSharedLayout>
        </>
      ) : (
        <AnimateSharedLayout>
          <motion.div layout>
            <TextEditor cell={cell} />
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
};

export default CellListItem;

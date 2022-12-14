import { FC } from 'react';
import { useAction } from '../hooks';

interface IAddCell {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<IAddCell> = ({
  previousCellId: nextCellId,
  forceVisible = false,
}) => {
  const { insertCellAfter } = useAction();
  return (
    <div
      className={`relative my-2 
      transition-opacity delay-75 duration-300 ease-in hover:opacity-100
      ${forceVisible ? '' : 'opacity-0'}`}
    >
      <div className="flex justify-center gap-10">
        <button
          className="rounded-full bg-orange-500 p-2 py-1 text-white"
          onClick={() => insertCellAfter(nextCellId, 'code')}
        >
          <span className="mr-1">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="rounded-2xl bg-orange-500 py-1 px-2 text-white"
          onClick={() => insertCellAfter(nextCellId, 'text')}
        >
          <span className="mr-1">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>

      <div className="absolute right-[2.5%] left-[2.5%] bottom-1/2 top-1/2 -z-10 w-[95%] border border-dotted border-gray-50"></div>
    </div>
  );
};

export default AddCell;

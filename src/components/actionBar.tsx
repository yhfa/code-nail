import { FC } from 'react';
import { useAction } from '../hooks/useAction';

interface IActionBar {
  id: string;
}

const ActionBar: FC<IActionBar> = ({ id }) => {
  const { moveCell, deleteCell } = useAction();
  return (
    <div className="group absolute top-0 right-0 z-10">
      <div className="opacity-25 transition-opacity duration-300 group-hover:opacity-100">
        <button
          className="bg-orange-500 py-1 px-2"
          onClick={() => moveCell(id, 'up')}
        >
          <span>
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
        <button
          className="bg-orange-500 py-1 px-2"
          onClick={() => moveCell(id, 'down')}
        >
          <span>
            <i className="fas fa-arrow-down"></i>
          </span>
        </button>
        <button
          className="bg-orange-500 py-1 px-2"
          onClick={() => deleteCell(id)}
        >
          <span className="icon">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;

import { useAppSelector } from './useAppSelector';

export const useCumulativeCode = (cellId: string) => {
  return useAppSelector(({ cells: { data, order } }) => {
    const currentCellIndex = order.indexOf(cellId);

    const orderedCells = order.map((id) => data[id]);

    const showFunc = `
    import __React from 'react';
    import __ReactDOM from 'react-dom/client';

    var show = (value) => {
      const root = document.getElementById('root');
      if (!root) return;

      if (typeof value === 'object') {
        if (value.$$typeof && value.props) {
          __ReactDOM.createRoot(root).render(value);
        } else {
          root.innerHTML = JSON.stringify(value);
        }
      } else {
        root.innerHTML = value;
      }
    };
  `;

    const showFuncNoOp = `var show = () => {};`;

    const cumulativeCells = orderedCells
      .slice(0, currentCellIndex + 1)
      .filter((cell) => cell.type === 'code')
      .map((cell) => {
        if (cell.id === cellId) return showFunc + cell.content;
        else return showFuncNoOp + cell.content;
      });

    return cumulativeCells;
  }).join('\n');
};

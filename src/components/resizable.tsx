import { FC, useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';

interface IResizable {
  children?: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}

const Resizable: FC<IResizable> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'flex flex-row',
      height: Infinity,
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      width,
      resizeHandles: ['e'],
      onResizeStop: (_, data) => setWidth(data.size.width),
    };
  } else {
    resizableProps = {
      height: 300,
      minConstraints: [Infinity, 48],
      maxConstraints: [Infinity, innerHeight * 0.9],
      width: Infinity,
      resizeHandles: ['s'],
    };
  }

  useEffect(() => {
    let timer: number;
    const listener = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [width]);

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;

import cn from 'classnames';

import style from './loader.module.css';

interface ILoaderProps {
  className?: string;
}

export const Loader = ({ className }: ILoaderProps) => {
  return (
    <div className={cn(style.loaderWrapper, className)}>
      <span className={style.loader} />
    </div>
  );
};

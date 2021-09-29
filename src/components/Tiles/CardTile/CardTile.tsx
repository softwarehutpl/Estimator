import { ChangeEventHandler, FC, MouseEventHandler } from 'react';

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import styles from './cardTitle.module.scss';

interface Props {
  btn: string;
  title: string;
  placeholder: string;
  action: MouseEventHandler<HTMLButtonElement>;
  change: ChangeEventHandler<HTMLInputElement>;
  projectId: string;
  cardTitle: string;
}

const CardTile: FC<Props> = ({
  btn,
  title,
  action,
  change,
  placeholder,
  projectId = '',
  cardTitle,
}) => {
  return (
    <Card title={cardTitle} className={styles.card}>
      <div className='p-d-flex p-flex-column'>
        <InputText id='projectName' value={title} placeholder={placeholder} onChange={change} />
        <Link className={styles.link} to={`/project/${projectId}`}>
          <Button label={btn} onClick={action} className={`${styles.btn} p-my-3`} />
        </Link>
      </div>
    </Card>
  );
};

export default CardTile;

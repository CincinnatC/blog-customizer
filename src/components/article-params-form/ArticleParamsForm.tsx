import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
} from '@/constants/articleProps';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';

import type { ArticleStateType } from '@/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
  setArticleState,
}: {
  setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState(defaultArticleState);
  useEffect((): (() => void) => {
    const handleClick = (event: MouseEvent): void => {
      if (panelRef.current && !event.composedPath().includes(panelRef.current)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setArticleState(formState);
  };
  const handleReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };
  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside
        ref={panelRef}
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <h2 className={styles.title}>Задайте параметры</h2>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={formState.fontFamilyOption}
            onChange={(option) =>
              setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
            }
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontSizeOption: option,
              }))
            }
          />
          <Select
            title="Цвет текста"
            options={fontColors}
            selected={formState.fontColor}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                fontColor: option,
              }))
            }
          />
          <div className={styles.divider} />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={formState.backgroundColor}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                backgroundColor: option,
              }))
            }
          />
          {/*Чего то я намудрил. В макете не показано как должен выглядить выпадающий список этот,
          он же больше чем доступное пространство, и некоторые цвета фона не помещаются. 
          И непонятно как реализовывать, прокрутку у этого элемента делать? В макете ж ничего такого нет. 
          Или я че то сделал не так*/}
          <Select
            title="Ширина контента"
            options={contentWidthArr}
            selected={formState.contentWidth}
            onChange={(option) =>
              setFormState((prev) => ({
                ...prev,
                contentWidth: option,
              }))
            }
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};

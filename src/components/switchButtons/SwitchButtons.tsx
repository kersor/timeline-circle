import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

interface Props {
    handlePrev: () => void
    handleNext: () => void
    activeIndex: number
    dataLen: number
}

export const SwitchButtons = ({
    handlePrev,
    handleNext,
    activeIndex,
    dataLen
}: Props) => {
  return (
    <div className={styles.switch_wrapper}>
        <div className={styles.switch_numbers}>0{activeIndex + 1}/0{dataLen}</div>
        <div className={styles.switch_buttons}>
            <div onClick={handlePrev} className={clsx(styles.switch_button, activeIndex === 0 && styles.switch_button__disabled)}>
              <img src={`${activeIndex === 0 ? "/icons/right_arrow__disabled.svg" : "/icons/right_arrow.svg"}`} alt="" />
            </div>
            <div onClick={handleNext} className={clsx(styles.switch_button, dataLen - 1 === activeIndex && styles.switch_button__disabled)}>
              <img src={`${dataLen - 1 === activeIndex ? "/icons/right_arrow__disabled.svg" : "/icons/right_arrow.svg"}`} alt="" />
            </div>
        </div>
    </div>
  )
}

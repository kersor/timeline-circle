import React, { PropsWithChildren } from 'react'
import styles from './styles.module.scss'

interface Props {
    style?: any
}

export const Container = ({
    style,
    children
}: PropsWithChildren<Props>) => {
  return (
    <div style={style} className={styles.wrapper}>{children}</div>
  )
}

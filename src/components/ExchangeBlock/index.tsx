import { memo } from 'react';

import { Input } from '@/components/ui/Input';
import { SelectAsset } from '@/components/ui/SelectAssets';
import { useControlExchange } from '@/hooks/useControlExchange';

import * as styles from './styles.module.scss';

interface IExchangeBlock {
  currentSymbol: string;
}

export const ExchangeBlock = memo(({ currentSymbol }: IExchangeBlock) => {
  const {
    assetAmount,
    handleFromAsset,
    handleToAsset,
    handleChangeAmount,
    resultOfExchange,
    currencySymbols,
  } = useControlExchange(currentSymbol);

  return (
    <div>
      <h4 className={styles.title}>Exchange assets</h4>
      <div className={styles.row}>
        <Input
          type='number'
          name='fromCurrencyInput'
          value={assetAmount}
          className={styles.input}
          onChange={handleChangeAmount}
          placeholder='Enter amount of asset'
        />
      </div>
      <div className={styles.row}>
        <SelectAsset
          name='fromCurrencyOption'
          id='FromCurrencyOption'
          className={styles.select}
          defaultValue={currentSymbol}
          options={currencySymbols}
          onChange={handleFromAsset}
        />
        <SelectAsset
          name='toCurrencyOption'
          id='ToCurrencyOption'
          className={styles.select}
          defaultValue='USDT'
          options={currencySymbols}
          onChange={handleToAsset}
        />
      </div>
      <h4 className={styles.title}>Result of exchange asset: </h4>
      <Input
        type='number'
        name='resultExchange'
        value={resultOfExchange}
        className={styles.input}
        placeholder="'Result of exchange'"
      />
    </div>
  );
});

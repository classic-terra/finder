import { get, isEmpty } from "lodash";
import { TxInfo } from "@terraclassic-community/terra.js";
import FlexTable from "../../components/FlexTable";
import Info from "../../components/Info";
import Card from "../../components/Card";
import Finder from "../../components/Finder";
import { fromNow, sliceMsgType } from "../../scripts/utility";
import TxAmount from "../Tx/TxAmount";
import { transformTx } from "../Tx/transform";
import { useCurrentChain, useIsClassic } from "../../contexts/ChainsContext";
import s from "./Txs.module.scss";
import TaxRateAmount from "../Tx/TaxRateAmount";

const getRow = (response: TxInfo, chainID: string, isClassic?: boolean) => {
  const transformed = transformTx(response, chainID);
  const { txhash, tx, height, timestamp, logs } = transformed;
  const fee = get(tx, `value.fee.amount[0]`);

  return [
    <span>
      <Finder q="tx" v={txhash}>
        {txhash}
      </Finder>
    </span>,
    <span className="type">{sliceMsgType(tx?.value?.msg[0].type)}</span>,
    <span>
      {isEmpty(fee) ? (
        `0 ${isClassic ? "Lunc" : "Luna"}`
      ) : (
        <TxAmount amount={fee.amount} denom={fee.denom} />
      )}
    </span>,
    <span>{isClassic ? <TaxRateAmount logs={logs} /> : ""}</span>,
    <span>{height}</span>,
    <span>{fromNow(timestamp.toString())}</span>
  ];
};

const Txs = ({ txs }: { txs: TxInfo[] }) => {
  const isClassic = useIsClassic();
  const head = [
    `TxHash`,
    `Type`,
    `Fee`,
    isClassic ? `Tax` : null,
    `Height`,
    `Time`
  ];
  const { chainID } = useCurrentChain();
  return (
    <div className={s.tableContainer}>
      {txs.length ? (
        <FlexTable
          head={head}
          body={txs.map(tx => getRow(tx, chainID, isClassic))}
        />
      ) : (
        <Card>
          <Info icon="info_outline" title="">
            No more transactions
          </Info>
        </Card>
      )}
    </div>
  );
};

export default Txs;

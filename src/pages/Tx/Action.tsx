import { TxDescription } from "@terraclassic-community/react-base-components";
import { useCurrentChain } from "../../contexts/ChainsContext";
import useLCDClient from "../../hooks/useLCD";
import s from "./Action.module.scss";

const Action = ({ action }: { action: string }) => {
  const { name } = useCurrentChain();
  const { config } = useLCDClient();

  return (
    <span className={s.wrapper}>
      <TxDescription
        network={{ chainID: config.chainID, URL: config.URL, name }}
        config={{ printCoins: 3 }}
      >
        {action}
      </TxDescription>
    </span>
  );
};

export default Action;

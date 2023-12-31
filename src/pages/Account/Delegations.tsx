import { readAmount } from "@terra-money/terra-utils";
import { getFindMoniker } from "../../queries/validator";
import { useDelegations, useValidators } from "../../queries/staking";
import { useStakingRewards } from "../../queries/distribution";
import ValidatorStatus from "../../components/ValidatorStatus";
import FlexTable from "../../components/FlexTable";
import Card from "../../components/Card";
import Finder from "../../components/Finder";
import Amount from "../../components/Amount";
import s from "./Account.module.scss";
import format from "../../scripts/format";
import { useIsClassic } from "../../contexts/ChainsContext";

const Delegations = ({ address }: { address: string }) => {
  const { data: delegation } = useDelegations(address);
  const { data: validators } = useValidators();
  const { data: rewards } = useStakingRewards(address);
  const isClassic = useIsClassic();

  if (!delegation || !validators || !rewards) {
    return null;
  }

  const [delegations] = delegation;

  const data = delegations.map(validator => {
    const { validator_address, balance } = validator;
    const moniker = getFindMoniker(validators)(validator_address);
    const amount = readAmount(balance.amount.toString(), { comma: true });
    const denom = format.denom(balance.denom, isClassic);
    const stakingRewards = rewards?.rewards[validator_address]?.toArray();

    return amount !== "0"
      ? [
          <span>
            <Finder
              q="validator"
              v={validator_address}
              children={moniker ?? validator_address}
            />
          </span>,
          <span>
            <ValidatorStatus validatorAddress={validator_address} />
          </span>,
          <span>{[amount, denom].join(" ")}</span>,
          <div>
            {stakingRewards && Array.isArray(stakingRewards) && (
              <ul>
                {stakingRewards.map(({ denom, amount }, index) => (
                  <li key={index}>
                    <Amount denom={denom}>{amount.toString()}</Amount>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ]
      : [];
  });

  const head = [`Validator`, `Status`, `Amount`, `Rewards`];

  return delegations.length ? (
    <Card
      title="Delegations"
      bordered
      headerClassName={s.cardTitle}
      bodyClassName={s.cardBodyContainer}
    >
      <FlexTable
        head={head}
        body={data.map(delegation => delegation)}
        tableStyle={{ border: "none" }}
        headStyle={{ background: "none" }}
      />
    </Card>
  ) : null;
};

export default Delegations;

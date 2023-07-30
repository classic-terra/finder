import {
  createActionRuleSet,
  createAmountRuleSet
} from "@terraclassic-community/log-finder-ruleset";
import { useCurrentChain } from "../contexts/ChainsContext";

export const useLogfinderActionRuleSet = () => {
  const { name } = useCurrentChain();
  const actionRules = createActionRuleSet(name);
  return actionRules;
};

export const useLogfinderAmountRuleSet = () => {
  const amountRules = createAmountRuleSet();
  return amountRules;
};

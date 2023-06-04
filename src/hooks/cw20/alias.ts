import { gql } from "@apollo/client";

interface Item {
  address: string;
  contract: string;
  msg: object;
  isClassic?: boolean;
}

const aliasItem = ({ contract, address }: Item) =>
  `${contract}: wasm{
      contractQuery( 
        contractAddress: "${contract}"
        query: {
          balance: {
            address: "${address}"
          }
        }
      )
    }`;

const alias = (list: Item[]) => gql`
  query {
    ${list.map(aliasItem)}
  }
`;

export default alias;

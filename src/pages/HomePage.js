import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext.js";
import apiTransactions from "../services/apiTransactions.js";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [balance, setBalance] = useState([]);
  const [totalBalance, setTotalBalance] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(listBalance, []);

  function listBalance() {
    apiTransactions.getBalance(user.token)
      .then(res => {
        const apiTransaction = res.data;
        console.log(apiTransaction);
        setBalance(apiTransaction);
        let balanceCalc = 0;
        apiTransaction.forEach(t => {
          if (t.type === "deposit") {
            balanceCalc = balanceCalc + t.value;
          } else {
            balanceCalc = balanceCalc - t.value;
          }
        })
        setTotalBalance(balanceCalc);

      })
      .catch(err => {
        alert(err.response.data.message);
      })
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {balance.length === 0 ?
            (
              <NoTransactions>
                <h1>Não há registros de entrada ou saída</h1>
              </NoTransactions>
            ) :
            (
              balance.map((b, index) =>
                <ListItemContainer key={index}>
                  <div>
                    <span>{b.date}</span>
                    <strong>{b.description}</strong>
                  </div>
                  <Value color={b.type === "deposit" ? "positivo" : "negativo"}>{((b.value) / 100)
                    .toLocaleString("pt-br", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Value>
                </ListItemContainer>
              )
            )
          }
        </ul>
        {balance.length === 0 ? <></> :
          <article>
            <strong>Saldo</strong>
            <Value color={totalBalance > 0 ? "positivo" : "negativo"}>${(totalBalance/100)
              .toLocaleString("pt-br", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Value>
          </article>
        }
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul {
    overflow-y: scroll;
  }
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const NoTransactions = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-align: center;
    color: #868686;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
  }
`
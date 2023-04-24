import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import apiTransactions from "../services/apiTransactions.js";
import { UserContext } from "../contexts/UserContext.js";

export default function TransactionsPage() {
  const { tipo } = useParams();
  const [form, setForm] = useState({ value: "", description: "" });
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleTransaction(e) {
    e.preventDefault();

    let type;
    if (tipo === "entrada") type = "deposit";
    if (tipo === "saida") type = "withdraw";

    const body = { value: handleValue(form.value), type, description: form.description };

    apiTransactions.newTransaction(user.token, body)
      .then(res => {
        setForm({ value: "", description: "" });
        navigate("/home");
      })
      .catch(err => {
        alert(err.response.data)
      })
  }

  function handleValue(v){
    const value = v.replace(",", ".");
    return parseFloat(value);
  }



  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleTransaction}>
        <input
          name="value"
          placeholder="Valor"
          type="text"
          required
          value={form.value}
          onChange={handleForm}
        />
        <input
          name="description"
          placeholder="Descrição"
          type="text"
          required
          value={form.description}
          onChange={handleForm}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`

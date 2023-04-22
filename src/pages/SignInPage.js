import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useState } from "react";
import apiAuth from "../services/apiAuth.js";
import { UserContext } from "../contexts/UserContext.js";

export default function SignInPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate();


  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  function handleSignIn(e) {
    e.preventDefault();

    apiAuth.signIn(form)
      .then(res => {
        const { name, token } = res.data;
        setUser({ name, token });
        navigate("/home");
      })
      .catch(err => {
        alert(err.response.data);
      })

  }

  return (
    <SingInContainer>
      <form onSubmit={handleSignIn}>
        <MyWalletLogo />
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          required
          value={form.email}
          onChange={handleForm}
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          required
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

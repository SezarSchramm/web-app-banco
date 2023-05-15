import "./styles.css";
import cobrancaIcone from "../../assets/cobrancaicon2.svg";
import filtroIcone from "../../assets/filtericon.svg";
import lupaIcone from "../../assets/lupaicon.svg";
import NavBar from "../../components/navbar";
import useUser from "../../hooks/useUser";
import ModalEditarUsuario from "../../components/customModalEditarPerfil";
import Perfil from "../../components/customPerfil";
import React, { useState } from "react";
import TableCharge from "../../components/customTableCharges";
import ModalEditarCobranca from '../../components/customModalEditarCobranca'
import ModalExcluirCobranca from '../../components/customModalExcluirCobranca'
import ModalDetalheCobranca from "../../components/customModalDetalheCobranca";

function Cobranca() {
  const { openModalEditarUsuario, abrirModalEditarCobranca, abrirModalExcluirCobranca, abrirModalDetalharCobranca } = useUser();

  return (
    <div className="main-div-cobrancas">
      {openModalEditarUsuario && <ModalEditarUsuario />}
      {abrirModalDetalharCobranca && <ModalDetalheCobranca />}
      {abrirModalEditarCobranca && <ModalEditarCobranca />}
      {abrirModalExcluirCobranca && <ModalExcluirCobranca />}
      <NavBar page={3} />
      <div className="container-main-div-cobranças">
        <header className="header-cobrancas">
          <span className="span-cobrancas">Cobranças</span>
          <Perfil />
        </header>
        <div className="container-div-cobrancas">
          <img
            className="icone-cobranca-cobrancas"
            src={cobrancaIcone}
            alt="cobranca-icone"
          ></img>
          <h1>Cobranças</h1>
          <img
            className="filtro-icone"
            src={filtroIcone}
            alt="filtro-icone"
          ></img>
          <input placeholder="Pesquisa" type="text"></input>
          <img
            className="lupa-icone-cobrancas"
            src={lupaIcone}
            alt="lupa-icone"
          ></img>
        </div>

        <div className="tabela-cobrancas" style={{ marginTop: "30px" }}>
          <TableCharge />
        </div>
      </div>
    </div>
  );
}
export default Cobranca;

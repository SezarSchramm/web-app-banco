import "./styles.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import iconDelete from "../../assets/iconeexcluir.svg";
import iconEditeCharge from "../../assets/lapiseditar.svg";
import { useState, useEffect } from "react";
import axios from "../../services/api";
import { getItem } from "../../utils/storage";
import useUser from "../../hooks/useUser";
import ModalAzul from "../customModalAzulSucesso";
import xvermelho from '../../assets/xvermelho.svg'
import circulovermelhox from '../../assets/circulovermelhox.svg'


function formatarData(data) {
  const dataObj = new Date(data);
  const dia = dataObj.getDate().toString().padStart(2, "0");
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function formatarValor(valor) {
  return `R$ ${valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function CardCharges() {
  const [dataCharges, setDataCharges] = useState([]);
  const [clientes, setClientes] = useState([]);

  const { setAbrirModalExcluirCobranca, setAbrirModalEditarCobranca, abrirAzulCobrancaCliente, abrirAzulExcluirCliente,
    abrirModalAzulEditarCobranca, setAbrirAzulCobrancaCliente, abrirModalAzulExcluirCobranca, setAbrirAzulExcluirCliente,
    abrirModalVermelhoExcluirCobranca, setAbrirVermelhoExcluirCliente, setAbrirModalVermelhoExcluirCobranca, abrirVermelhoExcluirCliente,
    setAbrirModalDetalharCobranca, abrirModalEditarCobranca, abrirModalExcluirCobranca, verTodasCobrancasPagas,
    verTodasCobrancasVencidas, verTodasCobrancasPrevistas } = useUser()

  const boletoComNome = dataCharges.map((cobranca) => {
    const cliente = clientes.find((cli) => cli.id === cobranca.cliente_id);
    const nomeCliente = cliente ? cliente.nome : "Cliente não encontrado";
    const dataFormatada = formatarData(cobranca.data_vencimento);
    const valorFormatado = formatarValor(cobranca.valor);
    return {
      nome: nomeCliente,
      id: cobranca.id,
      valor: valorFormatado,
      data_vencimento: dataFormatada,
      status: cobranca.status,
      descricao: cobranca.descricao,
      id_cliente: cobranca.cliente_id
    };
  });

  const cobrancasPagas = boletoComNome.filter(cobranca => cobranca.status === 'Paga')
  const cobrancasPendentes = boletoComNome.filter(cobranca => cobranca.status === 'Pendente')
  const cobrancasVencidas = boletoComNome.filter(cobranca => cobranca.status === 'Vencido')


  async function listCharges() {
    const token = getItem("token");
    const response = await axios.get("/cobranca", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setDataCharges(response.data);
  }

  async function dataCliente() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("/cliente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setClientes(response.data);
    } catch (error) { }
  }
  useEffect(() => {
    listCharges();
    dataCliente();
  }, []);

  useEffect(() => {

  })

  useEffect(() => {
    listCharges();
  }, [abrirModalEditarCobranca, abrirModalExcluirCobranca])

  setTimeout(() => {
    if (abrirModalAzulEditarCobranca) {
      setAbrirAzulCobrancaCliente(true)
    }
    if (abrirModalAzulExcluirCobranca) {
      setAbrirAzulExcluirCliente(true)
    }
    if (abrirModalVermelhoExcluirCobranca) {
      setAbrirVermelhoExcluirCliente(true)
    }

  }, 1000);

  function handleAbrirModalEditarCobranca({ dataCharges }) {
    localStorage.setItem('idCobranca', dataCharges.id)
    localStorage.setItem('idCliente', dataCharges.id_cliente)
    setAbrirModalEditarCobranca(true)
  }

  function handleAbrirModalExcluirCobranca({ dataCharges }) {
    localStorage.setItem('idCobranca', dataCharges.id)
    localStorage.setItem('idCliente', dataCharges.id_cliente)
    setAbrirModalExcluirCobranca(true)
  }

  function handleAbrirModalDatalharCobranca({ dataCharges }) {
    localStorage.setItem('idCobranca', dataCharges.id)
    localStorage.setItem('idCliente', dataCharges.id_cliente)
    setAbrirModalDetalharCobranca(true)
  }

  function fecharModalVermelho() {
    setAbrirModalVermelhoExcluirCobranca(false)
    setAbrirVermelhoExcluirCliente(false)
  }

  return (
    <div>
      <main>
        <div className="table-charge">
          <TableContainer>
            <Table>
              <TableBody>
                {!verTodasCobrancasPagas && !verTodasCobrancasVencidas && !verTodasCobrancasPrevistas &&
                  boletoComNome?.map((dataCharges) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                          cursor: "pointer",
                          width: '225px'
                        }}
                        onClick={() => handleAbrirModalDatalharCobranca({ dataCharges })}
                      >
                        {dataCharges.nome}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10px",
                        }}
                      >
                        &nbsp;
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.008em",
                          color: "#747488",
                          width: '180px'
                        }}
                      >
                        {dataCharges.valor}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                          width: '140px'
                        }}
                      >
                        {dataCharges.data_vencimento}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        <span className={dataCharges.status === 'Paga' ? 'status-cliente-pago' : dataCharges.status === 'Vencido' ? 'status-cliente-vencida' : 'status-cliente-pendente'}>
                          {dataCharges.status}
                        </span>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        {dataCharges.descricao}
                      </TableCell>

                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconEditeCharge}
                          alt="icone-editar"
                          onClick={() => handleAbrirModalEditarCobranca({ dataCharges })}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconDelete}
                          alt="icone-excluir"
                          onClick={() => handleAbrirModalExcluirCobranca({ dataCharges })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {verTodasCobrancasPagas &&
                  cobrancasPagas?.map((dataCharges) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                          cursor: "pointer",
                          width: '225px'
                        }}
                        onClick={() => handleAbrirModalDatalharCobranca({ dataCharges })}
                      >
                        {dataCharges.nome}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10px",
                        }}
                      >
                        &nbsp;
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.008em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.valor}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.data_vencimento}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        <span className={dataCharges.status === 'Paga' ? 'status-cliente-pago' : dataCharges.status === 'Vencido' ? 'status-cliente-vencida' : 'status-cliente-pendente'}>
                          {dataCharges.status}
                        </span>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        {dataCharges.descricao}
                      </TableCell>

                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconEditeCharge}
                          alt="icone-editar"
                          onClick={() => handleAbrirModalEditarCobranca({ dataCharges })}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconDelete}
                          alt="icone-excluir"
                          onClick={() => handleAbrirModalExcluirCobranca({ dataCharges })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                {verTodasCobrancasVencidas &&
                  cobrancasVencidas?.map((dataCharges) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                          cursor: "pointer",
                          width: '225px'
                        }}
                        onClick={() => handleAbrirModalDatalharCobranca({ dataCharges })}
                      >
                        {dataCharges.nome}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10px",
                        }}
                      >
                        &nbsp;
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.008em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.valor}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.data_vencimento}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        <span className={dataCharges.status === 'Paga' ? 'status-cliente-pago' : dataCharges.status === 'Vencido' ? 'status-cliente-vencida' : 'status-cliente-pendente'}>
                          {dataCharges.status}
                        </span>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        {dataCharges.descricao}
                      </TableCell>

                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconEditeCharge}
                          alt="icone-editar"
                          onClick={() => handleAbrirModalEditarCobranca({ dataCharges })}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconDelete}
                          alt="icone-excluir"
                          onClick={() => handleAbrirModalExcluirCobranca({ dataCharges })}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }

                {verTodasCobrancasPrevistas &&
                  cobrancasPendentes?.map((dataCharges) => (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                          cursor: "pointer",
                          width: '225px'
                        }}
                        onClick={() => handleAbrirModalDatalharCobranca({ dataCharges })}
                      >
                        {dataCharges.nome}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.id}
                      </TableCell>
                      <TableCell
                        sx={{
                          width: "10px",
                        }}
                      >
                        &nbsp;
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.008em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.valor}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                          color: "#747488",
                        }}
                      >
                        {dataCharges.data_vencimento}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        <span className={dataCharges.status === 'Paga' ? 'status-cliente-pago' : dataCharges.status === 'Vencido' ? 'status-cliente-vencida' : 'status-cliente-pendente'}>
                          {dataCharges.status}
                        </span>
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "Nunito, sans serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "40px",
                          letterSpacing: "0.005em",
                        }}
                      >
                        {dataCharges.descricao}
                      </TableCell>

                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconEditeCharge}
                          alt="icone-editar"
                          onClick={() => handleAbrirModalEditarCobranca({ dataCharges })}
                        />
                      </TableCell>
                      <TableCell align="left">
                        <img
                          className="icone-editar"
                          src={iconDelete}
                          alt="icone-excluir"
                          onClick={() => handleAbrirModalExcluirCobranca({ dataCharges })}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
      {abrirAzulCobrancaCliente && <ModalAzul width={'354px'} text={'Cobrança editada com sucesso!'} top={'800px'} left={'950px'} />}
      {abrirAzulExcluirCliente && <ModalAzul width={'354px'} text={'Cobrança excluída com sucesso!'} top={'750px'} left={'950px'} />}
      {abrirVermelhoExcluirCliente &&
        <div className='div-modal-vermelho'>
          <img alt='erro-icone' src={circulovermelhox}></img>
          <span>Esta cobrança não pode ser excluída!</span>
          <img onClick={() => fecharModalVermelho()} style={{ cursor: 'pointer' }} alt='' src={xvermelho}></img>
        </div>
      }
    </div>
  );
}

export default CardCharges;

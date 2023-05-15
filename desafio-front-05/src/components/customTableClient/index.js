import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import cobrancaIcone from '../../assets/cobrancaicon.svg'
import updown from '../../assets/updown.svg'
import './styles.css'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';






function upDownIcon() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img alt='pontos' src={updown} ></img>
            <span className='span-tabela-do-krl'>Cliente</span>
        </div>

    )
}


export default function StickyHeadTable() {
    const { abrirModalCadastrarCobranca, setAbrirModalCadastrarCobranca } = useUser()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [clientes, setClientes] = React.useState([{}])

    React.useEffect(() => {
        dataCliente()
    }, [])

    const navigate = useNavigate()

    function createData(nome, cpf, email, telefone, status, cobranca) {

        return { nome, cpf, email, telefone, status, cobranca };
    }

    const columns = [

        { id: 'nome', label: upDownIcon(), minWidth: 100, },
        { id: 'cpf', label: 'CPF', minWidth: 120 },
        { id: 'email', label: 'E-mail', minWidth: 155, align: 'left' },
        {
            id: 'telefone', label: 'Telefone', minWidth: 120, align: 'left', // format: (value) => value.toFixed(2),
        },
        { id: 'status', label: 'Status', minWidth: 115, align: 'left' },
        {
            id: 'cobranca', label: 'Criar cobrança', minWidth: 100, align: 'left'
        }
    ];


    const rows = [];

    for (let cliente of clientes) {
        const element = createData(nomeCliente({ cliente }), `${cliente.cpf}`, `${cliente.email}`, `${cliente.telefone}`, cliente.status === 'Inadimplente' ? inadimplente({ cliente }) : emDia({ cliente }), iconeCobranca({ cliente }))
        rows.push(element)
    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function dataCliente() {
        const token = localStorage.getItem('token')

        try {
            const response = await api.get('/cliente', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setClientes(response.data)

        } catch (error) {

        }

    }


    async function paginaDetalhe({ cliente }) {
        const id = cliente.id
        localStorage.setItem('idCliente', id)

        navigate('/detalhe')


    }

    function nomeCliente({ cliente }) {
        return (
            <div style={{ height: '100%', width: '100%', cursor: 'pointer' }} onClick={() => paginaDetalhe({ cliente })}>
                <span  >{`${cliente.nome}`}</span>
            </div>
        )
    }

    function inadimplente({ cliente }) {
        return (
            <div className='div-status-inadimplente'>{cliente.status}</div>
        )
    }

    function emDia({ cliente }) {
        return (
            <div className='div-status-emdia'>{cliente.status === 'Em dia' ? 'Em dia' : cliente.status === null && 'Em dia'}</div>
        )
    }

    function handleCobranca({ cliente }) {
        localStorage.setItem('idCliente', cliente.id)
        setAbrirModalCadastrarCobranca(true)
    }

    function iconeCobranca({ cliente }) {
        return (
            <img onClick={() => handleCobranca({ cliente })} alt='icone-adicionar-cobrança' style={{ cursor: 'pointer', marginLeft: '20px', width: '37.9px' }} src={cobrancaIcone}></img>
        )
    }

    return (
        <Paper sx={{ width: 1116, overflow: 'hidden' }}>
            <TableContainer sx={{ height: 643 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
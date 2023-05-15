import axios from "axios";

export async function getCep({ data }) {
    const responseCep = await axios.get(`https://h-apigateway.conectagov.estaleiro.serpro.gov.br/api-cep/v1/consulta/cep/${data}`)
    return
}
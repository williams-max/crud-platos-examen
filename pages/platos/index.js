import axios from "axios";
import { Layout } from "components/Layout";
import { ProductCard } from "components/ProductCard";

import { useRouter } from "next/router";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import toast from "react-hot-toast";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function ProductsPage({ products = [] }) {


  const router = useRouter();


 

  const handleEdit = async (id) => {

    router.push(`/platos/edit/${id}`);
   /* try {
      await axios.delete("/api/users/" + id);
      toast.success("User deleted");
      router.push("/users");
    } catch (error) {
      console.error(error.response.data.message);
    }*/
  };
  

const handleDelete = async (id) => {
  try {
    await axios.delete("/api/platos/" + id);
    toast.success("Plato deleted");
    router.push("/platos");
  } catch (error) {
    console.error(error.response.data.message);
  }
};


const mostrarFormatoDeData = ( d ) => {
  var fecha = new Date(d);
  
  return `${fecha.getFullYear()}/${fecha.getMonth()+1}/${fecha.getDate()} `;
}

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Inicio Actividad </StyledTableCell>
              <StyledTableCell align="right">Oferta</StyledTableCell>
              
              
              <StyledTableCell align="right">Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, key) => (
             
              <StyledTableRow key={key}>
                <StyledTableCell component="th" scope="row">
                  {row.nombre}
                </StyledTableCell>
          
                <StyledTableCell align="right">{row.precio}</StyledTableCell>
                <StyledTableCell align="right">{mostrarFormatoDeData(row.inicioactividad)}</StyledTableCell>
                <StyledTableCell align="right">{row.oferta}</StyledTableCell>
          
                <StyledTableCell align="right">
                  <Button variant="contained" href="#contained-buttons"  onClick={() => handleEdit(row.id)}>
                    Editar
                  </Button>
                  &nbsp;
                  <Button variant="outlined" color="error"    onClick={() => handleDelete(row.id)}>
                    Eliminar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default ProductsPage;

export const getServerSideProps = async () => {
  const { data: products } = await axios.get(
    "http://localhost:3000/api/platos"
  );

  return {
    props: {
      products,
    },
  };
};

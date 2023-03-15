import { MDBFooter } from 'mdb-react-ui-kit';

const Footer =() => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} {' '}
        <a className='text-dark' href='https://micapedemonti.github.io/portfolio/'>
         Netflix trailers por Micaela Pedemonti
        </a>
        
      </div>
    </MDBFooter>
  );
}

export default Footer
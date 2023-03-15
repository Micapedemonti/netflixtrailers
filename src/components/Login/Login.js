import './Login.css';
import { useForm } from 'react-hook-form';
import logo from "../../logo-netflix.png"
import { useNavigate } from "react-router-dom";


const Login = ()=>{


  const navigate = useNavigate();



  const { register,formState:{errors}, handleSubmit} = useForm();

  const onSubmit = (data) =>{
    console.log(data)
    navigate("/Peliculas");
  }


    return (
  <>
  <div className='login_container'>
  <div className='logo'>
    <img src={logo} width="200" height="50" className='logo_img' alt="logo" />

   </div>

    <div className="formulario">
    <div className='form_login'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='title_login'>Inicia sesión</h2>        
    
     <div className='input_email'>
            <input type="text" placeholder='Email o número de teléfono' className='input_form'{...register('Email',{pattern: /\S+@\S+\.\S+/})} />
            {errors.Email?.type ==='required'&& <p className='error_msg'>Ingresa un email o un número de teléfono válido.</p>}
             
    </div>

    <div className='input_contraseña'>
            <input type="password" placeholder='Contraseña'  className='input_form'{...register('password',{required:true,
  maxLength: 10 })} name="password" />
  {errors.password?.type ==='maxLength' && <p className='error_msg'>La contraseña no debe tener mas de 10 caracteres</p>}
    </div>       
    <button className='btn__form' type = "submit">Iniciar sesion </button>
    <div className='input_check'>
    <input type="checkbox" className='input_recordar'/> 
    <p className='check_recordar'>Recuérdame</p>
    </div>
    </form>
    </div>

    </div>
    </div>
  </>

    )
}

export default Login
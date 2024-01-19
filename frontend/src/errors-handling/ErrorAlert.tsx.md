import {useDispatch} from "react-redux";


const ErrorAlert = () => {
  const dispatch = useDispatch();
  dispatch({type: "ALERT", payload: {modal: true, variant: 'success', text: 'Успешно!'}});


  };

  export default ErrorAlert;
 import PropTypes from 'prop-types';

export default function CounterButton({by, incrementMethod, decrementMethod}){
   
    return(
     <div className="Counter">
        <div>
            <button className="decounterButton"
                onClick={() =>decrementMethod(by)} 
                >-{by}</button>
            <button className="counterButton" 
                  onClick={() =>incrementMethod(by)}
                  >+{by}</button>
        </div>
        
     </div>
    )
 }

 CounterButton.prototype={
   by: PropTypes.number
 }

 CounterButton.defaultProps={
   by: 5
 }


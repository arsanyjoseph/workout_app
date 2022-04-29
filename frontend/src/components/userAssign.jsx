import { useSelector } from "react-redux";
import MaterialUIPickers from "./datePicker/datePicker";

export default function UserAssign ({submitUser, handleSelect, handleBack, isAssigned, message, handleChange, value, datePicker}) {
    const {users} = useSelector((state)=> state.users)
    
    return (
        <div className="coolDownAssignContainer">
            <div className="formHead">Assign User</div>
            <div className="formBody">
                <form onSubmit={submitUser} className="formCoolDown">
                    <select name='selectedUser' onChange={handleSelect}>
                        <option disabled selected>Select User to Assign</option>
                        {users.map((item, index)=> <option name='selectedUser' key={index} value={item._id}>{item.firstName + ' ' + item.lastName}</option>)}
                    </select>
                    {datePicker && <><br/>
                    <MaterialUIPickers label='Date' value={value} handleChange={handleChange}/>
                    <br/></>}
                    <div className="buttons">
                        <button className='submitBtn' onClick={handleBack}>Back</button>
                        <button className='submitBtn' id="submitBtn" type="submit">Assign</button>
                    </div>
                </form>
            </div>
            {isAssigned && <div className='errMessage' >{message}</div>}
        </div>
    )
}
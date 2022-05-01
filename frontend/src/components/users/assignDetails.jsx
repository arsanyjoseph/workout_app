import './assignDetails.css'

export default function AddDetails ({cancelEvent, eventName}) {
    return (
        <div className="overlayBlur" onClick={cancelEvent}>
            <div className='formContainer'>
            <div className="formHead"><h2>Add {eventName}</h2></div>
            <div className="formBody">
                <form className="formLogin">
                    <input  type='email' autoComplete="username" name="email"  placeholder='Email' />
                    <input  type='password' autoComplete="current-password" name="password"  placeholder='Password'/>
                    <div className="buttons">
                        <button onClick={cancelEvent} className="submitBtn">Cancel</button>
                        <button className="submitBtn" type="submit">Save</button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}
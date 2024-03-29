import './libraryCard.css'
import asyncFunc from '../utils/asyncFuncs/asyncFuncs'
import {MdDeleteForever} from 'react-icons/md'

export default function LibraryCard ({cardTitle, CardDescription, url, deleteItem, value, user}) {
    return (
        <div className="cardItemContainer">
            <div className='contentContainer'>
                <h1>{cardTitle}</h1>
                <p>{CardDescription}</p>
            </div>
            <div className='vidContainer'>
                <iframe width='100%' height='100%' src={asyncFunc.linkVid(url)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>       
            </div>
            { user.isAdmin && <span className='deleteBin' value={value} onClick={()=> deleteItem()}><MdDeleteForever style={{pointerEvents: 'none'}}/></span>}
        </div>
    )
}
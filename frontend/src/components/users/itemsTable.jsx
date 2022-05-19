import handleDate from '../utils/dateHandler'
import './itemsTable.css'

export default function ItemsTable ({data}) {
    return (
        <div className='itemsTableCont'>
            <table>
                <thead>
                    <tr>
                        <th className='tableHead'>Name</th>
                        <th className='tableHead'>Description</th>
                        <th className='tableHead'>Created At</th>   
                    </tr>
                </thead>
                <tbody>
                    {GenerateTR(data)}
                </tbody>
            </table>
        </div>
    )
}

function GenerateTR (data) {
    
    if(data.length > 0) {
            return (
            <>
            {data.map((item, index)=> {
                const createdAt = handleDate(item.createdAt)
                return (
            <tr className='itemsTableRow' key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{createdAt}</td>
            </tr>
                )  
            })}
            </>
    )  
    }
    
}
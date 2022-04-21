import { useParams } from "react-router-dom"

export default function CoolDownEdit(){
    const {id} = useParams() 
    return (
        <div>
            Hello Edit {id}
        </div>
    )
}